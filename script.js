/* ============================================================================
   BATALHA DIÁRIA DE VALHEIM — PLACAR OFICIAL
   ============================================================================
   Este arquivo controla TODOS os dados do placar. Você não precisa saber
   programar nem mexer em HTML ou CSS — só editar a lista de batalhas
   aqui embaixo, salvar o arquivo e subir para o GitHub.

   ÍNDICE DESTE ARQUIVO:
     1) NOME DOS JOGADORES
     2) PLACAR DE BATALHAS  ⭐ é aqui que você mexe todo dia
     3) A PARTIR DAQUI é lógica interna — não precisa editar
   ============================================================================ */


/* ============================================================================
   1) NOME DOS JOGADORES
   ----------------------------------------------------------------------------
   Se um dia trocar o nome de algum jogador, mude só aqui. O cabeçalho do
   site e os cards de jogador atualizam sozinhos.
   (Atenção: se você mudar um nome aqui, lembre de também atualizar o campo
   "vencedor" nas batalhas antigas lá embaixo, para continuar batendo certo.)
   ============================================================================ */
const PLAYER_1_NAME = "Eduardo";
const PLAYER_2_NAME = "Henrique";


/* ============================================================================
   2) PLACAR DE BATALHAS  ⭐⭐⭐ É AQUI QUE VOCÊ VAI MEXER TODO DIA ⭐⭐⭐
   ----------------------------------------------------------------------------
   Cada batalha é um bloco { ... } dentro da lista "battles" logo abaixo.
   Preencha os campos em português, exatamente como no exemplo.

   ────────────────────────────────────────────────────────────────────────
   MODELO — BATALHA JÁ JOGADA (copie, cole no final da lista e preencha):
   ────────────────────────────────────────────────────────────────────────

   {
     numero: 6,                    // número da batalha (sempre o próximo da lista)
     nome: "Batalha do Lobo",      // nome/apelido da batalha
     vitoriasJogador1: 2,          // quantas rodadas o Eduardo venceu no MD3
     vitoriasJogador2: 1,          // quantas rodadas o Henrique venceu no MD3
     vencedor: "Eduardo",          // escreva o NOME de quem venceu a batalha
     territorio: "Mina de Prata - Montanha Leste",   // Direito 1 (ou null)
     itens: ["10 Ferro", "5 Couro de Lobo", "3 Mel"], // Direito 2, até 3 itens (ou [])
     favor: "Ajudar a explorar a masmorra do pântano" // Direito 3 (ou null)
   },

   ────────────────────────────────────────────────────────────────────────
   MODELO — BATALHA QUE AINDA NÃO ACONTECEU ("aguardando"):
   ────────────────────────────────────────────────────────────────────────

   {
     numero: 7,
     nome: "Batalha #7",     // pode deixar um nome genérico até acontecer
     vitoriasJogador1: null,
     vitoriasJogador2: null,
     vencedor: null,          // null = ainda não jogada
     territorio: null,
     itens: [],
     favor: null,
   },

   ────────────────────────────────────────────────────────────────────────
   DICAS PARA NÃO ERRAR:
   ────────────────────────────────────────────────────────────────────────
   • O campo "vencedor" precisa ser escrito EXATAMENTE igual ao nome que
     está lá em cima (PLAYER_1_NAME / PLAYER_2_NAME), entre aspas.
     Ex: vencedor: "Eduardo"  (não escreva "eduardo" nem "Player1")
   • "itens" é sempre uma lista, mesmo com 1 item só: ["Machado"].
     Se ninguém ganhou item, deixe uma lista vazia: []
   • Se o Direito 1 (território) não foi usado naquela batalha, deixe
     territorio: null. O mesmo vale para favor: null.
   • Se o Direito 1 for usado para RECUPERAR um território que o jogador
     já tinha perdido antes, é só escrever o nome do território de novo —
     o site entende sozinho que a posse voltou para esse jogador.
   • Sempre adicione batalhas NOVAS no final da lista, sem pular números.
   • Depois de editar, salve o arquivo e recarregue a página no navegador
     para ver a mudança. Se algo não aparecer certo, veja se não faltou
     uma vírgula "," entre os blocos { } — é o erro mais comum!
   ============================================================================ */
