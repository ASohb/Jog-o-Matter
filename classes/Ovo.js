class Ovo {
    constructor(x, y, largura, altura) {
      // Criar o corpo do ovo usando Matter.js
      this.corpo = Matter.Bodies.circle(x, y, largura / 2, {
        restitution: 0.8,  // Faz o ovo quicar um pouco
        friction: 0.5,     // Fricção ao tocar em superfícies
            // Deixa o ovo estático até ser coletado
      });
  
      this.largura = largura;
      this.altura = altura;
      
      // Carregar a imagem diretamente na classe
      this.imagemOvo = loadImage('imagens/egg.png'); // Carrega a imagem do ovo
  
      // Adicionar o corpo ao mundo
      Matter.World.add(mundo, this.corpo);
    }
  
    // Mostrar o ovo na tela
    mostrar() {
      const posicao = this.corpo.position;
  
      push(); // Salva o estilo atual de transformação
      translate(posicao.x, posicao.y); // Mover para a posição do ovo
      imageMode(CENTER); // Definir o ponto de referência da imagem no centro
      image(this.imagemOvo, 0, 0, this.largura, this.altura); // Desenha a imagem do ovo
      pop(); // Restaura o estilo original
    }
  }
  
  