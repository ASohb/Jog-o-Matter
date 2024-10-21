// Classe 
class Inimigo {
    constructor(x, y, largura, altura) {
      this.corpo = Matter.Bodies.rectangle(x, y, largura, altura);
      this.largura = largura;
      this.altura = altura;
      this.pulosDisponiveis=3;
      this.pulosDisponiveis = 3; // Limite de 3 pulos no ar
      Matter.World.add(mundo, this.corpo);
  
      // Carregar a animação
      this.animacao = loadAnimation(
        'imagens/Inimigo/ini.png',
        'imagens/Inimigo/ini2.png',
        'imagens/Inimigo/ini3.png',
        'imagens/Inimigo/ini4.png',
        'imagens/Inimigo/ini5.png',
       
      );
    }
      mostrar() {
        const posicao = this.corpo.position;
        
          // Reduzir a animação pela metade, com scale 0.5
      push(); // Salva a transformação de estilo atual
      translate(posicao.x, posicao.y); // Translada para a posição do Inimigo
      scale(0.3); // Redimensiona a animação para 50% do tamanho original
      animation(this.animacao, 0, 0); // Desenha a animação na nova escala
      pop(); // Restaura o estilo original
  
    
      }
    
     
    }
    
  
  
   