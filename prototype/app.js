const STORAGE_KEYS = {
  parentState: "rpgKidsParentState",
  generatedDrafts: "rpgKidsGeneratedDrafts",
};

const adventures = [...(window.RPG_KIDS_ADVENTURES || []), ...loadGeneratedDrafts()];

const state = {
  adventure: null,
  selectedAdventureId: null,
  sceneIndex: 0,
  selectedChoice: null,
  narrativeLog: [],
  rolledScenes: new Set(),
  pendingMovementScenes: new Set(),
  completedScenes: new Set(),
  actionProgressScenes: new Set(),
  actionHistory: [],
  progress: {},
  rewards: [],
  avatarLayers: ["Herói"],
  luckPoints: 1,
  useLuck: false,
  pendingOutcomeByScene: {},
  lastActionInsight: "",
  narrationQueue: [],
  credits: 2,
  paidSummaries: new Set(),
  timeLimitSeconds: 30 * 60,
  remainingSeconds: 30 * 60,
  warned: false,
  timer: null,
  soundEnabled: true,
  narrationEnabled: true,
  narrationRate: 0.98,
  childGender: "girl",
  childName: "",
  narratorStyle: "theatrical",
  avatarColor: "violet",
  avatarCompanion: "spark",
  voiceOnly: false,
  lastNarration: "",
  audioContext: null,
  effectTimer: null,
};

const els = {
  libraryView: document.querySelector("#libraryView"),
  sessionView: document.querySelector("#sessionView"),
  endingView: document.querySelector("#endingView"),
  adventureGrid: document.querySelector("#adventureGrid"),
  resumeButton: document.querySelector("#resumeButton"),
  timeLimitSelect: document.querySelector("#timeLimitSelect"),
  childGenderSelect: document.querySelector("#childGenderSelect"),
  childNameInput: document.querySelector("#childNameInput"),
  narratorStyleSelect: document.querySelector("#narratorStyleSelect"),
  avatarColorSelect: document.querySelector("#avatarColorSelect"),
  avatarCompanionSelect: document.querySelector("#avatarCompanionSelect"),
  creditBalance: document.querySelector("#creditBalance"),
  generateDraftButton: document.querySelector("#generateDraftButton"),
  soundToggle: document.querySelector("#soundToggle"),
  voiceOnlyToggle: document.querySelector("#voiceOnlyToggle"),
  narrationToggle: document.querySelector("#narrationToggle"),
  narrationRateSelect: document.querySelector("#narrationRateSelect"),
  removeRestrictedHumorToggle: document.querySelector("#removeRestrictedHumorToggle"),
  paidExtensionToggle: document.querySelector("#paidExtensionToggle"),
  reviewTitle: document.querySelector("#reviewTitle"),
  reviewStatus: document.querySelector("#reviewStatus"),
  reviewSummary: document.querySelector("#reviewSummary"),
  readFullStoryButton: document.querySelector("#readFullStoryButton"),
  buySummaryButton: document.querySelector("#buySummaryButton"),
  fullStoryPanel: document.querySelector("#fullStoryPanel"),
  reviewMeta: document.querySelector("#reviewMeta"),
  reviewFlags: document.querySelector("#reviewFlags"),
  reviewContexts: document.querySelector("#reviewContexts"),
  reviewSettings: document.querySelector("#reviewSettings"),
  approveStoryCheckbox: document.querySelector("#approveStoryCheckbox"),
  restrictedConsentLine: document.querySelector("#restrictedConsentLine"),
  restrictedHumorCheckbox: document.querySelector("#restrictedHumorCheckbox"),
  startChildPanelButton: document.querySelector("#startChildPanelButton"),
  backButton: document.querySelector("#backButton"),
  repeatNarrationButton: document.querySelector("#repeatNarrationButton"),
  stopNarrationButton: document.querySelector("#stopNarrationButton"),
  sessionKicker: document.querySelector("#sessionKicker"),
  sessionTitle: document.querySelector("#sessionTitle"),
  timerText: document.querySelector("#timerText"),
  sceneStage: document.querySelector(".scene-stage"),
  sceneArt: document.querySelector("#sceneArt"),
  sceneNarration: document.querySelector("#sceneNarration"),
  scenePrompt: document.querySelector("#scenePrompt"),
  roundHint: document.querySelector("#roundHint"),
  hubPanel: document.querySelector("#hubPanel"),
  feedbackPanel: document.querySelector("#feedbackPanel"),
  feedbackText: document.querySelector("#feedbackText"),
  narratorLog: document.querySelector("#narratorLog"),
  choicePanel: document.querySelector("#choicePanel"),
  freeActionLabel: document.querySelector("#freeActionLabel"),
  freeActionInput: document.querySelector("#freeActionInput"),
  voiceActionButton: document.querySelector("#voiceActionButton"),
  sendFreeActionButton: document.querySelector("#sendFreeActionButton"),
  actionInsightText: document.querySelector("#actionInsightText"),
  diceButton: document.querySelector("#diceButton"),
  luckButton: document.querySelector("#luckButton"),
  movementButton: document.querySelector("#movementButton"),
  skipButton: document.querySelector("#skipButton"),
  progressMeters: document.querySelector("#progressMeters"),
  avatarPreview: document.querySelector("#avatarPreview"),
  avatarTitle: document.querySelector("#avatarTitle"),
  rewardList: document.querySelector("#rewardList"),
  checkpointButton: document.querySelector("#checkpointButton"),
  nextButton: document.querySelector("#nextButton"),
  endingSummary: document.querySelector("#endingSummary"),
  endingRewards: document.querySelector("#endingRewards"),
  learningReport: document.querySelector("#learningReport"),
  endingLibraryButton: document.querySelector("#endingLibraryButton"),
  diceModal: document.querySelector("#diceModal"),
  diceModalTitle: document.querySelector("#diceModalTitle"),
  diceCube: document.querySelector("#diceCube"),
  diceResultText: document.querySelector("#diceResultText"),
  diceCloseButton: document.querySelector("#diceCloseButton"),
};

function showView(view) {
  [els.libraryView, els.sessionView, els.endingView].forEach((el) => {
    el.classList.toggle("is-active", el === view);
  });
}

