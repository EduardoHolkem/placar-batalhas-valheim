# ⚔️ Batalha Diária de Valheim — Placar Oficial

Site estático (HTML, CSS e JavaScript puro — sem frameworks), leve e responsivo,
que exibe o placar oficial da gincana **Batalha Diária de Valheim**, conforme o
Regulamento Oficial. Funciona perfeitamente em computador, tablet e celular.

## 📁 Arquivos

| Arquivo      | O que é |
|--------------|---------|
| `index.html` | Estrutura da página. Normalmente você **não precisa editar este arquivo**. |
| `style.css`  | Visual do site (cores, fontes, layout). Só edite se quiser mudar o design. |
| `script.js`  | **Onde ficam os dados do placar.** É o único arquivo que você vai editar no dia a dia. |

## ✏️ Como atualizar o placar (sem saber programar)

Todo o placar é controlado pela lista `battles`, no arquivo `script.js`.
Os campos estão todos em português, sem abreviações estranhas — é só seguir
o modelo que já vem comentado dentro do próprio arquivo.

### 1. Registrar uma batalha já jogada

Copie este modelo, cole no final da lista `battles` (antes do `];`) e preencha:

```js
{
  numero: 6,                    // número da batalha (sempre o próximo da lista)
  nome: "Batalha do Lobo",      // nome/apelido da batalha
  vitoriasJogador1: 2,          // quantas rodadas o Eduardo venceu no MD3
  vitoriasJogador2: 1,          // quantas rodadas o Henrique venceu no MD3
  vencedor: "Eduardo",          // escreva o NOME de quem venceu
  territorio: "Mina de Prata - Montanha Leste",   // Direito 1 (ou null)
  itens: ["10 Ferro", "5 Couro de Lobo", "3 Mel"], // Direito 2, até 3 itens (ou [])
  favor: "Ajudar a explorar a masmorra do pântano" // Direito 3 (ou null)
},
```

### 2. Deixar uma batalha "aguardando" (ainda não jogada)

```js
{
  numero: 7,
  nome: "Batalha #7",
  vitoriasJogador1: null,
  vitoriasJogador2: null,
  vencedor: null,
  territorio: null,
  itens: [],
  favor: null,
},
```

### 3. Trocar o nome dos jogadores

No topo do `script.js`, altere apenas estas duas linhas:

```js
const PLAYER_1_NAME = "Eduardo";
const PLAYER_2_NAME = "Henrique";
```

> ⚠️ Se você renomear um jogador, lembre de atualizar também o campo
> `vencedor` nas batalhas antigas para o novo nome — o site avisa na tela
> se encontrar um nome que não bate com nenhum dos dois jogadores.

### Dicas para não errar

- O campo `vencedor` precisa ser escrito **exatamente igual** ao nome
  configurado no topo do arquivo, entre aspas. Ex: `vencedor: "Eduardo"`
  (não `"eduardo"` nem `"Player1"`).
- `itens` é sempre uma lista, mesmo com 1 item só: `["Machado"]`. Se
  ninguém ganhou item naquela batalha, deixe uma lista vazia: `[]`.
- Se o Direito 1 (território) ou o Direito 3 (favor) não foram usados,
  deixe como `null`.
- Sempre adicione batalhas novas **no final** da lista, sem pular números.
- Depois de editar, salve o arquivo e recarregue a página. Se algo não
  aparecer certo, confira se não faltou uma vírgula `,` entre os blocos
  `{ }` — é o erro mais comum ao editar esse tipo de arquivo.
- Se você digitar um nome de vencedor errado, o site mostra um **aviso em
  destaque no topo da página** dizendo exatamente qual batalha está com
  problema, em vez de simplesmente quebrar.

## 🤖 O que o site calcula sozinho

Você não precisa calcular nada manualmente — o site lê a lista `battles`
e monta automaticamente:

- **Placar geral** (quantas vitórias cada jogador tem)
- **Aproveitamento** (% de vitórias)
- **Território reivindicado atualmente** de cada local — se um território
  mudar de dono numa batalha futura (recuperação), o site atualiza sozinho
  usando a batalha mais recente que citou aquele território.
- **Favor ativo no momento** — sempre o favor da batalha mais recente já
  registrada, exibido em destaque no topo da página.
- Linhas **"Aguardando"** nas batalhas que ainda não têm resultado.

## 📱 Otimizado para celular

- A tabela de batalhas vira uma lista de **cartões empilhados** em telas
  pequenas, em vez de uma tabela larga difícil de ler no celular.
- Em telas de celular, os efeitos visuais mais pesados (desfoque tipo
  vidro) são desligados automaticamente para a página carregar e rolar
  com mais fluidez em aparelhos mais simples.
- As fontes carregadas do Google Fonts foram reduzidas ao mínimo
  necessário para deixar o carregamento mais rápido.

## 🚀 Publicando no GitHub Pages

1. Crie um repositório no GitHub e envie estes quatro arquivos
   (`index.html`, `style.css`, `script.js`, `README.md`).
2. No repositório, vá em **Settings → Pages**.
3. Em **Branch**, selecione `main` (ou `master`) e a pasta `/ (root)`, depois
   clique em **Save**.
4. Em alguns minutos o site estará disponível em:
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`

Depois disso, toda vez que você editar o `script.js` e enviar (`git push`)
a mudança para o GitHub, o site publicado atualiza automaticamente.

## 🎨 Personalização visual (opcional)

As cores principais ficam no topo do `style.css`, dentro de `:root { ... }`:

```css
--gold:  #D4AF37;   /* dourado principal */
--moss:  #4C7A54;   /* verde musgo */
--crimson: #A23B3B; /* vermelho */
```

As cores associadas a cada jogador (usadas em pontos coloridos e bordas dos
cards) também podem ser trocadas ali:

```css
--player1-color: var(--moss-light);
--player2-color: var(--crimson-light);
```

## 📜 Sobre o regulamento

Este placar segue o **Regulamento Oficial da Batalha Diária de Valheim**:
batalhas em formato Melhor de 3 (MD3), com o vencedor tendo direito a três
benefícios sobre o derrotado — Território/Local, Itens (até 3) e Favor.
Consulte o PDF do regulamento para os detalhes completos das regras.
