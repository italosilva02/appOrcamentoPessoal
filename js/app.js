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
        $('#registrarDespesa').modal('show')

       
    } else{
        //Dialogo de error
        document.getElementById('modal_titulo').innerHTML = 'Campo inválido'
        document.getElementById('texto_modal').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Todos os campos deve estar corretamente preenchidos!'
        $('#registrarDespesa').modal('show')
        
    }
}




   






    