const battles = [
  {
    numero: 1,
    nome: "Batalha do Javali",
    vitoriasJogador1: 2,
    vitoriasJogador2: 0,
    vencedor: "Eduardo",
    territorio: null,   // ainda não preenchido — edite quando definir o terreno
    itens: [],          // ainda não preenchido — edite com os itens escolhidos
    favor: null,         // ainda não preenchido — edite com o favor exigido
  },
  {
    numero: 2,
    nome: "Batalha da montanha",
    vitoriasJogador1: 2,
    vitoriasJogador2: 0,
    vencedor: "Eduardo",
    territorio: null,
    itens: [],
    favor: null,
  },
  /*{
    numero: 3,
    nome: "Batalha #3",
    vitoriasJogador1: null,
    vitoriasJogador2: null,
    vencedor: null,
    territorio: null,
    itens: [],
    favor: null,
  },
  {
    numero: 4,
    nome: "Batalha #4",
    vitoriasJogador1: null,
    vitoriasJogador2: null,
    vencedor: null,
    territorio: null,
    itens: [],
    favor: null,
  },
  {
    numero: 5,
    nome: "Batalha #5",
    vitoriasJogador1: null,
    vitoriasJogador2: null,
    vencedor: null,
    territorio: null,
    itens: [],
    favor: null,
  },*/
  // 👇 Adicione as próximas batalhas aqui embaixo, seguindo o modelo lá de cima.
];




/* ============================================================================
   A PARTIR DAQUI é lógica interna do site (cálculos e desenho na tela).
   Não é necessário editar nada abaixo desta linha para atualizar o placar.
   ============================================================================ */


/* ----------------------------------------------------------------------------
   3) VALIDAÇÃO DOS DADOS
   ----------------------------------------------------------------------------
   Confere se o que foi digitado na lista "battles" faz sentido, e mostra um
   aviso amigável na tela (em vez de simplesmente quebrar o site) caso algo
   esteja escrito errado — por exemplo, um nome de vencedor com erro de
   digitação.
-------------------------------------------------------------------------- */
function validateBattles(){
  const validNames = [PLAYER_1_NAME, PLAYER_2_NAME];
  const problems = [];

  battles.forEach(b => {
    if (b.vencedor !== null && !validNames.includes(b.vencedor)){
      problems.push(`Batalha #${b.numero}: o campo "vencedor" está escrito como "${b.vencedor}", mas os únicos nomes válidos são "${PLAYER_1_NAME}" ou "${PLAYER_2_NAME}".`);
    }
  });

  return problems;
}

function renderDataWarning(problems){
  const existing = document.getElementById("data-warning");
  if (existing) existing.remove();
  if (problems.length === 0) return;

  const banner = document.createElement("div");
  banner.id = "data-warning";
  banner.className = "data-warning";
  banner.innerHTML = `
    <strong>⚠️ Verifique o script.js:</strong>
    <ul>${problems.map(p => `<li>${p}</li>`).join("")}</ul>
  `;
  document.querySelector(".app").prepend(banner);
}


/* ----------------------------------------------------------------------------
   4) FUNÇÕES DE CÁLCULO
-------------------------------------------------------------------------- */

/** Uma batalha é considerada "jogada" quando tem um vencedor definido. */
function isPlayed(battle){
  return battle.vencedor !== null;
}

/** Lista apenas as batalhas que já foram disputadas. */
function getPlayedBattles(){
  return battles.filter(isPlayed);
}

/** Retorna o nome do adversário de um jogador (dado o nome de um dos dois). */
function opponentName(name){
  return name === PLAYER_1_NAME ? PLAYER_2_NAME : PLAYER_1_NAME;
}

/** Calcula o total de vitórias de cada jogador. */
function computeWins(){
  const wins = {};
  wins[PLAYER_1_NAME] = 0;
  wins[PLAYER_2_NAME] = 0;
  getPlayedBattles().forEach(b => { wins[b.vencedor] = (wins[b.vencedor] || 0) + 1; });
  return wins;
}

/**
 * Calcula quem é o dono ATUAL de cada território/local reivindicado.
 * Percorremos as batalhas em ordem: toda vez que um território aparece de
 * novo, o dono muda para o vencedor daquela batalha. Isso já implementa
 * sozinho a regra de "recuperação de território" do regulamento.
 */
