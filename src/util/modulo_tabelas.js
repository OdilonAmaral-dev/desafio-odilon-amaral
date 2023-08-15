let itemCardapio;
// ### DESCONTOS E TAXAS
// (tipo:)
// P - Item Principal
// C - Complemento Extra item principal
// D - Diversos (Sem regras especificadas)
// As letras (A/B/C/D/E) - Serão ulizadas para agrupamento de itens
let itensCardapio = [
    {codigo: 'cafe', descricao: 'Café', preco: '3,00', tipo: 'P', grupo: 'A'},
    {codigo: 'chantily', descricao: 'Chantily (extra do Café)', preco: '1,50', tipo: 'C', grupo: 'A'},
    {codigo: 'suco', descricao: 'Suco Natural', preco: '6,20', tipo: 'D', grupo: 'B'},
    {codigo: 'sanduiche', descricao: 'Sanduíche', preco: '6,50', tipo: 'P', grupo: 'C'},
    {codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', preco: '2,00', tipo: 'C', grupo: 'C'},
    {codigo: 'salgado', descricao: 'Salgado', preco: '7,25', tipo: 'D', grupo: 'D'},
    {codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', preco: '9,50', tipo: 'D', grupo: 'E'},
    {codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', preco: '7,50', tipo: 'D', grupo: 'E'}
];

export function getItemCardapio(codigo) {

    for(var i = 0; i < itensCardapio.length; i++) {
        if(itensCardapio[i].codigo === codigo) {
          itemCardapio = itensCardapio[i];
          return itemCardapio;
        }
    }    
    return false;
}

let metodoDePagamento;
// ### DESCONTOS E TAXAS
// (tipoCalc:)
// D - Pagamento em dinheiro tem 5% de desconto
// T - Pagamento a crédito tem acréscimo de 3% no valor total
let metodosDePagamento = [
    {metodo: 'dinheiro', tipoCalc: 'D', percentual: '0,05'},
    {metodo: 'debito', tipoCalc: 'D', percentual: '0,00'},
    {metodo: 'credito', tipoCalc: 'T', percentual: '0,03'}
];

export function getMetodoDePagamento(metodo) {

    for(var x = 0; x < metodosDePagamento.length; x++) {
        if(metodosDePagamento[x].metodo === metodo) {
          metodoDePagamento = metodosDePagamento[x];
          return metodoDePagamento;
        }
    }    
    return false;
}

    