function saveCheckpoint(summary) {
  if (!state.adventure) return;
  const checkpoint = {
    adventureId: state.adventure.id,
    sceneIndex: state.sceneIndex,
    narrativeLog: state.narrativeLog,
    progress: state.progress,
    rewards: state.rewards,
    avatarLayers: state.avatarLayers,
    rolledScenes: [...state.rolledScenes],
    pendingMovementScenes: [...state.pendingMovementScenes],
    completedScenes: [...state.completedScenes],
    actionProgressScenes: [...state.actionProgressScenes],
    actionHistory: state.actionHistory,
    pendingOutcomeByScene: state.pendingOutcomeByScene,
    selectedChoice: state.selectedChoice,
    childGender: state.childGender,
    childName: state.childName,
    narratorStyle: state.narratorStyle,
    avatarColor: state.avatarColor,
    avatarCompanion: state.avatarCompanion,
    voiceOnly: state.voiceOnly,
    luckPoints: state.luckPoints,
    remainingSeconds: state.remainingSeconds,
    summary,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem("rpgKidsCheckpoint", JSON.stringify(checkpoint));
  els.resumeButton.hidden = false;
}

function loadCheckpoint() {
  const raw = localStorage.getItem("rpgKidsCheckpoint");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearCheckpoint() {
  localStorage.removeItem("rpgKidsCheckpoint");
  els.resumeButton.hidden = true;
}

function loadParentState() {
  const raw = localStorage.getItem(STORAGE_KEYS.parentState);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    state.credits = saved.credits ?? state.credits;
    state.paidSummaries = new Set(saved.paidSummaries || []);
    state.narrationEnabled = saved.narrationEnabled ?? state.narrationEnabled;
    state.narrationRate = saved.narrationRate ?? state.narrationRate;
    state.childGender = saved.childGender || state.childGender;
    state.childName = saved.childName || state.childName;
    state.narratorStyle = saved.narratorStyle || state.narratorStyle;
    state.avatarColor = saved.avatarColor || state.avatarColor;
    state.avatarCompanion = saved.avatarCompanion || state.avatarCompanion;
    state.voiceOnly = saved.voiceOnly ?? state.voiceOnly;
    els.narrationToggle.checked = state.narrationEnabled;
    els.narrationRateSelect.value = String(state.narrationRate);
    els.childGenderSelect.value = state.childGender;
    els.childNameInput.value = state.childName;
    els.narratorStyleSelect.value = state.narratorStyle;
    els.avatarColorSelect.value = state.avatarColor;
    els.avatarCompanionSelect.value = state.avatarCompanion;
    els.voiceOnlyToggle.checked = state.voiceOnly;
  } catch {
    state.credits = 2;
    state.paidSummaries = new Set();
  }
}

function saveParentState() {
  const payload = {
    credits: state.credits,
    paidSummaries: [...state.paidSummaries],
    narrationEnabled: els.narrationToggle.checked,
    narrationRate: Number(els.narrationRateSelect.value),
    childGender: els.childGenderSelect.value,
    childName: els.childNameInput.value.trim(),
    narratorStyle: els.narratorStyleSelect.value,
    avatarColor: els.avatarColorSelect.value,
    avatarCompanion: els.avatarCompanionSelect.value,
    voiceOnly: els.voiceOnlyToggle.checked,
  };
  localStorage.setItem(STORAGE_KEYS.parentState, JSON.stringify(payload));
}

function loadGeneratedDrafts() {
  const raw = localStorage.getItem(STORAGE_KEYS.generatedDrafts);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveGeneratedDrafts() {
  const generated = adventures.filter((adventure) => adventure.generatedBy === "mock_ai");
  localStorage.setItem(STORAGE_KEYS.generatedDrafts, JSON.stringify(generated));
}

function renderLibrary() {
  const checkpoint = loadCheckpoint();
  els.resumeButton.hidden = !checkpoint;
  els.adventureGrid.innerHTML = "";

  adventures.forEach((adventure) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "adventure-card";
    card.classList.toggle("is-selected", adventure.id === state.selectedAdventureId);
    card.innerHTML = `
      <div class="cover-art" style="background:${coverGradient(adventure)}">${coverIcon(adventure)}</div>
      <div>
        <p class="status">${adventure.status === "approved" ? "Validada" : "Rascunho"} · ${adventure.duration}</p>
        <h2>${adventure.title}</h2>
        <div class="tags">${adventure.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      </div>
    `;
    card.addEventListener("click", () => selectAdventureForReview(adventure.id));
    els.adventureGrid.appendChild(card);
  });
}

function selectAdventureForReview(adventureId) {
  state.selectedAdventureId = adventureId;
  els.approveStoryCheckbox.checked = false;
  els.restrictedHumorCheckbox.checked = false;
  renderLibrary();
  renderParentReview();
}

function selectedAdventure() {
  return adventures.find((item) => item.id === state.selectedAdventureId) || null;
}

function renderParentReview() {
  const adventure = selectedAdventure();
  if (!adventure) {
    els.reviewTitle.textContent = "História selecionada";
    els.reviewStatus.textContent = "Aguardando";
    els.reviewSummary.textContent = "Escolha uma aventura para ver resumo, permissões e pontos de atenção.";
    els.reviewMeta.innerHTML = "";
    els.reviewFlags.innerHTML = "";
    els.reviewContexts.innerHTML = "";
    els.reviewSettings.innerHTML = "";
    els.fullStoryPanel.hidden = true;
    els.fullStoryPanel.innerHTML = "";
    els.readFullStoryButton.disabled = true;
    els.buySummaryButton.disabled = true;
    els.restrictedConsentLine.hidden = true;
    els.startChildPanelButton.disabled = true;
    return;
  }

  const review = adventure.contentReview || {};
  const needsConsent = Boolean(review.requiresParentConsent || adventure.humorProfile?.restrictedPottyHumor);
  const flags = review.flags?.length ? review.flags : ["sem_alertas"];

  els.reviewTitle.textContent = adventure.title;
  els.reviewStatus.textContent = adventure.status === "approved" ? "Validada" : "Rascunho";
  const summaryUnlocked = state.paidSummaries.has(adventure.id);
  els.reviewSummary.textContent = summaryUnlocked
    ? review.parentSummary || "História sem resumo adulto cadastrado."
    : "Resumo automático bloqueado. Ler a história inteira é grátis; gerar resumo custa 1 crédito.";
  els.readFullStoryButton.disabled = false;
  els.buySummaryButton.disabled = summaryUnlocked || state.credits < 1;
  els.buySummaryButton.textContent = summaryUnlocked ? "Resumo gerado" : "Gerar resumo · 1 crédito";
  els.reviewMeta.innerHTML = renderReviewMeta(adventure);
  els.reviewFlags.innerHTML = flags.map((flag) => `<span class="tag">${labelForFlag(flag)}</span>`).join("");
  els.reviewContexts.innerHTML = renderFlaggedContexts(review.flaggedContexts || []);
  els.reviewSettings.innerHTML = renderReviewSettings(adventure);
  els.restrictedConsentLine.hidden = !needsConsent;
  updateParentApproval();
  updateCreditUI();
}

function updateParentApproval() {
  const adventure = selectedAdventure();
  if (!adventure) {
    els.startChildPanelButton.disabled = true;
    return;
  }
  const review = adventure.contentReview || {};
  const needsConsent = Boolean(review.requiresParentConsent || adventure.humorProfile?.restrictedPottyHumor);
  const consentOk = !needsConsent || els.restrictedHumorCheckbox.checked || els.removeRestrictedHumorToggle.checked;
  const extensionOk = state.credits >= extensionCreditCost(Number(els.timeLimitSelect.value));
  els.startChildPanelButton.disabled = !(els.approveStoryCheckbox.checked && consentOk && extensionOk);
}

function labelForFlag(flag) {
  const labels = {
    personagens_absurdos: "Personagens absurdos",
    humor_restrito: "Humor restrito",
    movimento: "Movimento",
    idiomas: "Idiomas",
    campanha: "Campanha longa",
    sem_alertas: "Sem alertas",
  };
  return labels[flag] || flag.replaceAll("_", " ");
}

function renderReviewMeta(adventure) {
  const sceneCount = adventure.scenes?.length || 0;
  return `
    <div><dt>Idade</dt><dd>${adventure.ageRange}</dd></div>
    <div><dt>Duração</dt><dd>${adventure.duration}</dd></div>
    <div><dt>Modelo</dt><dd>${labelForTemplate(adventure.template)}</dd></div>
    <div><dt>Pacote</dt><dd>${adventure.assetPack || "padrão"}</dd></div>
    <div><dt>Cenas</dt><dd>${sceneCount}</dd></div>
  `;
}

function renderFlaggedContexts(contexts) {
  if (!contexts.length) {
    return '<p class="quiet-line">Nenhum trecho sensível sinalizado nesta história.</p>';
  }
  const action = els.removeRestrictedHumorToggle.checked
    ? "<p class=\"quiet-line\">Ação selecionada: remover/substituir antes de liberar.</p>"
    : "<p class=\"quiet-line\">Ação selecionada: manter apenas com consentimento explícito.</p>";
  return `
    <h3>Trechos sinalizados</h3>
    <ul>
      ${contexts.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    ${action}
  `;
}

function renderReviewSettings(adventure) {
  const minutes = Number(els.timeLimitSelect.value);
  const extensionCost = extensionCreditCost(minutes);
  const sound = els.soundToggle.checked ? "ligados" : "desligados";
  const narration = els.narrationToggle.checked ? `ligada (${labelForNarrationRate(Number(els.narrationRateSelect.value))})` : "desligada";
  const restrictedAction = els.removeRestrictedHumorToggle.checked ? "remover se aparecer" : "manter somente com consentimento";
  const paidExtension = extensionCost > 0 ? `${extensionCost} crédito(s)` : "não usa crédito";
  return `
    <h3>Configuração de hoje</h3>
    <p>Tempo: ${minutes} min · Sons: ${sound} · Narrador: ${narration} · Humor restrito: ${restrictedAction} · Extensão: ${paidExtension}</p>
    <p>Aviso antes do fim: ${adventure.sessionPolicy?.warningMinutesBeforeEnd || 5} min · Extensão suave: ${adventure.sessionPolicy?.softExtensionMinutes || 0} min</p>
  `;
}

function labelForNarrationRate(rate) {
  if (rate < 0.85) return "bem calmo";
  if (rate >= 0.95 && rate < 1) return "teatral";
  if (rate < 1) return "calmo";
  return "normal";
}

function extensionCreditCost(minutes) {
  if (minutes <= 30) return 0;
  return Math.ceil((minutes - 30) / 15);
}

function updateCreditUI() {
  els.creditBalance.textContent = state.credits;
  saveParentState();
}

function renderFullStory(adventure) {
  els.fullStoryPanel.hidden = false;
  els.fullStoryPanel.innerHTML = `
    <h3>História inteira</h3>
    <p class="quiet-line">Leitura gratuita para o responsável: cenas, escolhas, desafios, dado, recompensas e final.</p>
    <ol>
      ${adventure.scenes
        .map((scene) => renderFullScene(scene, adventure))
        .join("")}
    </ol>
  `;
}

function renderFullScene(scene, adventure) {
  const reviewChoices = scene.hub?.routes?.length
    ? [...scene.hub.routes.map((route) => route.label), "Livre escolha"]
    : scene.choices || [];
  const choices = reviewChoices.length ? `<p><strong>Escolhas:</strong> ${reviewChoices.join(" · ")}</p>` : "";
  const movement = scene.movement
    ? `<p><strong>Desafio físico:</strong> ${scene.movement.instruction} Alternativa: ${scene.movement.fallback}</p>`
    : "";
  const language = scene.language
    ? `<p><strong>Idioma:</strong> ${scene.language.phrase || scene.language.word || scene.language.original} = ${scene.language.meaning || scene.language.meaning_pt}</p>`
    : "";
  const learningCriteria = scene.learningCriteria
    ? `<p><strong>Critério de aprendizado:</strong> ${scene.learningCriteria}</p>`
    : "";
  const media = renderSceneMediaContract(scene);
  const dice = scene.diceOutcomes
    ? `<div class="full-dice">
        ${renderOutcomeReview("Dado 1-3", scene.diceOutcomes.low, scene, adventure)}
        ${renderOutcomeReview("Dado 4", scene.diceOutcomes.middle, scene, adventure)}
        ${renderOutcomeReview("Dado 5-6", scene.diceOutcomes.high, scene, adventure)}
      </div>`
    : "";
  const reward = scene.reward ? `<p><strong>Recompensa:</strong> ${adventure.rewards?.[scene.reward]?.label || scene.reward}</p>` : "";
  const progress = scene.progressDelta
    ? `<p><strong>Progresso:</strong> ${Object.entries(scene.progressDelta)
        .map(([key, value]) => `${labelFor(key)} +${value}`)
        .join(", ")}</p>`
    : "";

  return `
    <li>
      <strong>${scene.title}</strong>
      <p>${scene.narration}</p>
      <p><strong>Pergunta:</strong> ${scene.prompt || "O que você faz?"}</p>
      ${choices}
      ${movement}
      ${language}
      ${learningCriteria}
      ${media}
      ${dice}
      ${reward}
      ${progress}
    </li>
  `;
}

function renderOutcomeReview(label, outcome, scene, adventure) {
  const progress = outcome?.progressDelta
    ? ` Progresso: ${Object.entries(outcome.progressDelta)
        .map(([key, value]) => `${labelFor(key)} +${value}`)
        .join(", ")}.`
    : "";
  const rewardId = outcome?.reward;
  const reward = rewardId ? ` Recompensa: ${adventure.rewards?.[rewardId]?.label || rewardId}.` : "";
  return `<p><strong>${label}:</strong> ${outcome?.narration || "Sem texto cadastrado."}${progress}${reward}</p>`;
}

function renderSceneMediaContract(scene) {
  const image = scene.image
    ? `<p><strong>Imagem:</strong> ${scene.image.alt || scene.image.assetId || scene.image.src}</p>`
    : "";
  const sound = scene.sound
    ? `<p><strong>Sons:</strong> ${Object.values(scene.sound).filter(Boolean).join(" · ")}</p>`
    : "";
  const effects = scene.effects
    ? `<p><strong>Efeitos:</strong> ${Object.values(scene.effects).filter(Boolean).join(" · ")}</p>`
    : "";
  if (!image && !sound && !effects) return "";
  return `${image}${sound}${effects}`;
}

function buySummary() {
  const adventure = selectedAdventure();
  if (!adventure || state.paidSummaries.has(adventure.id) || state.credits < 1) return;
  state.credits -= 1;
  state.paidSummaries.add(adventure.id);
  saveParentState();
  renderParentReview();
}

function generateDraftAdventure() {
  const draftId = `rascunho-ia-${Date.now()}`;
  const draft = {
    id: draftId,
    generatedBy: "mock_ai",
    title: "Rascunho IA: A Torre do Sapo-Rei",
    coverAsset: "cover_frog_tower",
    tags: ["rascunho", "ia", "torre", "movimento"],
    ageRange: "4-6",
    duration: "12-18 min",
    status: "draft",
    template: "quest",
    humorProfile: {
      style: ["silly", "absurd_characters"],
      restrictedPottyHumor: true,
      frequency: "rare",
    },
    contentReview: {
      flags: ["humor_restrito", "personagens_absurdos", "movimento"],
      requiresParentConsent: true,
      flaggedContexts: [
        "Cena 1: a IA sugeriu uma piada de banheiro. Ação recomendada: remover ou substituir por uma porta que espirra confete.",
      ],
      parentSummary:
        "Rascunho de aventura com um sapo-rei esquecido, uma torre torta e desafios de movimento. Contém um trecho de humor restrito sinalizado para decisão do responsável.",
    },
    sessionPolicy: { warningMinutesBeforeEnd: 5, softExtensionMinutes: 2 },
    luck: { startingPoints: 1, maxPoints: 3 },
    progress: {
      coragem: 0,
      gentileza: 0,
      movimento: 0,
      palavras_novas: 0,
      criatividade: 0,
      pensamento_esperto: 0,
      cooperacao: 0,
    },
    rewards: {},
    scenes: [
      {
        id: "torre_torta",
        title: "Torre Torta",
        asset: "crooked_tower",
        color: "#7fb8d8",
        narration:
          "No alto de uma torre torta, um sapo-rei esqueceu onde guardou sua coroa de papel. Uma porta pequena espirra confete sempre que alguem fala baixo.",
        prompt: "O que você faz?",
        choices: ["Eu bato na porta", "Eu procuro pegadas", "Eu chamo o sapo-rei", "Livre escolha"],
        movement: {
          label: "Passos de Sapo",
          instruction: "Dê 3 pulinhos pequenos como um sapo feliz.",
          fallback: "Bata palmas 3 vezes ou conte 1, 2, 3.",
        },
        dice: true,
        diceOutcomes: {
          low: {
            narration:
              "A porta espirra confete e fecha de surpresa. O sapo-rei ri baixinho e mostra uma escada menor para continuar.",
          },
          middle: {
            narration: "Uma placa pede 3 pulinhos de sapo para abrir a porta torta.",
          },
          high: {
            narration:
              "A porta abre com uma chuva de confete. Você encontra a coroa de papel em cima de uma almofada azul.",
          },
        },
        progressDelta: { coragem: 1, movimento: 1 },
        next: null,
      },
    ],
  };

  adventures.unshift(draft);
  saveGeneratedDrafts();
  state.selectedAdventureId = draft.id;
  els.approveStoryCheckbox.checked = false;
  els.restrictedHumorCheckbox.checked = false;
  renderLibrary();
  renderParentReview();
}

function labelForTemplate(template) {
  const labels = {
    quest: "Jornada",
    long_branching_quest_hub: "Campanha",
    rescue: "Resgate",
    mystery: "Mistério",
    exploration: "Exploração",
    festival: "Festival",
    training: "Treino",
  };
  return labels[template] || template || "História";
}

function coverIcon(adventure) {
  if (adventure.id.includes("sinos")) return "♪";
  if (adventure.id.includes("caverna")) return "⌂";
  return "✦";
}

function coverGradient(adventure) {
  if (adventure.id.includes("sinos")) return "linear-gradient(135deg,#ffd66b,#80bfff)";
  if (adventure.id.includes("caverna")) return "linear-gradient(135deg,#b8a07a,#ffd66b)";
  return "linear-gradient(135deg,#80bfff,#ff8fb3)";
}

function startAdventure(adventureId, checkpoint = null) {
  const adventure = adventures.find((item) => item.id === adventureId);
  if (!adventure) return;
  const extensionCost = checkpoint ? 0 : extensionCreditCost(Number(els.timeLimitSelect.value));
  if (state.credits < extensionCost) {
    renderParentReview();
    return;
  }
  state.credits -= extensionCost;
  updateCreditUI();

  state.adventure = prepareAdventureForChild(adventure);
  state.sceneIndex = checkpoint?.sceneIndex || 0;
  state.narrativeLog = [...(checkpoint?.narrativeLog || [])];
  state.progress = structuredClone(checkpoint?.progress || state.adventure.progress);
  state.rewards = [...(checkpoint?.rewards || [])];
  state.avatarLayers = [...(checkpoint?.avatarLayers || ["Herói"])];
  state.rolledScenes = new Set(checkpoint?.rolledScenes || []);
  state.pendingMovementScenes = new Set(checkpoint?.pendingMovementScenes || []);
  state.completedScenes = new Set(checkpoint?.completedScenes || []);
  state.actionProgressScenes = new Set(checkpoint?.actionProgressScenes || []);
  state.actionHistory = [...(checkpoint?.actionHistory || [])];
  state.luckPoints = checkpoint?.luckPoints ?? state.adventure.luck?.startingPoints ?? 1;
  state.useLuck = false;
  state.pendingOutcomeByScene = structuredClone(checkpoint?.pendingOutcomeByScene || {});
  state.selectedChoice = checkpoint?.selectedChoice || null;
  state.warned = false;
  state.soundEnabled = els.soundToggle.checked;
  state.narrationEnabled = els.narrationToggle.checked;
  state.narrationRate = Number(els.narrationRateSelect.value);
  state.childGender = checkpoint?.childGender || els.childGenderSelect.value || state.childGender;
  state.childName = checkpoint?.childName || els.childNameInput.value.trim() || state.childName;
  state.narratorStyle = checkpoint?.narratorStyle || els.narratorStyleSelect.value || state.narratorStyle;
  state.avatarColor = checkpoint?.avatarColor || els.avatarColorSelect.value || state.avatarColor;
  state.avatarCompanion = checkpoint?.avatarCompanion || els.avatarCompanionSelect.value || state.avatarCompanion;
  state.voiceOnly = checkpoint?.voiceOnly ?? els.voiceOnlyToggle.checked;
  state.timeLimitSeconds = Number(els.timeLimitSelect.value) * 60;
  state.remainingSeconds = checkpoint?.remainingSeconds || state.timeLimitSeconds;
  if (!checkpoint) {
    state.narrativeLog = [];
  }

  showView(els.sessionView);
  els.sessionView.classList.toggle("is-voice-only", state.voiceOnly);
  renderScene();
  startTimer();
}

function resumeAdventure() {
  const checkpoint = loadCheckpoint();
  if (!checkpoint) return;
  startAdventure(checkpoint.adventureId, checkpoint);
  const summary = buildResumeSummary(checkpoint);
  addNarratorEntry("checkpoint", summary);
  showFeedback(summary, "storybook_checkpoint", "warm_glow");
}

function currentScene() {
  return state.adventure.scenes[state.sceneIndex];
}

function sceneChoices(scene) {
  if (scene.hub?.routes?.length) {
    const routes = scene.hub.routes.filter((route) => isRouteAvailable(route));
    const labels = routes.map((route) => route.label);
    return labels.length ? [...labels, "Livre escolha"] : scene.hub.emptyChoices || ["Eu peço ajuda para Luma", "Eu olho o mapa", "Livre escolha"];
  }
  return scene.choices || [];
}

function isRouteAvailable(route) {
  if (route.requiresProgress) {
    const progressOk = Object.entries(route.requiresProgress).every(([key, value]) => (state.progress[key] || 0) >= value);
    if (!progressOk) return false;
  }
  if (route.requiresRewards?.some((rewardId) => !state.rewards.includes(rewardId))) return false;
  if (route.requiresCompleted?.some((sceneId) => !state.completedScenes.has(sceneId))) return false;
  if (route.hideWhenCompleted && state.completedScenes.has(route.target)) return false;
  if (route.hideWhenRewarded && state.rewards.includes(route.hideWhenRewarded)) return false;
  return true;
}

function resolveSceneNext(scene) {
  if (scene.hub?.routes?.length) {
    const route = scene.hub.routes.find((item) => routeMatchesChoice(item, state.selectedChoice) && isRouteAvailable(item));
    return route?.target || scene.next;
  }
  return scene.choiceRoutes?.[state.selectedChoice] || scene.next;
}

function routeMatchesChoice(route, choice) {
  if (route.label === choice) return true;
  const action = normalizeActionText(choice || "");
  const label = normalizeActionText(route.label || "");
  const signals = route.signals || label.split(" ").filter((part) => part.length > 3);
  return signals.map(normalizeActionText).some((signal) => action.includes(signal));
}

function renderScene() {
  const scene = currentScene();
  if (!scene) {
    finishAdventure(false);
    return;
  }

  els.sessionKicker.textContent = state.adventure.title;
  els.sessionTitle.textContent = scene.title;
  renderSceneArt(scene);
  els.sceneNarration.textContent = genderedText(scene.narration);
  els.scenePrompt.textContent = genderedText(scene.prompt || "");
  els.choicePanel.innerHTML = "";
  els.freeActionInput.value = "";
  els.actionInsightText.textContent = "";
  els.feedbackPanel.hidden = true;
  renderChildTerms();
  renderHubPanel(scene);

  sceneChoices(scene).forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.classList.toggle("is-selected", state.selectedChoice === choice);
    button.innerHTML = `<span class="choice-number">${index + 1}</span><span>${escapeHtml(choice)}</span>`;
    button.addEventListener("click", () => {
      [...els.choicePanel.children].forEach((child) => child.classList.remove("is-selected"));
      button.classList.add("is-selected");
      if (choice.toLowerCase().includes("livre")) {
        els.freeActionInput.focus();
        showFeedback(`Pode inventar sua ação. Me diga o que ${childTerms().your} ${childTerms().hero} faz.`, "warm_chime");
        return;
      }
      handlePlayerAction(choice, "choice");
    });
    els.choicePanel.appendChild(button);
  });

  els.diceButton.hidden = !scene.dice;
  els.movementButton.hidden = !scene.movement;
  els.skipButton.hidden = false;
  renderSceneControls();
  els.nextButton.textContent = scene.hub ? "Seguir caminho" : scene.next ? "Avançar" : "Finalizar";

  renderProgress();
  renderAvatar();
  addNarratorEntry("scene", `Cena: ${scene.title}. ${scene.prompt || "O que você faz?"}`);
  updateTimerUI();
  runSceneEffect(scene.effects?.enter || scene.audiovisual?.enter);
  playCue(scene.sound?.enter || scene.audiovisual?.enter);
  speakNarration(composeSceneNarration(scene));
}

