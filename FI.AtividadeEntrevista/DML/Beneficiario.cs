using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.DML
{
    /// <summary>
    /// Classe de beneficiarop que representa o registo na tabela Beneficiarios do Banco de Dados
    /// </summary>
    public class Beneficiario
    {
        public int Id { get; set; }
        public string CPF { get; set; }
        public string Nome { get; set; }
        public int IdCliente { get; set; }

    }
}
