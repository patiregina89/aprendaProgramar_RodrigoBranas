class Grafico{
    constructor () {
        this.element = document.createElement('div')
        this.element.className = 'grafico'
        this.cores = ['red', 'yellow', 'green', 'blue'] //criando array de cores para barras grafico
    }
    adiconarColunaGrafico (valor, descricao) {
        const coluna = document.createElement('div')
        coluna.className = 'grafico__coluna'
        const cor = document.createElement('div')
        cor.style.height = `${(valor*100)/10000}px`
		cor.style.background = this.cores.pop()
        coluna.appendChild(cor)
        const nomeMes = document.createElement('div')
        nomeMes.className = 'grafico__texto'
        nomeMes.innerText = descricao
        coluna.appendChild(nomeMes)
        this.element.appendChild(coluna)
    }
}