function renderHubPanel(scene) {
  if (!els.hubPanel) return;
  if (!scene.hub?.routes?.length) {
    els.hubPanel.hidden = true;
    els.hubPanel.innerHTML = "";
    return;
  }

  const notes = Math.round(state.progress.notas_sino || 0);
  const routes = scene.hub.routes.map((route, index) => {
    const completed = state.completedScenes.has(route.target);
    const available = isRouteAvailable(route);
    const lockedReason = routeLockReason(route);
    const status = completed ? "Concluído" : available ? "Aberto" : lockedReason;
    const statusClass = completed ? "is-complete" : available ? "is-open" : "is-locked";
    if (available && !completed) {
      return `<li class="${statusClass}"><button type="button" data-route-index="${index}"><span>${escapeHtml(route.label)}</span><strong>${escapeHtml(status)}</strong></button></li>`;
    }
    return `<li class="${statusClass}"><span>${escapeHtml(route.label)}</span><strong>${escapeHtml(status)}</strong></li>`;
  });

  els.hubPanel.hidden = false;
  els.hubPanel.innerHTML = `
    <div class="hub-header">
      <div>
        <p class="eyebrow">Mapa da cidade</p>
        <h2>Notas de Sino: ${notes}/5</h2>
      </div>
      <span class="hub-badge">${sceneChoices(scene).filter((choice) => !choice.toLowerCase().includes("livre")).length} caminhos</span>
    </div>
    <ul class="hub-route-list">${routes.join("")}</ul>
  `;
  els.hubPanel.querySelectorAll("[data-route-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const route = scene.hub.routes[Number(button.dataset.routeIndex)];
      if (route) handlePlayerAction(route.label, "choice");
    });
  });
}