function computeTerritories(){
  const territories = {}; // { "nome do território": { dono: "Eduardo", batalha: "Batalha #3" } }

  getPlayedBattles().forEach(b => {
    if (!b.territorio) return;
    territories[b.territorio] = { dono: b.vencedor, batalha: b.nome };
  });

  return territories;
}

/**
 * O Direito 3 (Favor) só vale "até o próximo dia de jogatina" — ou seja,
 * apenas o favor da batalha mais recente já jogada está ativo agora.
 */
function computeActiveFavor(){
  const played = getPlayedBattles();
  if (played.length === 0) return null;

  const last = played[played.length - 1];
  if (!last.favor) return null;

  return {
    favor: last.favor,
    vencedor: last.vencedor,
    perdedor: opponentName(last.vencedor),
    batalha: last.nome,
  };
}

/** Retorna a última batalha já disputada (ou null se nenhuma foi jogada). */
function getLastPlayedBattle(){
  const played = getPlayedBattles();
  return played.length > 0 ? played[played.length - 1] : null;
}


/* ----------------------------------------------------------------------------
   5) FUNÇÕES DE RENDERIZAÇÃO (desenham os dados na tela)
-------------------------------------------------------------------------- */

function initial(name){ return name.trim().charAt(0).toUpperCase(); }

/* ---- Cabeçalho ---- */
function renderHeaderStats(){
  const wins = computeWins();
  const played = getPlayedBattles();
  const last = getLastPlayedBattle();

  document.getElementById("stat-total-battles").textContent = played.length;
  document.getElementById("stat-score").textContent = `${wins[PLAYER_1_NAME]} x ${wins[PLAYER_2_NAME]}`;
  document.getElementById("stat-last-battle").textContent = last ? last.nome : "Nenhuma";
}

/* ---- Cards dos jogadores ---- */
function renderPlayerCards(){
  const wins = computeWins();
  const totalPlayed = getPlayedBattles().length;
  const activeFavor = computeActiveFavor();

  [PLAYER_1_NAME, PLAYER_2_NAME].forEach((name, idx) => {
    const winCount = wins[name];
    const winRate = totalPlayed > 0 ? Math.round((winCount / totalPlayed) * 100) : 0;
    const accentVar = idx === 0 ? "var(--player1-color)" : "var(--player2-color)";

    let tagHtml = "";
    if (activeFavor){
      if (activeFavor.vencedor === name){
        tagHtml = `<span class="player-tag">🎗️ Favor ativo: recebendo ajuda de ${activeFavor.perdedor}</span>`;
      } else if (activeFavor.perdedor === name){
        tagHtml = `<span class="player-tag debt">⛓️ Deve um favor a ${activeFavor.vencedor}</span>`;
      }
    }

    const card = document.getElementById(`player-card-${idx + 1}`);
    card.style.setProperty("--card-accent", accentVar);
    card.innerHTML = `
      <div class="player-card-top">
        <div class="player-avatar">${initial(name)}</div>
        <div>
          <div class="player-name">${name}</div>
          <div class="player-role">Jogador ${idx + 1}</div>
        </div>
      </div>
      <div class="player-stats-row">
        <div class="player-stat">
          <span class="player-stat-value">${winCount}</span>
          <span class="player-stat-label">Vitórias</span>
        </div>
        <div class="player-stat">
          <span class="player-stat-value">${winRate}%</span>
          <span class="player-stat-label">Aproveitamento</span>
        </div>
      </div>
      ${tagHtml}
    `;
  });
}

/* ---- Banner de favor ativo ---- */
function renderFavorBanner(){
  const banner = document.getElementById("favor-banner");
  const activeFavor = computeActiveFavor();

  if (!activeFavor){
    banner.innerHTML = `
      <span class="favor-icon">🎗️</span>
      <span class="favor-empty">Nenhum favor ativo no momento — o favor entra em jogo assim que a primeira batalha for registrada.</span>
    `;
    return;
  }

  banner.innerHTML = `
    <span class="favor-icon">🎗️</span>
    <span class="favor-text">
      <strong>${activeFavor.vencedor}</strong> tem direito a um favor de
      <strong>${activeFavor.perdedor}</strong> até a próxima batalha:
      "${activeFavor.favor}" <em>(vencido em ${activeFavor.batalha})</em>
    </span>
  `;
}

