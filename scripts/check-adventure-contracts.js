const { existsSync } = require("node:fs");
const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");
const vm = require("node:vm");

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const adventures = await loadAdventures();
  const errors = [];
  const adventureIds = new Set();

  for (const adventure of adventures) {
    validateAdventure(adventure, adventureIds, errors);
  }

  if (errors.length) {
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Adventure contracts checked: ${adventures.length}`);
}

async function loadAdventures() {
  const source = await readFile(resolve("public/adventures.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  return sandbox.window.RPG_KIDS_ADVENTURES || [];
}

function validateAdventure(adventure, adventureIds, errors) {
  const path = adventure?.id || "unknown-adventure";
  requireString(adventure.id, `${path}.id`, errors);
  requireString(adventure.title, `${path}.title`, errors);
  requireString(adventure.status, `${path}.status`, errors);
  requireString(adventure.template, `${path}.template`, errors);
  requireString(adventure.ageRange, `${path}.ageRange`, errors);
  requireString(adventure.duration, `${path}.duration`, errors);
  requireObject(adventure.contentReview, `${path}.contentReview`, errors);
  requireObject(adventure.progress, `${path}.progress`, errors);
  requireObject(adventure.rewards, `${path}.rewards`, errors);

  if (adventureIds.has(adventure.id)) errors.push(`${path}: duplicate adventure id`);
  adventureIds.add(adventure.id);

  if (!Array.isArray(adventure.scenes) || !adventure.scenes.length) {
    errors.push(`${path}.scenes must contain at least one scene`);
    return;
  }

  const sceneIds = new Set();
  for (const scene of adventure.scenes) {
    if (sceneIds.has(scene.id)) errors.push(`${path}.${scene.id}: duplicate scene id`);
    sceneIds.add(scene.id);
  }

  for (const scene of adventure.scenes) {
    validateScene(adventure, scene, sceneIds, errors);
  }
}

function validateScene(adventure, scene, sceneIds, errors) {
  const path = `${adventure.id}.${scene?.id || "unknown-scene"}`;
  requireString(scene.id, `${path}.id`, errors);
  requireString(scene.title, `${path}.title`, errors);
  requireString(scene.narration, `${path}.narration`, errors);
  requireString(scene.prompt, `${path}.prompt`, errors);

  if (!Array.isArray(scene.choices) || scene.choices.length < 1 || scene.choices.length > 3) {
    errors.push(`${path}.choices must have 1 to 3 options`);
  }

  if (scene.image?.src && !existsSync(resolve("public", scene.image.src))) {
    errors.push(`${path}.image.src missing file: ${scene.image.src}`);
  }

  if (scene.next && !sceneIds.has(scene.next)) {
    errors.push(`${path}.next points to unknown scene: ${scene.next}`);
  }

  if (scene.hub?.routes?.length) {
    for (const route of scene.hub.routes) {
      if (!route.label || !route.target) errors.push(`${path}.hub route missing label or target`);
      if (route.target && !sceneIds.has(route.target)) errors.push(`${path}.hub route points to unknown scene: ${route.target}`);
    }
  }

  if (scene.dice || scene.diceOutcomes) {
    for (const band of ["low", "middle", "high"]) {
      if (!scene.diceOutcomes?.[band]?.narration) {
        errors.push(`${path}.diceOutcomes.${band}.narration is required for dice scenes`);
      }
    }
  }

  if (scene.movement) {
    requireString(scene.movement.label, `${path}.movement.label`, errors);
    requireString(scene.movement.instruction, `${path}.movement.instruction`, errors);
    requireString(scene.movement.fallback, `${path}.movement.fallback`, errors);
  }
}

function requireString(value, label, errors) {
  if (typeof value !== "string" || !value.trim()) errors.push(`${label} is required`);
}

function requireObject(value, label, errors) {
  if (!value || typeof value !== "object" || Array.isArray(value)) errors.push(`${label} is required`);
}
