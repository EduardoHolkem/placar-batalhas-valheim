# Batalha Diária de Valheim, Placar Oficial

Site estático feito com HTML, CSS e JavaScript puro, sem frameworks, leve e responsivo. Ele exibe o placar oficial da gincana Batalha Diária de Valheim, conforme o Regulamento Oficial, e funciona em computador, tablet e celular.

Site publicado em https://eduardoholkem.github.io/placar-batalhas-valheim/

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura da página. Normalmente não precisa ser editado. |
| `style.css` | Visual do site, com cores, fontes e layout. Só edite para mudar o design. |
| `script.js` | Dados do placar. É o único arquivo editado no dia a dia. |

## Como atualizar o placar

Todo o placar é controlado pela lista `battles`, no `script.js`. Os campos são todos em português e há um modelo comentado dentro do próprio arquivo.

### Registrar uma batalha já jogada

Copie o modelo abaixo, cole no final da lista `battles` (antes do `];`) e preencha os campos.

```js
{
  numero: 6,                    // número da batalha, sempre o próximo da lista
  nome: "Batalha do Lobo",      // nome ou apelido da batalha
  vitoriasJogador1: 2,          // rodadas vencidas pelo jogador 1 no MD3
  vitoriasJogador2: 1,          // rodadas vencidas pelo jogador 2 no MD3
  vencedor: "Eduardo",          // nome de quem venceu
  territorio: "Mina de Prata - Montanha Leste",    // Direito 1, ou null
  itens: ["10 Ferro", "5 Couro de Lobo", "3 Mel"], // Direito 2, até 3 itens, ou []
  favor: "Ajudar a explorar a masmorra do pântano" // Direito 3, ou null
},
```

### Deixar uma batalha aguardando

Use este modelo para uma batalha que ainda não foi jogada.

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

### Trocar o nome dos jogadores

No topo do `script.js`, altere apenas estas duas linhas.

```js
const PLAYER_1_NAME = "Eduardo";
const PLAYER_2_NAME = "Henrique";
```

Se um jogador for renomeado, atualize também o campo `vencedor` nas batalhas antigas. O site avisa na tela quando encontra um nome que não bate com nenhum dos dois jogadores.

### Dicas para não errar

- O campo `vencedor` precisa ser escrito exatamente igual ao nome configurado no topo do arquivo, entre aspas. Por exemplo `"Eduardo"`, e não `"eduardo"` nem `"Player1"`.
- O campo `itens` é sempre uma lista, mesmo com um item só, como em `["Machado"]`. Se ninguém ganhou item, deixe uma lista vazia, `[]`.
- Se o Direito 1 (território) ou o Direito 3 (favor) não foram usados, deixe como `null`.
- Adicione batalhas novas sempre no final da lista, sem pular números.
- Depois de editar, salve o arquivo e recarregue a página. Se algo não aparecer certo, confira se não faltou uma vírgula entre os blocos `{ }`, que é o erro mais comum.
- Um nome de vencedor errado gera um aviso em destaque no topo da página, dizendo qual batalha tem problema, em vez de quebrar o site.

## O que o site calcula sozinho

O site lê a lista `battles` e monta automaticamente o placar geral, com as vitórias de cada jogador, e o aproveitamento em porcentagem.

Ele também mostra o dono atual de cada território. Se um território mudar de dono em uma batalha futura, o site atualiza usando a batalha mais recente que citou aquele território.

O favor ativo no momento é sempre o da batalha mais recente já registrada, exibido em destaque no topo da página. As batalhas sem resultado aparecem como "Aguardando".

Se as batalhas já registradas não tiverem favor preenchido, o banner de favor informa que não há favor ativo.

## Uso no celular

Em telas pequenas, a tabela de batalhas vira uma lista de cartões empilhados, que é mais fácil de ler do que uma tabela larga. Nessas telas, os efeitos visuais mais pesados, como o desfoque tipo vidro, são desligados para a página carregar e rolar com fluidez em aparelhos mais simples. As fontes do Google Fonts foram reduzidas ao mínimo necessário.

## Publicar no GitHub Pages

1. No repositório, abra Settings e depois Pages.
2. Em "Build and deployment", deixe a opção Source como "Deploy from a branch".
3. Escolha a branch `main` e a pasta `/ (root)`, e salve.
4. Aguarde alguns minutos até o site aparecer em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Depois disso, cada alteração enviada para a branch `main` atualiza o site publicado. Em repositório privado, o GitHub Pages só funciona em planos pagos.

## Personalização visual

As cores principais ficam no topo do `style.css`, dentro de `:root { ... }`.

```css
--gold:  #D4AF37;   /* dourado principal */
--moss:  #4C7A54;   /* verde musgo */
--crimson: #A23B3B; /* vermelho */
```

As cores de cada jogador, usadas em pontos coloridos e bordas dos cards, também podem ser trocadas ali.

```css
--player1-color: var(--moss-light);
--player2-color: var(--crimson-light);
```

## Sobre o regulamento

Este placar segue o Regulamento Oficial da Batalha Diária de Valheim. As batalhas são em formato Melhor de 3 (MD3), e o vencedor tem direito a três benefícios sobre o derrotado, que são Território ou Local, Itens (até 3) e Favor. Consulte o PDF do regulamento para os detalhes completos das regras.
