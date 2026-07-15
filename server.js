const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const { existsSync, readFileSync } = require("node:fs");
const { extname, join, normalize, resolve } = require("node:path");

loadEnvFile();

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const publicDir = resolve("public");
const deepSeekApiKey = process.env.DEEPSEEK_API_KEY || "";
const deepSeekModel = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
const deepSeekApiUrl = process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/chat/completions";
const openAiApiKey = process.env.OPENAI_API_KEY || "";
const ttsProvider = process.env.TTS_PROVIDER || "openai";
const ttsModel = process.env.TTS_MODEL || "gpt-4o-mini-tts";
const ttsVoice = process.env.TTS_VOICE || "nova";
const openAiTtsUrl = process.env.OPENAI_TTS_URL || "https://api.openai.com/v1/audio/speech";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/health") {
      sendJson(res, 200, { ok: true, app: "rpg-kids" });
      return;
    }

    if (url.pathname === "/api/master" && req.method === "POST") {
      const payload = parseJsonBody(await readBody(req));
      const response = deepSeekApiKey ? await callDeepSeekMaster(payload) : mockMasterResponse(payload);
      sendJson(res, 200, response);
      return;
    }

    if (url.pathname === "/api/tts" && req.method === "POST") {
      const payload = parseJsonBody(await readBody(req));
      await handleTtsRequest(payload, res);
      return;
    }

    if (url.pathname.startsWith("/api/")) {
      sendJson(res, 404, { error: "api_route_not_found" });
      return;
    }

    await serveStatic(url.pathname, res);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "internal_server_error" });
  }
});

server.listen(port, host, () => {
  console.log(`RPG Kids rodando em http://${host}:${port}`);
});

