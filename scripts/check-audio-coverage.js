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
  const expectedKeys = buildExpectedKeys(adventures);
  const missing = expectedKeys.filter((key) => !manifest[key] || !existsSync(resolve("public", manifest[key])));

  console.log(`Expected audio keys: ${expectedKeys.length}`);
  console.log(`Manifest entries: ${Object.keys(manifest).length}`);
  console.log(`Missing audio keys: ${missing.length}`);

  if (missing.length) {
    for (const key of missing) console.log(`- ${key}`);
    process.exitCode = 1;
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

function buildExpectedKeys(adventures) {
  const keys = [];
  for (const adventure of adventures) {
    for (const scene of adventure.scenes || []) {
      keys.push(`${adventure.id}/${scene.id}/scene`);

      if (scene.diceOutcomes) {
        for (let result = 1; result <= 6; result += 1) {
          keys.push(`${adventure.id}/${scene.id}/dice-${result}`);
        }
      }

      if (scene.movement) {
        keys.push(`${adventure.id}/${scene.id}/movement`);
        keys.push(`${adventure.id}/${scene.id}/movement-question`);
        if (scene.movement.fallback) keys.push(`${adventure.id}/${scene.id}/movement-fallback`);
      }
    }

    keys.push(`${adventure.id}/__adventure/celebration`);
  }

  return [...keys, ...uiAudioKeys()];
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
