const { readFile } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const { resolve } = require("node:path");
const vm = require("node:vm");

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const adventures = await loadAdventures();
  const index = await readJson(resolve("public/adventure-packages/index.json"));
  const packageByAdventure = new Map();

  for (const item of index.packages || []) {
    if (!item.adventureId || !item.manifest) throw new Error("Package index item missing adventureId or manifest");
    if (packageByAdventure.has(item.adventureId)) throw new Error(`Duplicate package entry for ${item.adventureId}`);
    packageByAdventure.set(item.adventureId, item);
  }

  for (const adventure of adventures) {
    const entry = packageByAdventure.get(adventure.id);
    if (!entry) throw new Error(`Missing package manifest for adventure ${adventure.id}`);
    const packageManifest = await readJson(resolve("public/adventure-packages", entry.manifest.replace(/^\.\//, "")));
    validatePackage(adventure, packageManifest);
  }

  console.log(`Adventure packages checked: ${adventures.length}`);
}

async function loadAdventures() {
  const source = await readFile(resolve("public/adventures.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  return sandbox.window.RPG_KIDS_ADVENTURES || [];
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function validatePackage(adventure, packageManifest) {
  if (packageManifest.schema !== "rpg-kids.adventure-package.v1") {
    throw new Error(`${adventure.id}: invalid package schema`);
  }
  if (packageManifest.adventureId !== adventure.id) {
    throw new Error(`${adventure.id}: package adventureId mismatch`);
  }
  if (packageManifest.assetPack !== adventure.assetPack) {
    throw new Error(`${adventure.id}: package assetPack mismatch`);
  }
  if (!packageManifest.paths?.audioBase?.includes(adventure.id)) {
    throw new Error(`${adventure.id}: audioBase should include adventure id`);
  }
  for (const imagePath of packageManifest.sceneImages || []) {
    if (!existsSync(resolve("public", imagePath))) {
      throw new Error(`${adventure.id}: missing scene image ${imagePath}`);
    }
  }
}
