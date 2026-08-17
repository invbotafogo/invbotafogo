import { PIX } from '../../lib/constants';

export function BankDetails() {
  return (
    <div className="dados-bancarios">
      <h3>Dados para Depósito:</h3>
      <p><strong>Instituição:</strong> {PIX.instituicao}</p>
      <p><strong>Agência:</strong> {PIX.agencia}</p>
      <p><strong>Conta:</strong> {PIX.conta}</p>
      <p><strong>Tipo:</strong> {PIX.tipo}</p>
      <p><strong>Favorecido:</strong> {PIX.favorecido}</p>
      <p><strong>CNPJ:</strong> {PIX.cnpj}</p>
    </div>
  );
}