function routeLockReason(route) {
  if (route.requiresProgress?.notas_sino) return `${route.requiresProgress.notas_sino} notas`;
  if (route.requiresRewards?.length) return "item";
  if (route.requiresCompleted?.length) return "quest";
  return "Bloqueado";
}

function addNarratorEntry(kind, text) {
  const entryText = genderedText(text);
  const last = state.narrativeLog[state.narrativeLog.length - 1];
  if (last?.kind === kind && last?.text === entryText) {
    renderNarratorLog();
    return;
  }
  state.narrativeLog.push({
    kind,
    text: entryText,
    sceneId: currentScene()?.id,
    at: new Date().toISOString(),
  });
  state.narrativeLog = state.narrativeLog.slice(-8);
  renderNarratorLog();
}

function renderNarratorLog() {
  if (!els.narratorLog) return;
  els.narratorLog.innerHTML = state.narrativeLog
    .map((entry) => `<li data-kind="${escapeHtml(entry.kind)}">${escapeHtml(entry.text)}</li>`)
    .join("");
}

function renderChildTerms() {
  const terms = childTerms();
  if (els.freeActionLabel) {
    els.freeActionLabel.textContent = `Diga o que ${terms.your} ${terms.hero} faz`;
  }
  if (els.avatarTitle) {
    els.avatarTitle.textContent = terms.heroCap;
  }
}

function childTerms() {
  if (state.childGender === "boy") {
    return {
      article: "o",
      your: "seu",
      hero: "herói",
      heroCap: "Herói",
      adventurer: "aventureiro",
      guardian: "Guardião Corajoso",
      friend: "Amigo Gentil",
      jumper: "Saltador de Aventuras",
      wordMage: "Mago das Palavras",
      inventor: "Inventor Brilhante",
      detective: "Detetive de Pistas",
      partner: "Parceiro de Jornada",
    };
  }
  return {
    article: "a",
    your: "sua",
    hero: "heroína",
    heroCap: "Heroína",
    adventurer: "aventureira",
    guardian: "Guardiã Corajosa",
    friend: "Amiga Gentil",
    jumper: "Saltadora de Aventuras",
    wordMage: "Maga das Palavras",
    inventor: "Inventora Brilhante",
    detective: "Detetive de Pistas",
    partner: "Parceira de Jornada",
  };
}

function childCallName() {
  return state.childName || childTerms().adventurer;
}

function narratorStyleProfile() {
  const profiles = {
    gentle: {
      actionLead: "Eu ouvi com cuidado.",
      diceLead: "Agora vamos deixar o dado contar a sorte, devagarinho.",
      impossible: "Essa ideia é enorme. Vou guardar a magia dela e trazer para um caminho seguro.",
      silence: "Tudo bem pensar um pouquinho. Você pode falar uma ideia simples, como olhar, perguntar ou pedir ajuda.",
      voiceRateOffset: -0.08,
      voicePitch: 1.02,
    },
    theatrical: {
      actionLead: "Anotado no livro invisível do mestre.",
      diceLead: "Agora, mão no dado. Vamos descobrir se a sorte sorriu para você.",
      impossible: "Uau, que ideia gigante. O mundo balançou, mas o mestre transforma isso em uma tentativa segura.",
      silence: "O mestre faz suspense... e espera sua ideia. Pode falar qualquer ação pequena.",
      voiceRateOffset: 0.06,
      voicePitch: 1.12,
    },
    epic: {
      actionLead: "Seu gesto ecoa pela jornada.",
      diceLead: "Que o dado revele o destino desta cena.",
      impossible: "Essa vontade é poderosa demais para este momento. Vamos usar uma versão heroica e segura dela.",
      silence: "Toda grande jornada tem uma pausa. Quando estiver pronta ou pronto, diga o próximo passo.",
      voiceRateOffset: 0.02,
      voicePitch: 1.08,
    },
    teacher: {
      actionLead: "Boa escolha. Vamos entender o que ela treina.",
      diceLead: "Agora o dado mostra a consequência da escolha.",
      impossible: "Essa ação saiu da rota da cena. Vamos adaptar para uma versão possível e segura.",
      silence: "Você pode escolher uma ação curta: observar, perguntar, tentar, ajudar ou usar um item.",
      voiceRateOffset: 0,
      voicePitch: 1.04,
    },
  };
  return profiles[state.narratorStyle] || profiles.theatrical;
}

function genderedText(value) {
  const text = String(value || "");
  if (state.childGender !== "girl") return text;
  return text
    .replaceAll("seu herói", "sua heroína")
    .replaceAll("Seu herói", "Sua heroína")
    .replaceAll("o herói", "a heroína")
    .replaceAll("O herói", "A heroína")
    .replaceAll("herói", "heroína")
    .replaceAll("Herói", "Heroína")
    .replaceAll("aventureiro curioso", "aventureira curiosa")
    .replaceAll("aventureiro", "aventureira")
    .replaceAll("Aventureiro", "Aventureira")
    .replaceAll("parceiro", "parceira")
    .replaceAll("Parceiro", "Parceira")
    .replaceAll("guardião", "guardiã")
    .replaceAll("Guardião", "Guardiã");
}

