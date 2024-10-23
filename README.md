```markdown
# Plataforma Aventura - Jogo em Matter.js

Este é um jogo de plataforma desenvolvido com a biblioteca Matter.js e p5.js, no qual o jogador deve coletar ovos e levá-los de volta ao ninho enquanto evita inimigos. O jogo possui múltiplos níveis e mecânicas de física para a movimentação do jogador e das plataformas.

## 🚀 Funcionalidades
- **Movimentação do jogador:** O jogador pode andar para os lados e pular.
- **Colete ovos:** Pegue os ovos espalhados pelo cenário e leve-os até o ninho.
- **Evite inimigos:** Cuidado com os inimigos que aparecem em certos níveis.
- **Plataformas dinâmicas:** O jogador pode pular entre plataformas para alcançar o objetivo.
- **Níveis progressivos:** Conforme o jogador completa os objetivos, novos níveis são liberados.
- **Transições entre níveis:** Uma animação de transição ocorre entre os níveis.

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/ASohb/Jog-o-Matter.git
   ```
2. Certifique-se de que você tem um servidor local ou uma maneira de executar o jogo em um navegador (como o Live Server do VSCode).
3. Abra o arquivo `index.html` no navegador para iniciar o jogo.

## 🎮 Controles
- **Seta para direita**: mover para a direita.
- **Seta para esquerda**: mover para a esquerda.
- **Seta para cima**: pular.

## 🕹️ Como jogar
- O objetivo do jogo é coletar o ovo no cenário e levá-lo ao ninho.
- Cuidado com os inimigos! Se tocar em um inimigo ou cair de uma plataforma, o jogo termina.
- Ao coletar o ovo e colocá-lo no ninho, você passa para o próximo nível.

## 🛠️ Tecnologias Utilizadas
- **[p5.js](https://p5js.org/)**: Biblioteca JavaScript para facilitar o desenvolvimento visual e interativo.
- **[Matter.js](https://brm.io/matter-js/)**: Biblioteca JavaScript para simulação de física 2D.
- **HTML5**: Para a estrutura da página.
- **CSS3**: Para estilização (se aplicável).

## 📂 Estrutura do Projeto
```
/imagens             # Diretório com imagens do jogo (plataformas, fundo, etc.)
/js                  # Código JavaScript do jogo
  - jogador.js       # Classe do jogador
  - plataforma.js    # Classe das plataformas
  - inimigo.js       # Classe dos inimigos
  - ovo.js           # Classe para o objeto ovo
  - ninho.js         # Classe para o ninho
index.html           # Arquivo HTML principal
README.md            # Este arquivo
```

## 🧩 Desenvolvimento

### Módulos do Matter.js
O jogo utiliza os seguintes módulos do Matter.js:
- `Engine`: Para criar o motor de física do jogo.
- `World`: Para gerenciar o mundo do jogo.
- `Bodies`: Para criar os corpos físicos, como o jogador e plataformas.
- `SAT`: Para verificar colisões complexas.

### Principais variáveis
- `jogador`: Controla o personagem principal.
- `plataformas[]`: Array que armazena todas as plataformas em um nível.
- `inimigos[]`: Armazena os inimigos.
- `ovo`: Representa o ovo a ser coletado.
- `ninho`: Onde o jogador deve levar o ovo para completar o nível.

### Como os níveis funcionam
- A função `iniciarNivel(nivel)` configura cada nível, criando novas plataformas, ovos, ninhos e inimigos.
- O progresso do jogador é mostrado na tela com a quantidade de ovos coletados e o nível atual.


## 📝 Licença
Este projeto está sob a licença MIT 
```

