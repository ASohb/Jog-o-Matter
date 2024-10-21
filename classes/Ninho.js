// Classe Ninho
class Ninho{
    constructor(x, y, largura, altura) {
      this.corpo = Matter.Bodies.rectangle(x, y, largura, altura, { isStatic: true });
      this.largura = largura;
      this.altura = altura;
      this.imagem= loadImage('imagens/ninho.png')
      Matter.World.add(mundo, this.corpo);
    }
  
    mostrar() {
      const posicao = this.corpo.position;
      push(); // Salva o estado atual do desenho
      imageMode(CENTER); // Define o ponto central da imagem como referência
      image(this.imagem, posicao.x, posicao.y, this.largura, this.altura); // Desenha a imagem da plataforma
      pop(); // Restaura o estado anterior
    }
  }