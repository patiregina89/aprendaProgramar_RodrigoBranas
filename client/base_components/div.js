class Div {
    constructor (id, className) {
        this.element = document.createElement('div')
        this.element.id = id
        this.element.className = className
    }
    //criando elementos/tags HTML
    adicionarElementoFilho (child) {
        this.element.appendChild(child)
    }
}
