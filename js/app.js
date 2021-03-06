class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }

        return true
    }
}

class Bd {
    constructor(){
        let id = localStorage.getItem('id')
        if (id == null){
            localStorage.setItem('id', 0) 
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id') // null
        return parseInt(proximoId) + 1
    }


    gravar(d){
        
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperarTodosOsRegistros(){
        let despesas = Array()

         let id = localStorage.getItem('id')
        //Recuperar todas as despesas cadastrada
         for(let i=1; i <= id; i++) {
            //Recuperar a despesa

            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa == null){
                continue
            } else {
               despesas.push(despesa)
            }

         }

        return despesas
    }

    pesquisar(despesa){
       let despesasFiltradas = Array() 
       despesasFiltradas = this.recuperarTodosOsRegistros()
       console.log(despesa)
        console.log(despesasFiltradas)
        

        if (despesa.ano != ''){
            console.log('Filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if (despesa.mes != ''){
            console.log('Filtro de mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        if (despesa.dia != ''){
            console.log('Filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        if (despesa.tipo != ''){
            console.log('Filtro de detipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        if (despesa.descricao != ''){
            console.log('Filtro de descri????o')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        if (despesa.valor != ''){
            console.log('Filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
        
        
    }
}


let db = new Bd()


function cadastrarDespesas(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa (
        ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value
    )


    

     if (despesa.validarDados()){
        db.gravar(despesa)
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido'
        document.getElementById('texto_modal').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Depesa foi cadastrada com sucesso!'
        document.getElementById('campo_btn_validacao').innerHTML = 'Fechar'
        document.getElementById('campo_btn_validacao').className = 'btn btn-success'
        $('#registrarDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

       
    }
    else{
        //Dialogo de error
        document.getElementById('modal_titulo').innerHTML = 'Campo inv??lido'
        document.getElementById('texto_modal').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Todos os campos deve estar corretamente preenchidos!'
        document.getElementById('campo_btn_validacao').innerHTML = 'Voltar e preencher'
        document.getElementById('campo_btn_validacao').className = 'btn btn-danger'
        $('#registrarDespesa').modal('show')
        
    }
}

function carregaListaDespesa(){
    let despesas = Array()
    despesas = db.recuperarTodosOsRegistros()

    //Selecionando o elemento Tbody
    let listaDespesas = document.getElementById('listaDespesas')

   /* <tr>
                <td>15/03/2018</td>
                <td>Alimenta????o</td>
                <td>Compras do m??s</td>
                <td>444.9</td>
              </tr>
*/

    //Percorrer o Array despesa, listando cada despesa de forma din??mica

    despesas.forEach(function(d) {
        //Criando lista



        let linha = listaDespesas.insertRow()

        //Inserindo os valores (td)

        linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`
        

        switch(parseInt(d.tipo)){
            case 1: d.tipo = 'Alimenta????o'
                break
            case 2: d.tipo = 'Educa????o'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Sa??de'
                break
            case 5: d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = `${d.tipo}`
        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(3).innerHTML = `${d.valor}`
    })
}

function pesquisarValor(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, descricao, valor)
    let despesas =  db.pesquisar(despesa)
   


    //Selecionando o elemento Tbody
    let listaDespesas = document.getElementById('listaDespesas')

    listaDespesas.innerHTML = ''

   /* <tr>
                <td>15/03/2018</td>
                <td>Alimenta????o</td>
                <td>Compras do m??s</td>
                <td>444.9</td>
              </tr>
*/

    //Percorrer o Array despesa, listando cada despesa de forma din??mica

    despesas.forEach(function(d) {
        //Criando lista



        let linha = listaDespesas.insertRow()

        //Inserindo os valores (td)

        linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`
        

        switch(parseInt(d.tipo)){
            case 1: d.tipo = 'Alimenta????o'
                break
            case 2: d.tipo = 'Educa????o'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Sa??de'
                break
            case 5: d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = `${d.tipo}`
        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(3).innerHTML = `${d.valor}`
    })

}








   






    