function composeSceneNarration(scene) {
  const terms = childTerms();
  const name = childCallName();
  const choices = sceneChoices(scene).filter(Boolean);
  const spokenChoices = choices.filter((choice) => !choice.toLowerCase().includes("livre"));
  const optionText = spokenChoices.length
    ? `Escute suas opções de aventura. ${choices
        .filter((choice) => !choice.toLowerCase().includes("livre"))
        .map((choice, index) => `Opção ${index + 1}: ${choice}.`)
        .join(" ")}`
    : "";
  const freeChoice = choices.some((choice) => choice.toLowerCase().includes("livre"))
    ? "Mas você também pode inventar sua própria ação e falar para mim."
    : "Você também pode dizer uma ideia sua.";
  const diceHint = scene.dice
    ? `Quando decidir, fale o que ${terms.your} ${terms.hero} faz. Depois o dado conta a sorte.`
    : `Quando decidir, fale o que ${terms.your} ${terms.hero} faz e a aventura continua.`;

  return [
    `${name}, esta é a cena.`,
    scene.narration,
    scene.prompt || "O que você faz?",
    optionText,
    freeChoice,
    diceHint,
  ]
    .filter(Boolean)
    .join(" ");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function handlePlayerAction(actionText, source) {
  const scene = currentScene();
  const terms = childTerms();
  const action = actionText.trim();
  if (!scene || !action) {
    showFeedback(narratorStyleProfile().silence, "warm_chime");
    return;
  }

  state.selectedChoice = action;
  const insight = evaluateAction(action, scene);
  state.lastActionInsight = insight.message;
  els.actionInsightText.textContent = insight.message;

  if (!state.actionProgressScenes.has(scene.id)) {
    state.actionProgressScenes.add(scene.id);
    applyActionProgress(insight.progressDelta);
  }

  const origin = source === "voice" ? "Ouvi" : "Entendi";
  const reaction = masterReaction(insight, action, scene);
  const diceHint = scene.dice
    ? ` ${narratorStyleProfile().diceLead}`
    : " A cena escuta sua escolha, e o caminho abre para a próxima parte.";
  addNarratorEntry("action", `${origin}: "${action}". ${reaction} ${insight.short}`);
  showFeedback(`${origin}: ${action}. ${reaction} ${insight.short}${diceHint}`, insight.cue, insight.effect);
  rememberAction(scene, action);
  renderSceneControls();
}

function rememberAction(scene, action) {
  state.actionHistory.push({
    sceneId: scene.id,
    text: normalizeActionText(action),
    at: new Date().toISOString(),
  });
  state.actionHistory = state.actionHistory.slice(-12);
}

function repeatedAction(scene, normalizedText) {
  return state.actionHistory.some((entry) => entry.sceneId === scene.id && entry.text === normalizedText);
}

function impossibleAction(normalizedText) {
  return [
    "mato",
    "matar",
    "quebro tudo",
    "destruo",
    "explodo",
    "sumo para sempre",
    "voo ate a lua",
    "fujo da historia",
    "saio do jogo",
  ].some((signal) => normalizedText.includes(signal));
}

function masterReaction(insight, action, scene) {
  const terms = childTerms();
  if (insight.kind === "impossible") return narratorStyleProfile().impossible;
  if (insight.kind === "repeat") {
    return "Essa ideia já apareceu nesta cena. O mestre aceita, mas cutuca sua imaginação para tentar um detalhe novo.";
  }
  const styleLead = narratorStyleProfile().actionLead;
  const reactions = {
    coragem: [
      `${styleLead} Boa, ${terms.adventurer}. A estrada ficou quietinha esperando seu próximo passo.`,
      "Opa, isso tem cheiro de coragem de verdade.",
    ],
    gentileza: [
      "Ah, essa foi bonita. Até a cena ficou mais macia com essa escolha.",
      "Muito bem. Personagens pequenos lembram de gentilezas grandes.",
    ],
    movimento: [
      `Prepare os pés, porque essa aventura gosta de ${terms.hero} que se mexe.`,
      "Muito bom. O corpo entrou na história junto com a imaginação.",
    ],
    palavras_novas: [
      "Palavra mágica registrada. O mundo entendeu um som novo.",
      "Excelente. Uma palavra nova acabou de virar chave de aventura.",
    ],
    criatividade: [
      "Ha! Essa eu não esperava. Ideia guardada no chapéu do mestre.",
      "Que solução diferente. A história abriu um olho curioso para ver isso.",
    ],
    pensamento_esperto: [
      "Muito esperto. Você olhou antes de correr, e isso muda tudo.",
      "Boa investigação. Uma pista acabou de levantar a mão.",
    ],
    cooperacao: [
      "Isso sim é jornada em equipe. Ninguém precisa vencer sozinho.",
      "Muito bem. Quando alguém ajuda, o caminho fica menos estreito.",
    ],
  };
  const key = insight.key || "coragem";
  const pool = reactions[key] || reactions.coragem;
  const seed = `${scene?.id || ""}:${action}`.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return pool[seed % pool.length];
}

function normalizeActionText(actionText) {
  return actionText
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function evaluateAction(actionText, scene = currentScene()) {
  const text = normalizeActionText(actionText);
  if (impossibleAction(text)) {
    return {
      key: "criatividade",
      kind: "impossible",
      short: "O mestre adaptou a ideia para manter a aventura segura.",
      message: "Critério: a criança trouxe uma ideia muito fora da rota; o mestre acolhe e redireciona. Progresso: criatividade +1.",
      progressDelta: { criatividade: 1 },
      cue: "warm_chime",
      effect: "warm_glow",
    };
  }
  if (scene && repeatedAction(scene, text)) {
    return {
      key: "criatividade",
      kind: "repeat",
      short: "A ação repetiu uma ideia; tente acrescentar um detalhe novo.",
      message: "Critério: repetição percebida; o mestre incentiva variação sem punir. Progresso: criatividade +1.",
      progressDelta: { criatividade: 1 },
      cue: "gentle_plop",
      effect: "soft_plop",
    };
  }
  const rubricMatch = evaluateSceneRubric(text, scene);
  if (rubricMatch) return rubricMatch;

  const rules = [
    {
      key: "gentileza",
      words: ["ajudo", "ajudar", "obrigado", "abraco", "cuido", "carinho", "por favor", "pergunto"],
      short: "Isso mostra gentileza.",
      message: "Critério: a ação acolhe, pergunta, agradece ou cuida de alguém. Progresso: gentileza +1.",
      cue: "warm_chime",
      effect: "warm_glow",
    },
    {
      key: "pensamento_esperto",
      words: ["olho", "procuro", "pista", "tocha", "escuto", "placa", "desenho", "chave", "investigo"],
      short: "Isso mostra pensamento esperto.",
      message: "Critério: a ação observa pistas, prepara ferramenta ou investiga antes de correr. Progresso: pensar +1.",
      cue: "warm_chime",
      effect: "warm_glow",
    },
    {
      key: "movimento",
      words: ["pulo", "pular", "corro", "marcho", "danco", "danço", "palma", "palmas", "ando"],
      short: "Isso coloca o corpo na aventura.",
      message: "Critério: a ação usa movimento seguro e simples. Progresso: movimento +1.",
      cue: "bright_chime",
      effect: "gold_glow",
    },
    {
      key: "palavras_novas",
      words: ["hello", "star", "jump", "open", "please", "xing", "palavra", "ingles", "mandarim"],
      short: "Isso treina palavras novas.",
      message: "Critério: a ação usa ou pede uma palavra nova. Progresso: palavras +1.",
      cue: "bell_wave",
      effect: "bell_wave",
    },
    {
      key: "criatividade",
      words: ["invento", "imagino", "transformo", "desenho", "uso", "crio", "finjo", "magico", "mágico"],
      short: "Isso cria uma solução nova.",
      message: "Critério: a ação inventa, transforma ou usa um objeto de um jeito novo. Progresso: criatividade +1.",
      cue: "item_pop_glow",
      effect: "item_pop_glow",
    },
  ];

  const matched = rules.find((rule) => rule.words.some((word) => text.includes(word)));
  if (matched) {
    return {
      ...matched,
      progressDelta: { [matched.key]: 1 },
    };
  }

  return {
    key: "coragem",
    short: "Isso coloca a aventura em movimento.",
    message: "Critério: a criança propôs uma ação própria e continuou a aventura. Progresso: coragem +1.",
    progressDelta: { coragem: 1 },
    cue: "warm_chime",
    effect: "warm_glow",
  };
}

function evaluateSceneRubric(normalizedText, scene) {
  const rubric = scene?.actionRubric || [];
  if (!rubric.length) return null;

  const scored = rubric
    .map((rule) => {
      const signals = (rule.signals || []).map(normalizeActionText);
      const score = signals.reduce((total, signal) => {
        if (!signal) return total;
        if (normalizedText === signal) return total + 4;
        return normalizedText.includes(signal) ? total + 2 : total;
      }, 0);
      return { rule, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) {
    const defaultRule = rubric.find((rule) => rule.default);
    if (!defaultRule) return null;
    return actionRubricInsight(defaultRule);
  }

  return actionRubricInsight(scored[0].rule);
}

function actionRubricInsight(rule) {
  const key = rule.progress || "coragem";
  return {
    key,
    short: rule.short || "Essa escolha combina com o desafio da cena.",
    message:
      rule.message ||
      `Critério da cena: ${rule.criteria || "a ação ajuda a história a avançar"}. Progresso: ${labelFor(key)} +1.`,
    progressDelta: rule.progressDelta || { [key]: 1 },
    cue: rule.cue || "warm_chime",
    effect: rule.effect || "warm_glow",
  };
}

function applyActionProgress(progressDelta) {
  Object.entries(progressDelta || {}).forEach(([key, value]) => {
    state.progress[key] = Math.min(5, (state.progress[key] || 0) + value);
  });
  renderProgress();
}

function captureVoiceAction() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    const example = "Eu procuro uma pista brilhante";
    els.freeActionInput.value = example;
    handlePlayerAction(example, "voice");
    showFeedback("Este navegador ainda não liberou voz aqui. Usei uma ação de exemplo para testar.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  els.voiceActionButton.disabled = true;
  els.voiceActionButton.textContent = "Ouvindo...";
  stopNarration();
  showFeedback("Estou ouvindo sua ação.", null, null, { speak: false });

  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript || "";
    els.freeActionInput.value = transcript;
    handlePlayerAction(transcript, "voice");
  };
  recognition.onerror = () => {
    showFeedback("Não consegui ouvir bem. Escreva a ação ou tente falar de novo.", "gentle_plop");
  };
  recognition.onend = () => {
    els.voiceActionButton.disabled = false;
    els.voiceActionButton.textContent = "Falar ação";
  };
  recognition.start();
}

function prepareAdventureForChild(adventure) {
  const prepared = structuredClone(adventure);
  if (prepared.humorProfile?.restrictedPottyHumor && els.removeRestrictedHumorToggle.checked) {
    prepared.humorProfile.restrictedPottyHumor = false;
    prepared.contentReview = {
      ...(prepared.contentReview || {}),
      flags: (prepared.contentReview?.flags || []).filter((flag) => flag !== "humor_restrito"),
      flaggedContexts: [],
      requiresParentConsent: false,
    };
  }
  return prepared;
}

function sceneIcon(scene) {
  if (scene.id.includes("ponte")) return "◇";
  if (scene.id.includes("sinos")) return "♪";
  if (scene.id.includes("portal")) return "◌";
  if (scene.id.includes("celebracao")) return "✦";
  if (scene.id.includes("caverna")) return "⌂";
  return "★";
}

function renderSceneArt(scene) {
  const image = scene.image || {};
  const assetId = image.assetId || scene.asset || "default_magic";
  els.sceneArt.className = `scene-art scene-art--${assetId}`;
  els.sceneArt.style.setProperty("--scene-a", scene.theme?.palette?.[0] || scene.color || "#80bfff");
  els.sceneArt.style.setProperty("--scene-b", scene.theme?.palette?.[1] || "#fff2a8");
  els.sceneArt.setAttribute("role", "img");
  els.sceneArt.setAttribute("aria-label", image.alt || scene.title);
  els.sceneArt.innerHTML = `
    ${image.src ? `<img class="scene-bitmap" src="${escapeHtml(image.src)}" alt="">` : ""}
    <span class="scene-sky"></span>
    <span class="scene-ground"></span>
    <span class="scene-icon"${image.src ? " aria-hidden=\"true\"" : ""}>${image.src ? "" : image.icon || scene.assetIcon || sceneIcon(scene)}</span>
    <span class="scene-spark scene-spark-a"></span>
    <span class="scene-spark scene-spark-b"></span>
    <span class="scene-spark scene-spark-c"></span>
  `;
}

function applySceneProgress(scene, multiplier = 1, options = {}) {
  if (state.completedScenes.has(scene.id)) return;
  state.completedScenes.add(scene.id);
  const grantReward = options.grantReward ?? true;
  const progressDelta = options.progressDelta || scene.progressDelta || {};
  const rewardId = options.rewardId === undefined ? scene.reward : options.rewardId;

  Object.entries(progressDelta).forEach(([key, value]) => {
    state.progress[key] = Math.min(5, (state.progress[key] || 0) + value * multiplier);
  });

  if (grantReward && rewardId && !state.rewards.includes(rewardId)) {
    state.rewards.push(rewardId);
    const reward = state.adventure.rewards[rewardId];
    if (reward?.layer && !state.avatarLayers.includes(reward.layer)) {
      state.avatarLayers.push(reward.layer);
    }
    addNarratorEntry("reward", `Item ganho: ${reward?.label || rewardId}.`);
    showFeedback(`Você ganhou: ${reward?.label || rewardId}!`, reward?.cue || scene.sound?.reward, scene.effects?.reward);
  }

  renderProgress();
  renderAvatar();
}

function rollDice() {
  const scene = currentScene();
  if (!state.selectedChoice) {
    const terms = childTerms();
    showFeedback(`Primeiro me diga o que ${terms.your} ${terms.hero} faz. Depois o dado decide a sorte.`, "warm_chime");
    return;
  }
  if (!scene.dice || state.rolledScenes.has(scene.id)) {
    showFeedback("O dado deste desafio já foi usado.");
    return;
  }

  state.rolledScenes.add(scene.id);
  playCue(scene.sound?.diceRoll || scene.audiovisual?.diceRolling);
  const rolls = [rollD6()];
  let spentLuck = false;

  if (state.useLuck && state.luckPoints > 0) {
    rolls.push(rollD6());
    state.luckPoints -= 1;
    spentLuck = true;
  }

  const result = Math.max(...rolls);
  const band = diceBand(result);
  const outcome = scene.diceOutcomes?.[band];
  const outcomeProgress = outcome?.progressDelta || scene.progressDelta;
  const outcomeReward = outcome?.reward === undefined ? scene.reward : outcome.reward;
  const cue = scene.sound?.[band] || scene.audiovisual?.[`dice${capitalize(band)}`] || scene.audiovisual?.diceMedium;
  const effect = scene.effects?.[`dice${capitalize(band)}`] || scene.effects?.diceResult;
  const luckText = spentLuck ? ` Sorte mágica: ${rolls.join(" e ")}. Vale ${result}.` : "";
  const message = `${outcome?.narration || defaultDiceNarration(result, band)}${luckText}`;

  state.useLuck = false;
  showDiceResult(result, message, cue, effect);

  if (band === "middle" && scene.movement) {
    state.pendingMovementScenes.add(scene.id);
    state.pendingOutcomeByScene[scene.id] = { progressDelta: outcomeProgress, rewardId: outcomeReward };
    addNarratorEntry("dice", `Dado ${result}: ${outcome?.narration || "um desafio apareceu."}`);
    showFeedback(`${outcome?.narration || "Resultado 4: existe um desafio para abrir o caminho."} ${scene.movement.instruction}`, scene.sound?.middle, scene.effects?.diceMedium);
  } else if (band === "low") {
    addNarratorEntry("dice", `Dado ${result}: ${outcome?.narration || "algo complicou, mas a aventura continuou."}`);
    applySceneProgress(scene, 1, {
      progressDelta: outcomeProgress,
      rewardId: outcomeReward,
      grantReward: String(outcomeReward || "").startsWith("nota_"),
    });
  } else {
    addNarratorEntry("dice", `Dado ${result}: ${outcome?.narration || "sucesso brilhante."}`);
    applySceneProgress(scene, 1, { progressDelta: outcomeProgress, rewardId: outcomeReward });
  }

  renderSceneControls();
}

function completeMovement() {
  const scene = currentScene();
  if (!scene.movement) return;
  if (state.pendingMovementScenes.has(scene.id)) {
    state.pendingMovementScenes.delete(scene.id);
    const pendingOutcome = state.pendingOutcomeByScene[scene.id] || {};
    delete state.pendingOutcomeByScene[scene.id];
    addNarratorEntry("challenge", `${scene.movement.label} completo. O caminho abriu.`);
    showFeedback(`${scene.movement.label} completo. O caminho abriu e a aventura continua!`, scene.sound?.success || scene.audiovisual?.reward, scene.effects?.reward);
    applySceneProgress(scene, 1, {
      progressDelta: pendingOutcome.progressDelta,
      rewardId: pendingOutcome.rewardId,
    });
    renderSceneControls();
    return;
  }
  addNarratorEntry("challenge", `${scene.movement.label}: ${scene.movement.instruction}`);
  showFeedback(`${scene.movement.label}: ${scene.movement.instruction}`, scene.sound?.movement || scene.audiovisual?.reward, scene.effects?.movement);
}

function skipChallenge() {
  const scene = currentScene();
  const fallback = scene.movement?.fallback || "Tudo bem. Luma transforma isso em um caminho mais fácil.";
  if (state.pendingMovementScenes.has(scene.id)) {
    state.pendingMovementScenes.delete(scene.id);
    const pendingOutcome = state.pendingOutcomeByScene[scene.id] || {};
    delete state.pendingOutcomeByScene[scene.id];
    applySceneProgress(scene, 1, {
      progressDelta: pendingOutcome.progressDelta,
      rewardId: pendingOutcome.rewardId,
      grantReward: false,
    });
    renderSceneControls();
  }
  addNarratorEntry("challenge", `Desafio adaptado: ${fallback}`);
  showFeedback(fallback, scene.sound?.softFallback || "gentle_plop", scene.effects?.softFallback);
}

function nextScene() {
  const scene = currentScene();
  if (!state.selectedChoice) {
    showFeedback("Antes de avançar, escolha uma ação ou invente uma resposta para o mestre.", "warm_chime");
    return;
  }
  if (scene.dice && !state.rolledScenes.has(scene.id)) {
    showFeedback("O mestre pediu um dado para descobrir o que acontece.");
    return;
  }
  if (state.pendingMovementScenes.has(scene.id)) {
    showFeedback("Complete o desafio primeiro para abrir o caminho.");
    return;
  }
  if (!scene.dice) {
    applySceneProgress(scene);
  }
  const nextSceneId = resolveSceneNext(scene);
  if (!nextSceneId) {
    finishAdventure(false);
    return;
  }

  const nextIndex = state.adventure.scenes.findIndex((item) => item.id === nextSceneId);
  state.sceneIndex = nextIndex >= 0 ? nextIndex : state.sceneIndex + 1;
  state.selectedChoice = null;
  renderScene();
}

function renderProgress() {
  els.progressMeters.innerHTML = "";
  Object.entries(state.progress).forEach(([key, value]) => {
    const row = document.createElement("div");
    row.className = "meter";
    row.innerHTML = `
      <span>${labelFor(key)}</span>
      <span class="bar"><span style="width:${Math.min(100, (value / 5) * 100)}%"></span></span>
      <strong>${Math.round(value)}</strong>
    `;
    els.progressMeters.appendChild(row);
  });
}

function renderAvatar() {
  const identity = heroIdentity();
  const itemCount = state.rewards.length;
  const companion = companionIcon();
  els.avatarPreview.innerHTML = `
    <div class="hero-figure hero-figure--${identity.tone} hero-color--${escapeHtml(state.avatarColor)}" aria-label="${escapeHtml(identity.title)}">
      <span class="hero-head"></span>
      <span class="hero-face"></span>
      <span class="hero-body"></span>
      <span class="hero-companion">${escapeHtml(companion)}</span>
      ${state.avatarLayers.includes("Chapéu") ? '<span class="hero-hat"></span>' : ""}
      ${state.avatarLayers.includes("Capa") ? '<span class="hero-cape"></span>' : ""}
      ${state.avatarLayers.includes("Botas") ? '<span class="hero-boots"></span>' : ""}
      ${state.avatarLayers.includes("Livro") ? '<span class="hero-book">▣</span>' : ""}
      ${state.avatarLayers.includes("Escudo") ? '<span class="hero-shield">◔</span>' : ""}
      ${state.avatarLayers.includes("Varinha") ? '<span class="hero-wand">✦</span>' : ""}
      ${state.avatarLayers.includes("Martelo") ? '<span class="hero-hammer">⌙</span>' : ""}
      ${itemCount >= 2 ? '<span class="hero-aura"></span>' : ""}
    </div>
    <div class="hero-title">
      <strong>${escapeHtml(childCallName())} · ${escapeHtml(identity.title)}</strong>
      <span>${escapeHtml(identity.subtitle)}</span>
    </div>
  `;
  els.rewardList.innerHTML = "";

  state.rewards.forEach((rewardId) => {
    const reward = state.adventure.rewards[rewardId];
    const item = document.createElement("li");
    item.textContent = reward?.label || rewardId;
    els.rewardList.appendChild(item);
  });

  if (!state.rewards.length) {
    const item = document.createElement("li");
    item.textContent = "Sem itens ainda";
    els.rewardList.appendChild(item);
  }
}

function companionIcon() {
  const icons = {
    spark: "✦",
    cloud: "☁",
    bell: "♪",
    leaf: "❧",
  };
  return icons[state.avatarCompanion] || icons.spark;
}

function heroIdentity() {
  const terms = childTerms();
  const strongest = Object.entries(state.progress || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || "coragem";
  const titleByProgress = {
    coragem: [terms.guardian, "entra no desconhecido com cuidado"],
    gentileza: [terms.friend, "cuida dos personagens antes do prêmio"],
    movimento: [terms.jumper, "resolve desafios com o corpo"],
    palavras_novas: [terms.wordMage, "abre caminhos com idiomas"],
    criatividade: [terms.inventor, "imagina soluções inesperadas"],
    pensamento_esperto: [terms.detective, "observa antes de agir"],
    cooperacao: [terms.partner, "vence pedindo e oferecendo ajuda"],
  };
  const [title, subtitle] = titleByProgress[strongest] || titleByProgress.coragem;
  return {
    title,
    subtitle,
    tone: strongest.replaceAll("_", "-"),
  };
}

function labelFor(key) {
  const labels = {
    coragem: "coragem",
    gentileza: "gentileza",
    movimento: "movimento",
    palavras_novas: "palavras",
    criatividade: "criatividade",
    pensamento_esperto: "pensar",
    cooperacao: "cooperação",
    notas_sino: "notas de sino",
  };
  return labels[key] || key.replace("_", " ");
}

function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.remainingSeconds -= 1;
    updateTimerUI();

    const warningSeconds = (state.adventure.sessionPolicy?.warningMinutesBeforeEnd || 5) * 60;
    if (!state.warned && state.remainingSeconds <= warningSeconds && state.remainingSeconds > 0) {
      state.warned = true;
      showFeedback(
        "Luma olha para o relógio de estrelas. A aventura de hoje está quase guardando o brilho.",
        "clock_star_soft",
      );
    }

    if (state.remainingSeconds <= 0) {
      finishAdventure(true);
    }
  }, 1000);
}

function updateTimerUI() {
  const minutes = Math.max(0, Math.floor(state.remainingSeconds / 60));
  const seconds = Math.max(0, state.remainingSeconds % 60);
  els.timerText.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const wrapper = els.timerText.parentElement;
  wrapper.classList.toggle("is-warning", state.remainingSeconds <= 5 * 60 && state.remainingSeconds > 0);
  wrapper.classList.toggle("is-ended", state.remainingSeconds <= 0);
}

function finishAdventure(timebox) {
  clearInterval(state.timer);
  const scene = currentScene();
  const rewardLabels = state.rewards.map((id) => state.adventure.rewards[id]?.label || id);
  const topProgress = Object.entries(state.progress)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key]) => labelFor(key))
    .join(" e ");

  const summary = timebox
    ? buildResumeSummary()
    : `Hoje você mostrou ${topProgress || "coragem"}. ${rewardLabels.length ? `${capitalize(childTerms().your)} ${childTerms().hero} ganhou ${rewardLabels.join(", ")}.` : "Luma ficou feliz com sua ajuda."}`;

  addNarratorEntry("checkpoint", summary);
  saveCheckpoint(summary);
  els.endingSummary.textContent = summary;
  els.endingRewards.innerHTML = rewardLabels
    .map((reward) => `<span class="reward-badge">${reward}</span>`)
    .join("");
  if (els.learningReport) {
    els.learningReport.innerHTML = buildLearningReport();
  }
  showView(els.endingView);
  runSceneEffect(timebox ? "book_close_soft" : "star_confetti_soft");
  playCue(timebox ? "book_close_soft" : "star_confetti_soft");
}

