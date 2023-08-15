import {fechaContaCliente as fechaConta} from './controlePDV.js';
class CaixaDaLanchonete {
  
  calcularValorDaCompra(metodoDePagamento, itens) {
      this.metodoDePagamento = metodoDePagamento;
      this.itens = itens; 
      return fechaConta(this.metodoDePagamento, this.itens);
  }
}
export { CaixaDaLanchonete };
