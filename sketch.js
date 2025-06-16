// Módulos do Matter.js
const Motor = Matter.Engine,
      Mundo = Matter.World,
      Corpos = Matter.Bodies;
      SAT= Matter.SAT;

// Variáveis principais
var motor, mundo;
var jogador;
var plataformas = [];
var imagemFundo;
var nivelAtual = 1; 
var ovos = 0; 
var ovoColetado = false;
var ninhoEncontrado = false;
var ninho;
var ovo; // Declare a variável ovo aqui

var perdeu = false; // Variável para controlar o estado de derrota
var inimigos = []; // Array para armazenar os inimigos

// Para a transição de nível
var transicao = false; // Controle se a transição está ativa
var tempoTransicao = 0; // Temporizador para a transição
const DURACAO_TRANSICAO = 2000; // Duração da transição em milissegundos

function preload() {
  // Carregar a imagem de fundo
  imagemFundo = loadImage('imagens/background/ceuazul.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Cria o canvas em tela cheia

  // Criar o motor de física
  motor = Motor.create();
  mundo = motor.world;

  fundo = createSprite(windowWidth / 2, windowHeight / 2);
  fundo.scale = 4;
  fundo.addImage(imagemFundo);

  iniciarNivel(nivelAtual);
}

function draw() {
  if (perdeu) {
    background(0); // Cor de fundo para o fim de jogo
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Você perdeu! Tente novamente.", width / 2, height / 2);
    return; // Não continuar com o restante do jogo se perdeu for true
  }
  if (transicao) {
    // Fade-out
    fill(0, 150); // Cor preta com transparência
    rect(0, 0, width, height); // Desenhar retângulo cobrindo a tela

    if (millis() - tempoTransicao >= DURACAO_TRANSICAO) {
      // Reseta o tempo da transição e inicia o novo nível 
      transicao = false; 
      iniciarNivel(nivelAtual); // Chama a função para iniciar o próximo nível
    }
  } else {
    background(imagemFundo); // Cor do céu
    Motor.update(motor);
    push();

    translate(-jogador.corpo.position.x + width / 2, -jogador.corpo.position.y + height / 2);

    drawSprites();

    // Mostrar jogador e plataformas
    jogador.mostrar();
    ninho.mostrar();

    for (var inimigo of inimigos) {
      inimigo.mostrar();
      if (verificarColisaoComInimigo(jogador, inimigo)) {
        perdeu = true; // Define como perdeu se o jogador colidir com o inimigo
      }
    }

    if (jogador.caiu()) {
      perdeu = true; // Define como perdeu se o jogador cair
    }

    if (!ovoColetado) { // Só mostrar o ovo se ele não tiver sido coletado
      ovo.mostrar();
      verificarColisaoComOvo(jogador, ovo); // Verificar colisão com o ovo
    }
    if (ovoColetado) {
      verificarColisaoComNinho(jogador, ninho);
    }

    for (var plataforma of plataformas) {
      plataforma.mostrar();

      // Verificar se o jogador está tocando a plataforma
      if (jogadorTocandoPlataforma(jogador, plataforma)) {
        jogador.resetarPulos(); // Reseta os pulos quando o jogador toca uma plataforma
      }
    }
    pop();

    // Desenhar o texto após o pop() para garantir que ele não seja afetado pela translação
    fill("#0e1e75"); // Cor do texto
    textSize(32); // Tamanho do texto
    textAlign(LEFT, TOP); // Alinhar à esquerda e ao topo da tela
    text("Ovos: " + ovos, 50, 100); // Posição do texto fixo no canto superior esquerdo
    text("Nível: " + nivelAtual, 50, 50); // Posição do texto fixo no canto superior esquerdo
  }
}

function iniciarNivel(nivel) {
  if (nivel === 1) {
    nivel1();
  } else if (nivel === 2) {
    nivel2();
  }
}

function nivel1() {
  jogador = new Jogador(200, height - 200, 50, 50); // Iniciar próximo à parte inferior

  // Criar plataformas
  plataformas.push(new Plataforma(200, height - 150, 200, 20));
  plataformas.push(new Plataforma(400, height - 300, 200, 20));
  plataformas.push(new Plataforma(500, height - 450, 200, 20));
  plataformas.push(new Plataforma(900, height - 400, 200, 20));
  plataformas.push(new Plataforma(1080, height - 550, 200, 20));
  plataformas.push(new Plataforma(1080, height - 720, 200, 20));

  ovo = new Ovo(400, height - 350, 50, 50); // Posição e tamanho do ovo
  ninho = new Ninho(1080, height - 760, 100, 80);
}

function nivel2() {
  jogador = new Jogador(200, height - 200, 50, 50); // Iniciar no nível 2

  // Criar novas plataformas
  plataformas = []; // Limpar as plataformas do nível anterior
  plataformas.push(new Plataforma(300, height - 150, 200, 20));
  plataformas.push(new Plataforma(600, height - 300, 200, 20));
  plataformas.push(new Plataforma(900, height - 450, 200, 20));
  plataformas.push(new Plataforma(1100, height - 600, 200, 20));
  plataformas.push(new Plataforma(1400, height - 750, 200, 20));
  plataformas.push(new Plataforma(1600, height - 800, 200, 20));

  // Defina a posição do ninho e do ovo conforme necessário
  ninho = new Ninho(1600, height - 840, 100, 80);
  ovo = new Ovo(1100, height - 650, 50, 50); // Posição do ovo no nível 2
  inimigos.push(new Inimigo(650, height - 320, 50, 50));


  ovoColetado = false;
  ninhoEncontrado = false;
}

function verificarColisaoComOvo(jogador, ovo) {
  // Usando SAT do Matter.js para verificar a colisão
  var colisao = SAT.collides(jogador.corpo, ovo.corpo);

  if (colisao.collided) {
    ovoColetado = true; // Marcar o ovo como coletado
    ovos++; // Incrementar a contagem de ovos
  }
}

// Função de colisão com ninho usando SAT
function verificarColisaoComNinho(jogador, ninho) {
  // Usando SAT do Matter.js para verificar a colisão
  var colisao = SAT.collides(jogador.corpo, ninho.corpo);

  if (colisao.collided) { // Verificar se houve colisão
    removerTudo(); // Função para remover elementos do jogo
    ninhoEncontrado = true; 
    transicao = true; // Iniciar transição para o próximo nível
    nivelAtual++; // Incrementar o nível
    tempoTransicao = millis(); // Começa o temporizador da transição
  }
}

function verificarColisaoComInimigo(jogador, inimigo) {
  var colisao = SAT.collides(jogador.corpo, inimigo.corpo);
  return colisao.collided;
}


function jogadorTocandoPlataforma(jogador, plataforma) {
  const posicaoJogador = jogador.corpo.position;
  const posicaoPlataforma = plataforma.corpo.position;

  const margem = 5; 

  const tocando = 

    posicaoJogador.y + jogador.altura / 2 >= posicaoPlataforma.y - plataforma.altura / 2 - margem && // jogador está em cima
    posicaoJogador.y + jogador.altura / 2 <= posicaoPlataforma.y - plataforma.altura / 2 + margem && // dentro da margem
    posicaoJogador.x + jogador.largura / 2 >= posicaoPlataforma.x - plataforma.largura / 2 && // largura esquerda
    posicaoJogador.x - jogador.largura / 2 <= posicaoPlataforma.x + plataforma.largura / 2;   // largura direita

  return tocando; 
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    jogador.mover(0.05); // Move para a direita
  } else if (keyCode === LEFT_ARROW) {
    jogador.mover(-0.05); // Move para a esquerda
  } else if (keyCode === UP_ARROW) {
    jogador.pular(); // Pula
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Redimensiona o canvas
}

// Função para remover todos os elementos do nível atual
function removerTudo() {
  // Remover todos os objetos do nível anterior
  for (let plataforma of plataformas) {
    if (plataforma.corpo) { // Verifique se a plataforma tem um corpo
      Mundo.remove(mundo, plataforma.corpo); // Remover cada plataforma do mundo
    }
  }
  plataformas = []; // Limpar as plataformas do nível anterior
  inimigos = [];
  // Remover o ovo e o ninho, se existirem
  if (ovo && ovo.corpo) {
    Mundo.remove(mundo, ovo.corpo);
  }
  
  if (ninho && ninho.corpo) {
    Mundo.remove(mundo, ninho.corpo);
  }
}
