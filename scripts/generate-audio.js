const { mkdir, readFile, writeFile } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const { dirname, join, resolve } = require("node:path");
const vm = require("node:vm");

loadEnvFile();

const provider = process.env.TTS_PROVIDER || "gemini";
const geminiApiKey = process.env.GEMINI_API_KEY || "";
const geminiTtsUrl = process.env.GEMINI_TTS_URL || "https://generativelanguage.googleapis.com/v1beta/interactions";
const ttsModel = process.env.TTS_MODEL || "gemini-3.1-flash-tts-preview";
const ttsVoice = process.env.TTS_VOICE || "Puck";
const outDir = resolve("public/assets/audio");
const prototypeOutDir = resolve("prototype/assets/audio");
const selectedAdventureId = lastArgValue("--adventure") || "";
const limit = Number(lastArgValue("--limit") || 0);
const continueOnError = process.argv.includes("--continue-on-error");
const force = process.argv.includes("--force");
const missingOnly = process.argv.includes("--missing-only");
const selectedKind = lastArgValue("--kind") || "";
const selectedSceneIds = new Set((lastArgValue("--scene") || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean));
const customKey = lastArgValue("--key") || "";
const customText = lastArgValue("--text") || "";
const delayMs = Number(lastArgValue("--delay-ms") || 2500);

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  if (provider !== "gemini") throw new Error("generate:audio currently supports TTS_PROVIDER=gemini");
  if (!geminiApiKey) throw new Error("GEMINI_API_KEY is required to generate audio assets");

  const jobs = customKey || customText
    ? buildCustomAudioJobs()
    : buildAudioJobs(await loadAdventures()).filter((job) => (
      (!selectedAdventureId || job.adventureId === selectedAdventureId) &&
      (!selectedKind || job.kind === selectedKind) &&
      (!selectedSceneIds.size || selectedSceneIds.has(job.sceneId))
    ));
  const manifest = await readJson(join(outDir, "manifest.json"));
  const limitedJobs = limit > 0 ? jobs.slice(0, limit) : jobs;
  const selectedJobs = missingOnly
    ? limitedJobs.filter((job) => !manifest[job.key] || !existsSync(join(outDir, `${job.key}.wav`)))
    : limitedJobs;

  await mkdir(outDir, { recursive: true });
  await mkdir(prototypeOutDir, { recursive: true });

  for (const [index, job] of selectedJobs.entries()) {
    const relativePath = `${job.key}.wav`;
    const outputPath = join(outDir, relativePath);
    const prototypePath = join(prototypeOutDir, relativePath);
    await mkdir(dirname(outputPath), { recursive: true });
    await mkdir(dirname(prototypePath), { recursive: true });

    if (force || !existsSync(outputPath)) {
      console.log(`[${index + 1}/${selectedJobs.length}] ${job.key}`);
      try {
        const wav = await generateGeminiWavWithRetry(job.text);
        await writeFile(outputPath, wav);
        await writeFile(prototypePath, wav);
        if (delayMs > 0) await wait(delayMs);
      } catch (error) {
        await writeManifest(manifest);
        if (!continueOnError) throw error;
        console.error(`[skip] ${job.key}: ${error.message}`);
        continue;
      }
    }
    manifest[job.key] = `assets/audio/${relativePath}`;
    await writeManifest(manifest);
  }

  await writeManifest(manifest);
  console.log(`Audio manifest written with ${Object.keys(manifest).length} entries.`);
}