function loadEnvFile() {
  const envPath = resolve(".env");
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex <= 0) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function serveStatic(pathname, res) {
  const requestedPath = pathname === "/" ? "/index.html" : decodeURIComponent(pathname);
  const safePath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = resolve(join(publicDir, safePath));

  if (!filePath.startsWith(publicDir)) {
    sendText(res, 403, "Acesso negado");
    return;
  }

  try {
    const body = await readFile(filePath);
    const contentType = mimeTypes[extname(filePath)] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
    });
    res.end(body);
  } catch {
    const indexBody = await readFile(join(publicDir, "index.html"));
    res.writeHead(200, {
      "Content-Type": mimeTypes[".html"],
      "Cache-Control": "no-cache",
    });
    res.end(indexBody);
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function sendAudio(res, contentType, body) {
  res.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function parseJsonBody(body) {
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}

function mockMasterResponse(payload = {}) {
  const action = safeText(payload.action || payload.choice || "a ideia da criança");
  return {
    mode: "mock",
    narration: `O mestre ouviu ${action} e guardou no diário da aventura. A integração real com DeepSeek entra quando a chave estiver configurada.`,
    tokenUsage: {
      provider: "mock",
      model: "mock",
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      estimatedCost: 0,
    },
  };
}

async function callDeepSeekMaster(payload = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18_000);

  try {
    const response = await fetch(deepSeekApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${deepSeekApiKey}`,
      },
      body: JSON.stringify({
        model: deepSeekModel,
        temperature: 0.75,
        max_tokens: 260,
        thinking: { type: "disabled" },
        messages: buildMasterMessages(payload),
      }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        mode: "deepseek_error",
        narration: "O mestre perdeu a voz por um instante. Vamos seguir com uma resposta segura do app.",
        error: safeDeepSeekError(data, response.status),
        tokenUsage: tokenUsage("deepseek", deepSeekModel, data.usage),
      };
    }

    return {
      mode: "deepseek",
      narration: safeText(data.choices?.[0]?.message?.content || "O mestre pensou um pouco e pediu para continuar a aventura com calma."),
      tokenUsage: tokenUsage("deepseek", deepSeekModel, data.usage),
    };
  } catch (error) {
    return {
      mode: "deepseek_error",
      narration: "O mestre tropeçou na nuvem da internet. Vamos continuar com uma resposta segura do app.",
      error: error.name === "AbortError" ? "timeout" : "request_failed",
      tokenUsage: tokenUsage("deepseek", deepSeekModel),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function handleTtsRequest(payload = {}, res) {
  if (ttsProvider !== "openai" || !openAiApiKey) {
    sendJson(res, 503, { error: "tts_not_configured" });
    return;
  }

  const text = safeText(payload.text || "");
  if (!text) {
    sendJson(res, 400, { error: "tts_text_required" });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18_000);

  try {
    const response = await fetch(openAiTtsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiApiKey}`,
      },
      body: JSON.stringify({
        model: ttsModel,
        voice: safeText(payload.voice || ttsVoice),
        input: text.slice(0, 1200),
        instructions: ttsInstructions(payload),
        response_format: "mp3",
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      sendJson(res, response.status, {
        error: "tts_provider_error",
        detail: safeDeepSeekError(data, response.status),
      });
      return;
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());
    sendAudio(res, response.headers.get("content-type") || "audio/mpeg", audioBuffer);
  } catch (error) {
    sendJson(res, 504, { error: error.name === "AbortError" ? "tts_timeout" : "tts_request_failed" });
  } finally {
    clearTimeout(timeout);
  }
}

function ttsInstructions(payload = {}) {
  const style = safeText(payload.style || "theatrical");
  const rate = Number(payload.rate || 0.98);
  const pace = rate >= 0.95 ? "um pouquinho mais rapido que leitura normal" : "calmo e facil de acompanhar";
  const profiles = {
    theatrical:
      "Use tom teatral, caloroso e expressivo, como um mestre de RPG infantil contando uma cena magica. Reaja com surpresa leve, sorria na voz e mantenha energia divertida.",
    gentle:
      "Use tom doce, calmo e acolhedor, como uma historia antes de dormir, mas ainda com curiosidade de aventura.",
    epic:
      "Use tom de aventura epica leve, grandioso sem assustar, com entusiasmo e pausas de suspense seguro.",
    teacher:
      "Use tom de professor gentil, claro e encorajador, valorizando a tentativa da crianca.",
  };
  return [
    "Fale em portugues do Brasil.",
    profiles[style] || profiles.theatrical,
    `Ritmo: ${pace}.`,
    "A fala e para uma crianca pequena com supervisao familiar.",
    "Nao soe assustador, robotico, adulto ou sarcastico.",
  ].join(" ");
}

function buildMasterMessages(payload = {}) {
  const adventureTitle = safeText(payload.adventureTitle || "uma aventura infantil");
  const adventureGoal = safeText(payload.adventureGoal || "");
  const sceneTitle = safeText(payload.sceneTitle || "a cena atual");
  const sceneNarration = safeText(payload.sceneNarration || "");
  const scenePrompt = safeText(payload.scenePrompt || "");
  const choices = Array.isArray(payload.choices) ? payload.choices.slice(0, 4).map(safeText).filter(Boolean).join(" | ") : "";
  const action = safeText(payload.action || payload.choice || "");
  const diceResult = payload.diceResult ? `Resultado do dado: ${payload.diceResult}.` : "";
  const diceOutcome = safeText(payload.diceOutcomeText || payload.localConsequence || "");
  const actionInsight = safeText(payload.actionInsight || "");
  const movementInstruction = safeText(payload.movementInstruction || "");
  const learningCriteria = safeText(payload.learningCriteria || "");
  const childProfile = payload.childProfile || {};
  const childLine = [
    childProfile.callName ? `Nome/tratamento: ${safeText(childProfile.callName)}` : "",
    childProfile.heroTerm ? `Personagem: ${safeText(childProfile.heroTerm)}` : "",
    childProfile.adventurerTerm ? `Tratamento: ${safeText(childProfile.adventurerTerm)}` : "",
    childProfile.narratorStyle ? `Estilo do mestre: ${safeText(childProfile.narratorStyle)}` : "",
  ].filter(Boolean).join(". ");
  const progress = payload.progress ? safeText(JSON.stringify(payload.progress)) : "";
  const rewards = Array.isArray(payload.rewards) ? payload.rewards.slice(-5).map(safeText).filter(Boolean).join(", ") : "";
  const narrativeLog = Array.isArray(payload.narrativeLog)
    ? payload.narrativeLog.slice(-6).map((entry) => safeText(entry.text || entry)).join(" ")
    : "";

  return [
    {
      role: "system",
      content:
        "Você é um mestre de RPG infantil em português do Brasil. Narre de forma teatral, segura, afetuosa e curta. Não use conteúdo adulto, medo intenso, violência gráfica, humilhação, compras ou coleta de dados pessoais. Acolha ideias inesperadas e reconduza para a cena aprovada. Não invente novas recompensas, pontos, locais perigosos ou regras: use apenas o contexto enviado. Não comece com 'Mestre narrando'. Responda em 2 a 5 frases, com uma pergunta ou próximo passo claro.",
    },
    {
      role: "user",
      content: [
        `Aventura: ${adventureTitle}.`,
        adventureGoal ? `Objetivo aprovado: ${adventureGoal}.` : "",
        `Cena: ${sceneTitle}.`,
        sceneNarration ? `Contexto da cena: ${sceneNarration}` : "",
        scenePrompt ? `Pergunta da cena: ${scenePrompt}` : "",
        choices ? `Opcoes sugeridas aprovadas: ${choices}` : "",
        childLine ? `Perfil da crianca: ${childLine}.` : "",
        action ? `Ação da criança: ${action}.` : "",
        actionInsight ? `Leitura local da acao: ${actionInsight}.` : "",
        diceResult,
        diceOutcome ? `Consequencia local ja decidida pelo jogo: ${diceOutcome}` : "",
        movementInstruction ? `Desafio fisico aprovado se necessario: ${movementInstruction}` : "",
        learningCriteria ? `Criterio pedagogico da cena: ${learningCriteria}` : "",
        progress ? `Progresso atual: ${progress}` : "",
        rewards ? `Itens ja ganhos: ${rewards}` : "",
        narrativeLog ? `Diário recente: ${narrativeLog}` : "",
        "Tarefa: transforme isso em uma fala de mestre viva, infantil e sequencial. Reaja ao que a crianca fez, respeite a consequencia local e diga claramente o proximo passo.",
      ]
        .filter(Boolean)
        .join("\n"),
    },
  ];
}

function tokenUsage(provider, model, usage = {}) {
  return {
    provider,
    model,
    inputTokens: usage.prompt_tokens || 0,
    outputTokens: usage.completion_tokens || 0,
    totalTokens: usage.total_tokens || 0,
    estimatedCost: 0,
  };
}

function safeDeepSeekError(data, status) {
  const message = data?.error?.message || data?.message || `http_${status}`;
  return safeText(message).slice(0, 180);
}

function safeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, 1200);
}

function readBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) {
        req.destroy();
        rejectBody(new Error("request_body_too_large"));
      }
    });
    req.on("end", () => resolveBody(body));
    req.on("error", rejectBody);
  });
}
