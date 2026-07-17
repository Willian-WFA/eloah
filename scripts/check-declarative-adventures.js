const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");
const vm = require("node:vm");

const DECLARATIVE_ADVENTURES = [
  {
    id: "cidade-dos-sinos-claros",
    path: "content/adventures/cidade-dos-sinos-claros.json",
  },
];

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const runtimeAdventures = await loadRuntimeAdventures();
  const errors = [];

  for (const entry of DECLARATIVE_ADVENTURES) {
    const runtime = runtimeAdventures.find((adventure) => adventure.id === entry.id);
    const declarative = JSON.parse(await readFile(resolve(entry.path), "utf8"));
    validateDeclarativeAdventure(entry, declarative, runtime, errors);
  }

  if (errors.length) {
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Declarative adventures checked: ${DECLARATIVE_ADVENTURES.length}`);
}

async function loadRuntimeAdventures() {
  const source = await readFile(resolve("public/adventures.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  return sandbox.window.RPG_KIDS_ADVENTURES || [];
}

function validateDeclarativeAdventure(entry, declarative, runtime, errors) {
  if (!runtime) {
    errors.push(`${entry.id}: runtime adventure not found`);
    return;
  }
  if (declarative.schema !== "rpg-kids.playable-adventure.v1") {
    errors.push(`${entry.id}: invalid schema`);
  }
  compare(declarative.id, runtime.id, `${entry.id}.id`, errors);
  compare(declarative.title, runtime.title, `${entry.id}.title`, errors);
  compare(declarative.assetPack, runtime.assetPack, `${entry.id}.assetPack`, errors);
  compare(declarative.scenes?.length, runtime.scenes?.length, `${entry.id}.scenes.length`, errors);
  compare(Object.keys(declarative.rewards || {}).length, Object.keys(runtime.rewards || {}).length, `${entry.id}.rewards.count`, errors);

  const runtimeSceneIds = (runtime.scenes || []).map((scene) => scene.id);
  const declarativeSceneIds = (declarative.scenes || []).map((scene) => scene.id);
  compare(JSON.stringify(declarativeSceneIds), JSON.stringify(runtimeSceneIds), `${entry.id}.sceneIds`, errors);

  for (const scene of declarative.scenes || []) {
    const runtimeScene = (runtime.scenes || []).find((item) => item.id === scene.id);
    if (!runtimeScene) {
      errors.push(`${entry.id}.${scene.id}: runtime scene not found`);
      continue;
    }
    compare(scene.title, runtimeScene.title, `${entry.id}.${scene.id}.title`, errors);
    compare((scene.choices || []).length, (runtimeScene.choices || []).length, `${entry.id}.${scene.id}.choices.length`, errors);
    compare(Boolean(scene.diceOutcomes), Boolean(runtimeScene.diceOutcomes), `${entry.id}.${scene.id}.diceOutcomes`, errors);
    compare(Boolean(scene.hub), Boolean(runtimeScene.hub), `${entry.id}.${scene.id}.hub`, errors);
  }
}

function compare(actual, expected, label, errors) {
  if (actual !== expected) errors.push(`${label}: expected ${expected}, received ${actual}`);
}
