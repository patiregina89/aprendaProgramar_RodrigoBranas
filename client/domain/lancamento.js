class Lancamento {
    constructor (categoria, tipo, valor) {
        if(tipo !== 'receita' && tipo !== 'despesa') {
            throw new Error('Lançamento inválido: O tipo deve ser receita ou despesa')
        } if(valor < 0) {
            throw new Error('Lançamento inválido: valor deve ser maior ou igual a zero')
        } if(categoria === '') {
            throw new Error('Lançamento inválido: a categoria é obrigatória')
        }
        this.categoria = categoria
        this.tipo = tipo
        this.valor = valor
    }

    getValorString () {
        return (this.tipo === 'despesa') ? this.valor * -1 : this.valor
    }
}