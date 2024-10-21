// Classe Jogador
class Jogador {
  constructor(x, y, largura, altura) {
    this.corpo = Matter.Bodies.rectangle(x, y, largura, altura);
    this.largura = largura;
    this.altura = altura;
    this.pulosDisponiveis=3;
    this.pulosDisponiveis = 3; // Limite de 3 pulos no ar
    Matter.World.add(mundo, this.corpo);

    // Carregar a animação
    this.animacao = loadAnimation(
      'imagens/jogador/j1.png',
      'imagens/jogador/j2.png',
      'imagens/jogador/j4.png',
      'imagens/jogador/j5.png',
      'imagens/jogador/j6.png'
    );
  }
    mostrar() {
      const posicao = this.corpo.position;
      
        // Reduzir a animação pela metade, com scale 0.5
    push(); // Salva a transformação de estilo atual
    translate(posicao.x, posicao.y); // Translada para a posição do jogador
    scale(0.5); // Redimensiona a animação para 50% do tamanho original
    animation(this.animacao, 0, 0); // Desenha a animação na nova escala
    pop(); // Restaura o estilo original

    //APenas para o quadrado
     // fill(255, 0, 0);
      //rectMode(CENTER);
      //rect(posicao.x, posicao.y, this.largura, this.altura);
    }
  
    mover(direcao) {
      Matter.Body.applyForce(this.corpo, this.corpo.position, { x: direcao, y: 0 });
    }
  
    pular() {
      if (this.pulosDisponiveis > 0) {
        Matter.Body.applyForce(this.corpo, this.corpo.position, { x: 0, y: -0.05 });
        this.pulosDisponiveis--; // Reduz o número de pulos disponíveis
      }
    }
  
    // Método para resetar o número de pulos quando o jogador tocar uma plataforma
    resetarPulos() {
      this.pulosDisponiveis = 3;
    }
  }
  


  //Animação do jogador: https://kenney.nl/assets/jumper-pack