async function loadAdventures() {
  const source = await readFile(resolve("public/adventures.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  return sandbox.window.RPG_KIDS_ADVENTURES || [];
}

function buildAudioJobs(adventures) {
  const jobs = [];
  for (const adventure of adventures) {
    for (const scene of adventure.scenes || []) {
      jobs.push({
        key: `${adventure.id}/${scene.id}/scene`,
        adventureId: adventure.id,
        sceneId: scene.id,
        kind: "scene",
        text: sceneText(scene),
      });

      if (scene.diceOutcomes) {
        const bandByRoll = { 1: "low", 2: "low", 3: "low", 4: "middle", 5: "high", 6: "high" };
        for (let result = 1; result <= 6; result += 1) {
          const outcome = scene.diceOutcomes[bandByRoll[result]];
          jobs.push({
            key: `${adventure.id}/${scene.id}/dice-${result}`,
            adventureId: adventure.id,
            sceneId: scene.id,
            kind: "dice",
            text: `Você tirou ${result}. ${diceResultReaction(result)} ${outcome?.narration || defaultDiceNarration(result, bandByRoll[result])}`,
          });
        }
      }

      if (scene.movement) {
        jobs.push({
          key: `${adventure.id}/${scene.id}/movement`,
          adventureId: adventure.id,
          sceneId: scene.id,
          kind: "movement",
          text: `${scene.movement.label || "Desafio físico"}. ${scene.movement.instruction}. Quando terminar, toque em Pronto.`,
        });
        jobs.push({
          key: `${adventure.id}/${scene.id}/movement-question`,
          adventureId: adventure.id,
          sceneId: scene.id,
          kind: "movement",
          text: "Você já cumpriu o desafio?",
        });
        if (scene.movement.fallback) {
          jobs.push({
            key: `${adventure.id}/${scene.id}/movement-fallback`,
            adventureId: adventure.id,
            sceneId: scene.id,
            kind: "movement",
            text: `${scene.movement.fallback} Mais dez segundos e eu pergunto de novo.`,
          });
        }
      }

      if (scene.visualChallenge) {
        jobs.push({
          key: `${adventure.id}/${scene.id}/visual-challenge`,
          adventureId: adventure.id,
          sceneId: scene.id,
          kind: "visual",
          text: `${scene.visualChallenge.title || "Desafio"}. ${scene.visualChallenge.instruction}`,
        });
        jobs.push({
          key: `${adventure.id}/${scene.id}/visual-success`,
          adventureId: adventure.id,
          sceneId: scene.id,
          kind: "visual",
          text: scene.visualChallenge.successText || "Muito bem. O desafio abriu o caminho.",
        });
      }

      if (scene.challenge?.templateId) {
        jobs.push({
          key: `${adventure.id}/${scene.id}/challenge`,
          adventureId: adventure.id,
          sceneId: scene.id,
          kind: "challenge",
          text: `${scene.challenge.title || "Desafio"}. ${scene.challenge.prompt || scene.challenge.instruction || ""}`,
        });
        jobs.push({
          key: `${adventure.id}/${scene.id}/challenge-success`,
          adventureId: adventure.id,
          sceneId: scene.id,
          kind: "challenge",
          text: scene.challenge.successText || "Muito bem. O desafio abriu o caminho.",
        });
      }

      if (scene.hub?.routes?.length) {
        jobs.push({
          key: `${adventure.id}/${scene.id}/hub-return`,
          adventureId: adventure.id,
          sceneId: scene.id,
          kind: "hub",
          text: "Voltamos à praça redonda. Luma mostra só os caminhos que ainda faltam. O mapa vai abrir agora.",
        });
        for (const route of scene.hub.routes) {
          jobs.push({
            key: `${adventure.id}/${scene.id}/route-${route.target}`,
            adventureId: adventure.id,
            sceneId: scene.id,
            kind: "hub",
            text: routeSelectionText(route),
          });
        }
      }
    }

    jobs.push({
      key: `${adventure.id}/__adventure/celebration`,
      adventureId: adventure.id,
      sceneId: "__adventure",
      kind: "ui",
      text: endingCelebrationText(adventure),
    });
  }
  return [...jobs, ...buildUiAudioJobs()].filter((job) => job.text);
}

function buildCustomAudioJobs() {
  if (!customKey || !customText) throw new Error("--key and --text are required for custom audio jobs");
  return [{
    key: customKey,
    adventureId: "__custom",
    sceneId: "__custom",
    kind: "custom",
    text: customText,
  }];
}

function sceneText(scene) {
  const narration = sceneSpokenText(scene);
  const choices = scene.hub?.routes?.length
    ? scene.hub.routes.slice(0, 3).map((route) => route.label)
    : scene.choices || [];
  const spokenChoices = choices
    .filter((choice) => !String(choice).toLowerCase().includes("livre"))
    .map((choice, index) => `Opção ${index + 1}: ${choice}.`)
    .join(" ");
  return [
    narration,
    scene.prompt || "O que você faz?",
    spokenChoices ? `Escute suas opções de aventura. ${spokenChoices}` : "",
  ].filter(Boolean).join(" ");
}

function sceneSpokenText(scene) {
  if (scene.id === "sinos_praca_relogio") {
    return "Você chegou à Praça do Relógio. O Relógio-Coração parou, e a fonte espera cinco Notas de Sino. Luma abre o mapa e mostra três caminhos.";
  }
  return scene.narration;
}

function endingCelebrationText(adventure) {
  if (adventure.id === "cidade-dos-sinos-claros") {
    return "Parabéns! As Notas de Sino tocaram juntas no Relógio-Coração. A cidade voltou a respirar música, e Luma guardou sua coragem no mapa da aventura.";
  }
  return `Parabéns! Você terminou ${adventure.title}. A aventura ficou guardada com suas escolhas, seus aprendizados e suas recompensas.`;
}

function routeSelectionText(route) {
  const shortLabel = shortRouteLabel(route);
  return `Você tocou em ${route.label}. ${shortLabel} brilhou no mapa. Luma abre caminho e o mestre vira a página.`;
}

function shortRouteLabel(route) {
  const byTarget = {
    sinos_tico_biscoitos: "Biscoitos",
    sinos_vira_pagina: "Biblioteca",
    sinos_pipoca_jardim: "Jardim",
    sinos_ponte_nara: "Ponte",
    sinos_bolim_oficina: "Oficina",
    sinos_bento_bosque: "Bosque",
    sinos_iara_vento: "Colina",
    sinos_torre_final: "Torre",
  };
  return byTarget[route.target] || String(route.label || "O caminho").split(" ").slice(0, 2).join(" ");
}

function buildUiAudioJobs() {
  return [
    ["ui/idle/hub-first-1", "Repare na fonte: cada espaço vazio espera uma Nota de Sino acordar."],
    ["ui/idle/hub-first-2", "A torre tem janelas em forma de sino. Ela parece quietinha, como se estivesse esperando ajuda."],
    ["ui/idle/hub-three-1", "Agora restam três caminhos brilhando no mapa."],
    ["ui/idle/hub-two-1", "Agora só restam dois caminhos para investigar."],
    ["ui/idle/hub-one-1", "Chegamos ao último local antes da torre. Só resta um caminho."],
    ["ui/idle/hub-few-2", "Luma aponta para o mapa: escolha um caminho que ainda está brilhando."],
    ["ui/idle/hub-many-1", "Luma segura o mapa bem quietinha. A cidade é grande, mas o mestre mostra três caminhos por vez."],
    ["ui/idle/hub-many-2", "A praça espera sem pressa. Cada caminho visitado pode acordar uma Nota de Sino."],
    ["ui/idle/dice-1", "O mestre espera sua escolha. Toque em uma opção quando estiver pronta."],
    ["ui/idle/dice-2", "A cena está parada só para você decidir. Opção um, dois ou três."],
    ["ui/idle/default-1", "A aventura fica quietinha esperando sua decisão."],
    ["ui/idle/default-2", "Quando quiser continuar, toque em uma das opções."],
    ["ui/jogue-um-dado/prompt", "Jogue um dado."],
  ].map(([key, text]) => ({
    key,
    adventureId: "__ui",
    sceneId: "__ui",
    kind: "ui",
    text,
  }));
}

async function generateGeminiWav(text) {
  const response = await fetch(geminiTtsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": geminiApiKey,
    },
    body: JSON.stringify({
      model: ttsModel,
      input: geminiTtsInput(text),
      response_format: { type: "audio" },
      generation_config: {
        speech_config: [{ voice: ttsVoice }],
      },
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Gemini TTS failed ${response.status}: ${JSON.stringify(data).slice(0, 300)}`);
  }

  const audioData = findGeminiAudioData(data);
  if (!audioData) throw new Error("Gemini TTS response did not include audio data");
  return wavFromPcm(Buffer.from(audioData, "base64"));
}

async function generateGeminiWavWithRetry(text) {
  const attempts = [0, 20_000, 60_000];
  let lastError;
  for (const delay of attempts) {
    if (delay) {
      console.log(`Rate limit/backoff: waiting ${Math.round(delay / 1000)}s before retry...`);
      await wait(delay);
    }
    try {
      return await generateGeminiWav(text);
    } catch (error) {
      lastError = error;
      if (!/429|quota|rate/i.test(error.message)) throw error;
    }
  }
  throw lastError;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function geminiTtsInput(text) {
  return [
    "Fale em portugues do Brasil.",
    "Use estilo de grande contador de historias: caloroso, teatral, encantado, com suspense seguro, surpresa leve e alegria.",
    "Fale como um mestre de RPG infantil. Nunca fale em ingles.",
    "A fala e para uma crianca pequena com supervisao familiar.",
    `Leia exatamente esta fala do narrador:\n"${String(text).slice(0, 1200)}"`,
  ].join("\n");
}

function diceResultReaction(result) {
  const reactions = {
    1: "Ih... o dado caiu no cantinho do azar.",
    2: "Ah não... a sorte tropeçou um pouquinho.",
    3: "Quase deu certo. Faltou só um brilho.",
    4: "Ufa. Por pouco a cena não complicou tudo, mas a sorte sorriu para você.",
    5: "Muito bem. Você teve sorte agora.",
    6: "Seis! Sorte máxima. O dado fez festa na mesa.",
  };
  return reactions[result] || "";
}

function defaultDiceNarration(result, band) {
  if (band === "low") return `Resultado ${result}: algo complica o caminho, mas a aventura continua.`;
  if (band === "middle") return `Resultado ${result}: você consegue, mas precisa cumprir um desafio curto.`;
  return `Resultado ${result}: sucesso brilhante!`;
}

async function writeManifest(generatedManifest) {
  const existing = await readJson(join(outDir, "manifest.json"));
  const manifest = { ...existing, ...generatedManifest };
  const json = `${JSON.stringify(manifest, null, 2)}\n`;
  await writeFile(join(outDir, "manifest.json"), json);
  await mkdir(prototypeOutDir, { recursive: true });
  await writeFile(join(prototypeOutDir, "manifest.json"), json);
}

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return {};
  }
}

function findGeminiAudioData(value) {
  if (!value || typeof value !== "object") return "";
  if (typeof value.data === "string" && value.data.length > 100) return value.data;
  if (value.output_audio?.data) return value.output_audio.data;
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findGeminiAudioData(item);
      if (found) return found;
    }
  }
  for (const nested of Object.values(value)) {
    if (nested && typeof nested === "object") {
      const found = findGeminiAudioData(nested);
      if (found) return found;
    }
  }
  return "";
}

function wavFromPcm(pcmBuffer, sampleRate = 24000, channels = 1, bitsPerSample = 16) {
  const byteRate = sampleRate * channels * bitsPerSample / 8;
  const blockAlign = channels * bitsPerSample / 8;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcmBuffer.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcmBuffer.length, 40);
  return Buffer.concat([header, pcmBuffer]);
}

function loadEnvFile() {
  const envPath = resolve(".env");
  if (!existsSync(envPath)) return;
  const lines = require("node:fs").readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex <= 0) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    if (!process.env[key]) process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

function lastArgValue(name) {
  const prefix = `${name}=`;
  const matches = process.argv.filter((arg) => arg.startsWith(prefix));
  return matches.length ? matches[matches.length - 1].slice(prefix.length) : "";
}