function buildLearningReport() {
  const rows = Object.entries(state.progress)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  const domains = {
    coragem: "autonomia e iniciativa",
    gentileza: "empatia e cuidado",
    movimento: "motricidade ampla",
    palavras_novas: "linguagem e idiomas",
    criatividade: "imaginação e flexibilidade",
    pensamento_esperto: "observação e resolução de problemas",
    cooperacao: "cooperação",
  };
  const actionCount = state.actionHistory.length;
  const diceCount = state.rolledScenes.size;
  const items = rows.length
    ? rows.map(([key, value]) => `<li><strong>${labelFor(key)}:</strong> ${domains[key] || key} (${Math.round(value)} ponto${value > 1 ? "s" : ""})</li>`).join("")
    : "<li>A sessão ainda não gerou progresso suficiente para relatório.</li>";

  return `
    <section aria-label="Relatório dos pais">
      <p class="eyebrow">Para os pais</p>
      <h2>Aprendizado da sessão</h2>
      <ul>${items}</ul>
      <p>${escapeHtml(childCallName())} declarou ${actionCount} ação${actionCount === 1 ? "" : "es"} e resolveu ${diceCount} desafio${diceCount === 1 ? "" : "s"} de sorte.</p>
    </section>
  `;
}

function buildResumeSummary(checkpoint = state) {
  const adventure = checkpoint.adventure || adventures.find((item) => item.id === checkpoint.adventureId) || state.adventure;
  const scene =
    adventure?.scenes?.[checkpoint.sceneIndex ?? state.sceneIndex] ||
    currentScene();
  const log = checkpoint.narrativeLog || state.narrativeLog || [];
  const usefulLog = log
    .filter((entry) => ["action", "dice", "challenge", "reward"].includes(entry.kind))
    .slice(-4)
    .map((entry) => entry.text.replace(/\s+/g, " ").trim());
  const rewards = checkpoint.rewards || state.rewards || [];
  const rewardLabels = rewards
    .map((id) => adventure?.rewards?.[id]?.label || id)
    .filter(Boolean);

  const progress = checkpoint.progress || state.progress || {};
  const strongest = Object.entries(progress).sort((a, b) => b[1] - a[1])[0]?.[0];
  const progressText = strongest ? `O ponto mais forte foi ${labelFor(strongest)}.` : "A aventura ainda está começando.";
  const logText = usefulLog.length ? ` Antes disso: ${usefulLog.join(" ")}` : "";
  const rewardText = rewardLabels.length ? ` Itens guardados: ${rewardLabels.join(", ")}.` : "";
  const campaignText = buildHubCampaignResume(adventure, checkpoint);

  return `Retomada: você está em ${scene?.title || "uma cena mágica"} de ${adventure?.title || "uma aventura"}. ${progressText}${rewardText}${campaignText}${logText} O mestre vai continuar daqui.`;
}