/* ---- Territórios reivindicados ---- */
function renderTerritories(){
  const list = document.getElementById("territory-list");
  const emptyState = document.getElementById("territory-empty");
  const territories = computeTerritories();
  const names = Object.keys(territories);

  if (names.length === 0){
    list.innerHTML = "";
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  list.innerHTML = names.map((name, i) => {
    const info = territories[name];
    const dotColor = info.dono === PLAYER_1_NAME ? "var(--player1-color)" : "var(--player2-color)";
    return `
      <div class="territory-row" style="animation-delay:${0.05 * i}s">
        <span class="territory-name">🏔️ ${name}</span>
        <span class="territory-owner" style="--dot-color:${dotColor}">
          <span class="owner-dot"></span> ${info.dono}
        </span>
      </div>
    `;
  }).join("");
}

/* ---- Tabela de batalhas ----
   Cada célula recebe um atributo data-label com o nome da coluna. Em telas
   de celular, o CSS usa esse atributo para transformar cada linha da
   tabela em um "cartão" empilhado, muito mais fácil de ler no smartphone
   do que rolar uma tabela larga para os lados. */
function renderBattlesTable(){
  const tbody = document.getElementById("battles-tbody");

  tbody.innerHTML = battles.map((b, i) => {
    const played = isPlayed(b);
    const rowClass = played ? "" : "pending";

    const resultText = played ? `${b.vitoriasJogador1} x ${b.vitoriasJogador2}` : "—";
    const loserName = played ? opponentName(b.vencedor) : null;

    const winnerColor = b.vencedor === PLAYER_1_NAME ? "var(--player1-color)" : "var(--player2-color)";
    const loserColor = loserName === PLAYER_1_NAME ? "var(--player1-color)" : "var(--player2-color)";

    const winnerHtml = played
      ? `<span class="winner-tag"><span class="player-dot" style="background:${winnerColor}"></span>${b.vencedor}</span>`
      : `<span class="pending-tag">Aguardando</span>`;
    const loserHtml = played
      ? `<span class="winner-tag"><span class="player-dot" style="background:${loserColor}"></span>${loserName}</span>`
      : `<span class="pending-tag">Aguardando</span>`;

    const territoryHtml = played
      ? (b.territorio || `<span class="not-claimed">O vencedor não reivindicou nenhum território.</span>`)
      : "";
    const favorHtml = played
      ? (b.favor || `<span class="not-claimed">O vencedor não reivindicou nenhum favor.</span>`)
      : "";
    const itemsHtml = played
      ? (b.itens && b.itens.length
          ? `<div class="items-list">${b.itens.map(it => `• ${it}`).join("<br>")}</div>`
          : `<span class="not-claimed">O vencedor não reivindicou nenhum item.</span>`)
      : "";

    return `
      <tr class="${rowClass}" style="animation-delay:${0.04 * i}s">
        <td class="td-id" data-label="Batalha #">#${b.numero}</td>
        <td class="td-name" data-label="Nome da Batalha">${b.nome}</td>
        <td data-label="Competidores">${PLAYER_1_NAME} × ${PLAYER_2_NAME}</td>
        <td class="td-result" data-label="Resultado">${resultText}</td>
        <td data-label="Vencedor">${winnerHtml}</td>
        <td data-label="Derrotado">${loserHtml}</td>
        <td data-label="Direito 1: Terreno">${territoryHtml}</td>
        <td data-label="Direito 2: Itens">${itemsHtml}</td>
        <td data-label="Direito 3: Favor">${favorHtml}</td>
      </tr>
    `;
  }).join("");
}

/* ---- Renderização geral ---- */
function renderAll(){
  const problems = validateBattles();
  renderDataWarning(problems);
  renderHeaderStats();
  renderPlayerCards();
  renderFavorBanner();
  renderTerritories();
  renderBattlesTable();
}

/* ---- Revelação suave ao rolar a página ---- */
function initScrollReveal(){
  const targets = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  targets.forEach(t => observer.observe(t));
}


/* ============================================================================
   6) INICIALIZAÇÃO
   ============================================================================ */
window.addEventListener("load", () => {
  renderAll();
  initScrollReveal();

  setTimeout(() => {
    document.getElementById("loading-screen").classList.add("hidden");
  }, 1000);
});
