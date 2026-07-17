const { readFile } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const { join, resolve } = require("node:path");
const vm = require("node:vm");

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const adventures = await loadAdventures();
  const manifest = await readJson(resolve("public/assets/audio/manifest.json"));
  const { requiredKeys, optionalKeys } = buildExpectedKeys(adventures);
  const expectedKeys = [...requiredKeys, ...optionalKeys];
  const missing = expectedKeys.filter((key) => !manifest[key] || !existsSync(resolve("public", manifest[key])));
  const missingRequired = requiredKeys.filter((key) => !manifest[key] || !existsSync(resolve("public", manifest[key])));
  const missingOptional = optionalKeys.filter((key) => !manifest[key] || !existsSync(resolve("public", manifest[key])));

  console.log(`Expected audio keys: ${expectedKeys.length}`);
  console.log(`Required audio keys: ${requiredKeys.length}`);
  console.log(`Optional audio keys: ${optionalKeys.length}`);
  console.log(`Manifest entries: ${Object.keys(manifest).length}`);
  console.log(`Missing required audio keys: ${missingRequired.length}`);
  console.log(`Missing optional audio keys: ${missingOptional.length}`);

  if (missingRequired.length) {
    for (const key of missingRequired) console.log(`- ${key}`);
    process.exitCode = 1;
  } else if (missingOptional.length) {
    console.log("Optional audio still missing:");
    for (const key of missingOptional) console.log(`- ${key}`);
  }
}

async function loadAdventures() {
  const source = await readFile(resolve("public/adventures.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  return sandbox.window.RPG_KIDS_ADVENTURES || [];
}

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return {};
  }
}

function visualChallengeForScene(scene) {
  const challenge = scene?.challenge || scene?.visualChallenge;
  const templateId = challenge?.templateId || (challenge?.type === "sequence_pick" ? "visual_sequence_pick" : challenge?.type);
  return templateId === "visual_sequence_pick" ? challenge : null;
}

function buildExpectedKeys(adventures) {
  const requiredKeys = [];
  const optionalKeys = [];
  for (const adventure of adventures) {
    for (const scene of adventure.scenes || []) {
      requiredKeys.push(`${adventure.id}/${scene.id}/scene`);

      if (scene.diceOutcomes) {
        for (let result = 1; result <= 6; result += 1) {
          requiredKeys.push(`${adventure.id}/${scene.id}/dice-${result}`);
        }
      }

      if (scene.movement) {
        requiredKeys.push(`${adventure.id}/${scene.id}/movement`);
        requiredKeys.push(`${adventure.id}/${scene.id}/movement-question`);
        if (scene.movement.fallback) requiredKeys.push(`${adventure.id}/${scene.id}/movement-fallback`);
      }

      if (visualChallengeForScene(scene)) {
        requiredKeys.push(`${adventure.id}/${scene.id}/visual-challenge`);
        optionalKeys.push(`${adventure.id}/${scene.id}/visual-success`);
      }

      if (scene.hub?.routes?.length) {
        requiredKeys.push(`${adventure.id}/${scene.id}/hub-return`);
        for (const route of scene.hub.routes) {
          optionalKeys.push(`${adventure.id}/${scene.id}/route-${route.target}`);
        }
      }
    }

    requiredKeys.push(`${adventure.id}/__adventure/celebration`);
  }

  return { requiredKeys: [...requiredKeys, ...uiAudioKeys()], optionalKeys };
}

function uiAudioKeys() {
  return [
    "ui/idle/hub-first-1",
    "ui/idle/hub-first-2",
    "ui/idle/hub-three-1",
    "ui/idle/hub-two-1",
    "ui/idle/hub-one-1",
    "ui/idle/hub-few-2",
    "ui/idle/hub-many-1",
    "ui/idle/hub-many-2",
    "ui/idle/dice-1",
    "ui/idle/dice-2",
    "ui/idle/default-1",
    "ui/idle/default-2",
    "ui/jogue-um-dado/prompt",
  ];
}
