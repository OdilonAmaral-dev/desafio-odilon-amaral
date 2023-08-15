
import {getMetodoDePagamento as getMetodo} from './util/modulo_tabelas.js';
import {getItemCardapio as getFromCardapio} from './util/modulo_tabelas.js';

export function fechaContaCliente(metodoDePagamento, itens) {
    
    //Valida metodo de pagamento 
    var metodoPagamentoValido = getMetodo(metodoDePagamento.trim());
    if (!(metodoPagamentoValido)) {
        return "Forma de pagamento inválida!";
    }

    var itensValidados = new Array();

    //Valida se hpa itens 
    if (itens.length == 0) return "Não há itens no carrinho de compra!";

    for (let i = 0; i < itens.length; i++) { 

        var posV = itens[i].indexOf(",");
        var posF = itens[i].length;

        //Valida o codigo do produto no cardápio
        var itemCodigo = itens[i].substring(0,posV);        
        itemCodigo = itemCodigo.trim();

        var itemCardapioValido = (getFromCardapio(itemCodigo));

        if (!(itemCardapioValido)) {
            return 'Item inválido!';
        } 

        //Verifica a quantidade
        var itemQtd = itens[i].substring(posV+1,posF);  
        if (isNaN(itemQtd)) return 'Quantidade inválida!'
        else {
            if (itemQtd == 0) return "Quantidade inválida!";        
        }      

        var valueToPush = new Object();
        valueToPush["codigo"] = itemCodigo;
        valueToPush["quantidade"] = itemQtd;
        valueToPush["descricao"] = itemCardapioValido.descricao;
        valueToPush["preco"] = itemCardapioValido.preco;
        valueToPush["tipo"] = itemCardapioValido.tipo;
        valueToPush["grupo"] = itemCardapioValido.grupo;
        itensValidados.push(valueToPush);
    }

    //console.table(itensValidados);

    //Verifica itens extras x principal
    let achouPrincipal = true;
    for (var x=0; x < itensValidados.length; x++) {
        if (itensValidados[x].tipo == 'C') {            
            var grupoAux = itensValidados[x].grupo
            achouPrincipal = false;
            for (var y=0; y < itensValidados.length; y++) {
                if ((itensValidados[y].tipo == 'P') && 
                    (itensValidados[y].grupo == grupoAux)) {
                    achouPrincipal = true
                    break;
                } 
            } 
            if (!(achouPrincipal)) {
                return "Item extra não pode ser pedido sem o principal";
            }           
        }        
    }

    //Calcula total por item
    var cupomNaoFiscal = new Array();
    let valTotalAcum = 0.00;

    for (var x=0; x < itensValidados.length; x++) {
        var valueToPush = new Object();
        valueToPush["quantidade"] = itensValidados[x].quantidade;
        valueToPush["descricao"] = itensValidados[x].descricao;
        valueToPush["preco"] = itensValidados[x].preco;
        
        var precoUnitario = 0.00;
        precoUnitario = parseFloat(itensValidados[x].preco.replace(',', '.')); 

        var quantidade = 0;
        quantidade = parseInt(itensValidados[x].quantidade);

        var valTotal = 0.00;
        
        valTotal = quantidade * precoUnitario;
        valTotalAcum += valTotal;

        valTotal = valTotal.toFixed(2);
        var valTotalEdit = "";
        valTotalEdit = valTotal.toString();
        valTotalEdit = "R$ " + valTotalEdit.replace('.', ',');
        valueToPush["total"] = valTotalEdit;
        cupomNaoFiscal.push(valueToPush);
    }

    //console.table(cupomNaoFiscal);

    //Aplica Desconto ou Taxa acréscimo para (CC) no total da compra
    if (metodoPagamentoValido.tipoCalc == "D") {   
       
        var valDesconto = (valTotalAcum * (parseFloat(metodoPagamentoValido.percentual.replace(',', '.'))));
        //console.log("Valor Desconto " + valDesconto);
        valTotalAcum = valTotalAcum - valDesconto;
        //console.log("Valor Final " + valTotalAcum);
    }    
    else {
        var valAcrescimo = (valTotalAcum * (parseFloat(metodoPagamentoValido.percentual.replace(',', '.'))));
        valTotalAcum = valTotalAcum + valAcrescimo;
    }

    valTotalAcum = valTotalAcum.toFixed(2);
    var valTotalAcumEdit = "";
    valTotalAcumEdit = valTotalAcum.toString();
    valTotalAcumEdit = "R$ " + valTotalAcumEdit.replace('.', ',');
    
    //bye 
    return valTotalAcumEdit;
}