function buildHubCampaignResume(adventure, checkpoint = state) {
  const hub = adventure?.scenes?.find((scene) => scene.hub?.routes?.length);
  if (!hub) return "";

  const progress = checkpoint.progress || state.progress || {};
  const completedScenes = new Set(checkpoint.completedScenes || [...state.completedScenes]);
  const rewards = checkpoint.rewards || state.rewards || [];
  const notes = progress.notas_sino || 0;
  const completedTitles = adventure.scenes
    .filter((scene) => completedScenes.has(scene.id) && scene.id !== hub.id && !scene.hub)
    .map((scene) => scene.title)
    .slice(-3);
  const openRoutes = hub.hub.routes
    .filter((route) => routeAvailableForSnapshot(route, { progress, completedScenes, rewards }))
    .map((route) => route.label)
    .slice(0, 3);

  const notesText = notes ? ` Você juntou ${Math.round(notes)} Nota${notes === 1 ? "" : "s"} de Sino.` : "";
  const completedText = completedTitles.length ? ` Últimas ajudas: ${completedTitles.join(", ")}.` : "";
  const routesText = openRoutes.length ? ` Caminhos abertos: ${openRoutes.join(", ")}.` : "";
  return `${notesText}${completedText}${routesText}`;
}

function routeAvailableForSnapshot(route, snapshot) {
  if (route.requiresProgress) {
    const progressOk = Object.entries(route.requiresProgress).every(([key, value]) => (snapshot.progress[key] || 0) >= value);
    if (!progressOk) return false;
  }
  if (route.requiresRewards?.some((rewardId) => !snapshot.rewards.includes(rewardId))) return false;
  if (route.requiresCompleted?.some((sceneId) => !snapshot.completedScenes.has(sceneId))) return false;
  if (route.hideWhenCompleted && snapshot.completedScenes.has(route.target)) return false;
  if (route.hideWhenRewarded && snapshot.rewards.includes(route.hideWhenRewarded)) return false;
  return true;
}

function showFeedback(message, cue, effect, options = {}) {
  const feedback = genderedText(message);
  els.feedbackText.textContent = feedback;
  els.feedbackPanel.hidden = false;
  if (effect) runSceneEffect(effect);
  playCue(cue);
  if (options.speak !== false) {
    speakNarration(feedback, { interrupt: false });
  }
}

function renderSceneControls() {
  const scene = currentScene();
  if (!scene) return;
  const alreadyRolled = state.rolledScenes.has(scene.id);
  const pendingMovement = state.pendingMovementScenes.has(scene.id);
  const waitingAction = !state.selectedChoice;
  if (els.roundHint) {
    if (waitingAction) {
      const terms = childTerms();
      els.roundHint.textContent = `1. Escolha ou fale o que ${terms.your} ${terms.hero} faz.`;
    } else if (scene.dice && !alreadyRolled) {
      els.roundHint.textContent = "2. Agora role o dado para ver o que acontece.";
    } else if (pendingMovement) {
      els.roundHint.textContent = "3. Faça o desafio para abrir o caminho.";
    } else {
      els.roundHint.textContent = scene.next ? "Pronto. Você pode avançar." : "Pronto. Você pode finalizar a aventura.";
    }
  }
  els.diceButton.disabled = Boolean(scene.dice && (alreadyRolled || waitingAction));
  els.diceButton.textContent = waitingAction ? "Escolha uma ação" : alreadyRolled ? "Dado usado" : "⚂ Rolar D6";
  els.luckButton.hidden = !scene.dice || alreadyRolled;
  els.luckButton.disabled = !scene.dice || alreadyRolled || waitingAction || state.luckPoints <= 0;
  els.luckButton.textContent = state.luckPoints > 0 ? `Usar sorte (${state.luckPoints})` : "Sem sorte";
  els.luckButton.classList.toggle("is-active", state.useLuck);
  els.movementButton.disabled = waitingAction;
  els.movementButton.textContent = pendingMovement ? "Fiz o desafio" : "Ver desafio";
  els.nextButton.disabled = Boolean(waitingAction || (scene.dice && (!alreadyRolled || pendingMovement)));
}

function showDiceResult(result, message, cue, effect) {
  const reaction = diceResultReaction(result);
  const displayMessage = genderedText(`Você tirou ${result}. ${reaction} ${message}`.trim());
  const faces = ["1", "2", "3", "4", "5", "6"];
  els.diceModal.hidden = false;
  els.diceCube.dataset.result = "";
  els.diceCube.classList.add("is-rolling");
  els.diceModalTitle.textContent = "Rolando o dado...";
  els.diceResultText.textContent = "Escute o dado girando.";

  let ticks = 0;
  const rollAnimation = setInterval(() => {
    const face = faces[Math.floor(Math.random() * faces.length)];
    els.diceCube.textContent = face;
    els.diceCube.setAttribute("aria-label", `Dado girando, passou pelo número ${face}`);
    if (ticks % 2 === 0) playCue("dice_tick_roll");
    ticks += 1;
    if (ticks >= 14) {
      clearInterval(rollAnimation);
      els.diceCube.classList.remove("is-rolling");
      els.diceCube.textContent = faces[result - 1];
      els.diceCube.setAttribute("aria-label", `Resultado do dado: ${result}`);
      els.diceCube.dataset.result = diceBand(result);
      els.diceModalTitle.textContent = `Resultado ${result}`;
      els.diceResultText.textContent = displayMessage;
      if (effect) runSceneEffect(effect);
      playCue(cue);
      speakNarration(displayMessage);
    }
  }, 90);
}

function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function diceBand(result) {
  if (result <= 3) return "low";
  if (result === 4) return "middle";
  return "high";
}

function diceResultReaction(result) {
  const luckyWord = state.childGender === "boy" ? "sortudo" : "sortuda";
  const name = childCallName();
  const reactions = {
    1: "Ih... o dado caiu no cantinho do azar.",
    2: "Ah não... a sorte tropeçou um pouquinho.",
    3: "Quase deu certo. Faltou só um brilho.",
    4: "Ufa. Por pouco a cena não complicou tudo, mas a sorte sorriu para você.",
    5: `Muito bem, ${name}. Você foi ${luckyWord} agora.`,
    6: "Seis! Sorte máxima. O dado fez festa na mesa.",
  };
  return reactions[result] || "";
}

function defaultDiceNarration(result, band) {
  if (band === "low") return `Resultado ${result}: algo engraçado complica o caminho, mas a aventura continua.`;
  if (band === "middle") return `Resultado ${result}: você consegue, mas precisa cumprir um desafio curto.`;
  return `Resultado ${result}: sucesso brilhante!`;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function playCue(cue) {
  if (!cue || !state.soundEnabled) return;
  const audio = ensureAudioContext();
  if (audio) playSyntheticCue(audio, cue);
  console.info(`[RPG Kids cue] ${cue}`);
}

function speakNarration(text, options = {}) {
  const cleanText = genderedText(text).replace(/\s+/g, " ").trim();
  if (!cleanText) return;
  state.lastNarration = cleanText;
  if (!state.narrationEnabled || !("speechSynthesis" in window)) return;

  if (options.interrupt !== false) {
    window.speechSynthesis.cancel();
    state.narrationQueue = narrationChunks(cleanText);
  } else {
    state.narrationQueue.push(...narrationChunks(cleanText));
  }

  if (!window.speechSynthesis.speaking) {
    speakNextNarrationChunk();
  }
}

function narrationChunks(text) {
  return String(text)
    .split(/(?<=[.!?])\s+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .reduce((chunks, sentence) => {
      if (sentence.length <= 190) return [...chunks, sentence];
      const pieces = sentence.split(/,\s+/);
      return [...chunks, ...pieces.map((piece) => piece.trim()).filter(Boolean)];
    }, []);
}

function speakNextNarrationChunk() {
  if (!state.narrationQueue.length || !("speechSynthesis" in window)) return;
  const chunk = state.narrationQueue.shift();
  const style = narratorStyleProfile();
  const utterance = new SpeechSynthesisUtterance(chunk);
  utterance.lang = "pt-BR";
  utterance.rate = Math.min(1.12, Math.max(0.78, state.narrationRate + (style.voiceRateOffset || 0)));
  utterance.pitch = chunk.includes("Opção") ? Math.min(1.2, (style.voicePitch || 1.05) + 0.04) : style.voicePitch || 1.05;
  utterance.volume = 0.95;
  const voice = preferredNarrationVoice();
  if (voice) utterance.voice = voice;
  utterance.onend = () => {
    const pause = chunk.includes("Opção") ? 190 : 160;
    window.setTimeout(speakNextNarrationChunk, pause);
  };
  window.speechSynthesis.speak(utterance);
}

function preferredNarrationVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang === "pt-BR" && /google|microsoft|luciana|maria|francisca|brasil/i.test(voice.name)) ||
    voices.find((voice) => voice.lang === "pt-BR") ||
    voices.find((voice) => voice.lang?.startsWith("pt")) ||
    null
  );
}

