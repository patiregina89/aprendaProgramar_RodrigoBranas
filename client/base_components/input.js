class Input {
    constructor (id, type, placeholder) {
        this.element = document.createElement('input')
        this.element.id = id
        this.element.tupe = type
        this.element.placeholder = placeholder
    }
}