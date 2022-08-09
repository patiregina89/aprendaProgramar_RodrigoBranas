class Tela {
    constructor () {
        this.init()
    }

    async init () {
        const response = await fetch('http://localhost:3000/api/lancamentos')
        const lancamentos = await response.json()
        console.log(lancamentos)
        const ano = new Ano()
        ano.adicionarMes(new Mes('janeiro'))
        ano.adicionarMes(new Mes('fevereiro'))
        ano.adicionarMes(new Mes('marco'))
        ano.adicionarMes(new Mes('abril'))
        for (const lancamento of lancamentos) {
            ano.adicionarLancamento(lancamento.mes, new Lancamento(lancamento.categoria, lancamento.tipo, lancamento.valor))
        }
        ano.calcularSaldo()
        this.ano = ano
        this.renderizar()
    }

    formatarDinheiro (valor) {
        return new Intl.NumberFormat("pt-br", { currency: "BRL", style: "currency"}).format(valor)
    }

    adicionarLancamento() {
        const mes = document.getElementById('mes')
        const categoria = document.getElementById('categoria')
        const tipo = document.getElementById('tipo')
        const valor = document.getElementById('valor')
        this.ano.adicionarLancamento(mes.value, new Lancamento(categoria.value, tipo.value, parseFloat(valor.value)))
        fetch('http://localhost:3000/api/lancamentos', { method: 'post', headers: { 'content-type': 'application/json'}, body:JSON.stringify({mes: mes.value, categoria: categoria.value, tipo: tipo.value, valor: parseFloat(valor.value)}) })
        this.ano.calcularSaldo()
        this.renderizar()
        mes.value = this.ano.meses[0].nome
        tipo.value = 'receita'
        categoria.value = ''
        valor.value = ''
    }

    renderizar() {
        //limpar a tela
        document.getElementById('app').remove()
        //recriar a tela
        const app = new Div('app')
        //criando nosso board do grafico
        const titulo = new h2('Finanças Pessoais')
        app.adicionarElementoFilho(titulo.element)
        //criando o formulario
        const form = new Div('form-lancamento')
        const mesSelect = new Select('mes')
        for (const mes of this.ano.meses) {
            mesSelect.addOption(mes.nome)
        }
        const tipoSelect = new Select('tipo')
        tipoSelect.addOption('receita')
        tipoSelect.addOption('despesa')
        const categoriaInputText = new Input('categoria', 'text', 'Categoria')
        const valorInputNumber = new Input('valor', 'number', 'Valor')
        const adicionarBotao = new Botao('botao', 'Adicionar')
        adicionarBotao.addListener(() => {
            this.adicionarLancamento()
        })
        form.adicionarElementoFilho(mesSelect.element)
        form.adicionarElementoFilho(tipoSelect.element)
        form.adicionarElementoFilho(categoriaInputText.element)
        form.adicionarElementoFilho(valorInputNumber.element)
        form.adicionarElementoFilho(adicionarBotao.element)
        app.adicionarElementoFilho(form.element)
        //criando o grafico 
        const grafico = new Grafico()
        for (const mes of this.ano.meses) {
            grafico.adiconarColunaGrafico(mes.totalizador.saldo, mes.nome)
        }
        app.adicionarElementoFilho(grafico.element)
        //criando as tabelas de gastos
        for (const mes of this.ano.meses) {
            const nomeDoMes = new h2(mes.nome)
            app.adicionarElementoFilho(nomeDoMes.element)
    
            const tabelaLancamentos = new Tabela('tabelaLancamentos')
            tabelaLancamentos.addRow('th', ['Categoria', 'Valor'])
            for (const lancamento of mes.lancamentos) {
                tabelaLancamentos.addRow('td', [lancamento.categoria, this.formatarDinheiro(lancamento.getValorString())])
            }
            tabelaLancamentos.addRow('th', ['Juros', this.formatarDinheiro(mes.totalizador.juros)])
            tabelaLancamentos.addRow('th', ['Rendimentos', this.formatarDinheiro(mes.totalizador.rendimentos)])
            tabelaLancamentos.addRow('th', ['Total', this.formatarDinheiro(mes.totalizador.saldo)]) 
            app.adicionarElementoFilho(tabelaLancamentos.element)
        }
        const [body] = document.getElementsByTagName('body')
        body.appendChild(app.element)
    }
}