function repeatLastNarration() {
  if (!state.lastNarration) {
    const scene = currentScene();
    if (scene) speakNarration(composeSceneNarration(scene));
    return;
  }
  speakNarration(state.lastNarration);
}

function stopNarration() {
  if ("speechSynthesis" in window) {
    state.narrationQueue = [];
    window.speechSynthesis.cancel();
  }
}

function ensureAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!state.audioContext) state.audioContext = new AudioContext();
  if (state.audioContext.state === "suspended") state.audioContext.resume();
  return state.audioContext;
}

function playSyntheticCue(audio, cue) {
  const pattern = cuePattern(cue);
  pattern.forEach((note, index) => {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const start = audio.currentTime + index * 0.08;
    osc.type = note.type;
    osc.frequency.value = note.frequency;
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(note.volume, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, start + note.duration);
    osc.connect(gain).connect(audio.destination);
    osc.start(start);
    osc.stop(start + note.duration + 0.02);
  });
}

function cuePattern(cue) {
  if (cue.includes("dice_tick")) {
    return [
      { frequency: 210, duration: 0.035, volume: 0.026, type: "triangle" },
      { frequency: 155, duration: 0.04, volume: 0.02, type: "triangle" },
    ];
  }
  if (cue.includes("dice")) {
    return [
      { frequency: 180, duration: 0.06, volume: 0.035, type: "triangle" },
      { frequency: 240, duration: 0.06, volume: 0.03, type: "triangle" },
      { frequency: 160, duration: 0.08, volume: 0.035, type: "triangle" },
    ];
  }
  if (cue.includes("plop") || cue.includes("low") || cue.includes("bump")) {
    return [{ frequency: 150, duration: 0.16, volume: 0.035, type: "sine" }];
  }
  if (cue.includes("reward") || cue.includes("high") || cue.includes("bright") || cue.includes("confetti")) {
    return [
      { frequency: 520, duration: 0.08, volume: 0.04, type: "sine" },
      { frequency: 780, duration: 0.1, volume: 0.04, type: "sine" },
      { frequency: 1040, duration: 0.14, volume: 0.035, type: "sine" },
    ];
  }
  if (cue.includes("clock") || cue.includes("book_close")) {
    return [
      { frequency: 320, duration: 0.12, volume: 0.025, type: "triangle" },
      { frequency: 220, duration: 0.16, volume: 0.025, type: "triangle" },
    ];
  }
  if (cue.includes("bell")) {
    return [
      { frequency: 660, duration: 0.12, volume: 0.028, type: "sine" },
      { frequency: 990, duration: 0.16, volume: 0.022, type: "sine" },
      { frequency: 1320, duration: 0.18, volume: 0.018, type: "sine" },
    ];
  }
  if (cue.includes("workshop") || cue.includes("hammer") || cue.includes("tap")) {
    return [
      { frequency: 310, duration: 0.05, volume: 0.028, type: "triangle" },
      { frequency: 410, duration: 0.05, volume: 0.024, type: "triangle" },
      { frequency: 520, duration: 0.07, volume: 0.022, type: "sine" },
    ];
  }
  if (cue.includes("bridge")) {
    return [
      { frequency: 360, duration: 0.08, volume: 0.022, type: "triangle" },
      { frequency: 300, duration: 0.08, volume: 0.02, type: "triangle" },
      { frequency: 420, duration: 0.1, volume: 0.022, type: "sine" },
    ];
  }
  if (cue.includes("wind_soft")) {
    return [
      { frequency: 260, duration: 0.18, volume: 0.018, type: "sine" },
      { frequency: 390, duration: 0.16, volume: 0.018, type: "triangle" },
      { frequency: 520, duration: 0.2, volume: 0.016, type: "sine" },
    ];
  }
  if (cue.includes("wave") || cue.includes("sea") || cue.includes("whale")) {
    return [
      { frequency: 260, duration: 0.18, volume: 0.026, type: "sine" },
      { frequency: 340, duration: 0.2, volume: 0.022, type: "sine" },
      { frequency: 300, duration: 0.22, volume: 0.02, type: "sine" },
    ];
  }
  if (cue.includes("storm") || cue.includes("wind")) {
    return [
      { frequency: 190, duration: 0.08, volume: 0.03, type: "sawtooth" },
      { frequency: 150, duration: 0.1, volume: 0.026, type: "triangle" },
      { frequency: 230, duration: 0.08, volume: 0.026, type: "sawtooth" },
    ];
  }
  if (cue.includes("garden") || cue.includes("leaf") || cue.includes("tick")) {
    return [
      { frequency: 420, duration: 0.06, volume: 0.024, type: "triangle" },
      { frequency: 560, duration: 0.06, volume: 0.024, type: "triangle" },
      { frequency: 420, duration: 0.08, volume: 0.022, type: "triangle" },
    ];
  }
  if (cue.includes("library") || cue.includes("dragon") || cue.includes("sneeze")) {
    return [
      { frequency: 250, duration: 0.12, volume: 0.024, type: "triangle" },
      { frequency: 500, duration: 0.08, volume: 0.02, type: "sine" },
      { frequency: 330, duration: 0.16, volume: 0.022, type: "triangle" },
    ];
  }
  return [{ frequency: 440, duration: 0.12, volume: 0.025, type: "sine" }];
}

function runSceneEffect(effect) {
  if (!effect || !els.sceneStage) return;
  clearTimeout(state.effectTimer);
  els.sceneStage.dataset.effect = effect;
  state.effectTimer = setTimeout(() => {
    delete els.sceneStage.dataset.effect;
  }, 900);
}

function goLibrary() {
  clearInterval(state.timer);
  stopNarration();
  renderLibrary();
  renderParentReview();
  showView(els.libraryView);
}

function updateChildProfile() {
  state.childGender = els.childGenderSelect.value;
  state.childName = els.childNameInput.value.trim();
  state.narratorStyle = els.narratorStyleSelect.value;
  state.avatarColor = els.avatarColorSelect.value;
  state.avatarCompanion = els.avatarCompanionSelect.value;
  state.voiceOnly = els.voiceOnlyToggle.checked;
  els.sessionView.classList.toggle("is-voice-only", state.voiceOnly);
  renderChildTerms();
  if (state.adventure) renderAvatar();
  updateCreditUI();
}

els.resumeButton.addEventListener("click", resumeAdventure);
els.backButton.addEventListener("click", goLibrary);
els.generateDraftButton.addEventListener("click", generateDraftAdventure);
els.timeLimitSelect.addEventListener("change", () => {
  renderParentReview();
  updateParentApproval();
});
els.childGenderSelect.addEventListener("change", () => {
  updateChildProfile();
});
els.childNameInput.addEventListener("input", updateChildProfile);
els.narratorStyleSelect.addEventListener("change", updateChildProfile);
els.avatarColorSelect.addEventListener("change", updateChildProfile);
els.avatarCompanionSelect.addEventListener("change", updateChildProfile);
els.voiceOnlyToggle.addEventListener("change", updateChildProfile);
els.soundToggle.addEventListener("change", renderParentReview);
els.narrationToggle.addEventListener("change", () => {
  state.narrationEnabled = els.narrationToggle.checked;
  if (!state.narrationEnabled) stopNarration();
  renderParentReview();
  updateCreditUI();
});
els.narrationRateSelect.addEventListener("change", () => {
  state.narrationRate = Number(els.narrationRateSelect.value);
  renderParentReview();
  updateCreditUI();
});
els.approveStoryCheckbox.addEventListener("change", updateParentApproval);
els.restrictedHumorCheckbox.addEventListener("change", updateParentApproval);
els.removeRestrictedHumorToggle.addEventListener("change", () => {
  renderParentReview();
  updateParentApproval();
});
els.startChildPanelButton.addEventListener("click", () => {
  const adventure = selectedAdventure();
  if (!adventure || els.startChildPanelButton.disabled) return;
  startAdventure(adventure.id);
});
els.readFullStoryButton.addEventListener("click", () => {
  const adventure = selectedAdventure();
  if (!adventure) return;
  renderFullStory(adventure);
});
els.buySummaryButton.addEventListener("click", buySummary);
els.repeatNarrationButton.addEventListener("click", repeatLastNarration);
els.stopNarrationButton.addEventListener("click", stopNarration);
els.sendFreeActionButton.addEventListener("click", () => {
  handlePlayerAction(els.freeActionInput.value, "text");
});
els.freeActionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handlePlayerAction(els.freeActionInput.value, "text");
  }
});
els.voiceActionButton.addEventListener("click", captureVoiceAction);
els.diceButton.addEventListener("click", rollDice);
els.luckButton.addEventListener("click", () => {
  if (state.luckPoints <= 0 || state.rolledScenes.has(currentScene().id)) return;
  state.useLuck = !state.useLuck;
  renderSceneControls();
  showFeedback(state.useLuck ? "Sorte preparada: role dois dados e fique com o melhor." : "Sorte guardada para depois.");
});
els.movementButton.addEventListener("click", completeMovement);
els.skipButton.addEventListener("click", skipChallenge);
els.nextButton.addEventListener("click", nextScene);
els.checkpointButton.addEventListener("click", () => {
  const scene = currentScene();
  const summary = `Aventura guardada em ${scene.title}. Luma espera você voltar.`;
  addNarratorEntry("checkpoint", summary);
  saveCheckpoint(summary);
  showFeedback(summary, "book_close_soft");
});
els.endingLibraryButton.addEventListener("click", goLibrary);
els.diceCloseButton.addEventListener("click", () => {
  els.diceModal.hidden = true;
});

if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.info("[RPG Kids PWA] service worker indisponível", error);
    });
  });
}

loadParentState();
renderLibrary();
renderParentReview();
updateCreditUI();
