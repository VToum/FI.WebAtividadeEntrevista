using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.DAL
{
    internal class DaoBeneficiario : AcessoDados
    {

        /// <summary>
        /// Inclui um beneficiário
        /// </summary>
        /// <param name="id">Id do beneficiário</param>
        /// <param name="idCliente">Id do cliente</param>
        /// <param name="nome">Nome do beneficiário</param>
        /// <param name="cpf">CPF do beneficiário</param>
        internal void IncluirBeneficiarios(long IdCliente, string cpf, string nome, long id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>
            {
                new System.Data.SqlClient.SqlParameter("@ID", id),
                new System.Data.SqlClient.SqlParameter("@ID_CLIENTE", IdCliente),
                new System.Data.SqlClient.SqlParameter("@CPF", cpf),
                new System.Data.SqlClient.SqlParameter("@Nome", nome)
            };

            DataSet ds = base.Consultar("FI_SP_IncBeneficiarioV2", parametros);
        }

        /// <summary>
        /// Inclui um novo beneficiário
        /// </summary>
        /// <param name="beneficiário">Objeto de beneficiário</param>
        internal DML.Beneficiario Consultar(long Id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Id", Id));

            DataSet ds = base.Consultar("FI_SP_ConsBeneficiario", parametros);
            List<DML.Beneficiario> cli = Converter(ds);

            return cli.FirstOrDefault();
        }

        private List<DML.Beneficiario> Converter(DataSet ds)
        {
            List<DML.Beneficiario> lista = new List<DML.Beneficiario>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    DML.Beneficiario cli = new DML.Beneficiario();
                    cli.Id = row.Field<int>("Id");
                    cli.Nome = row.Field<string>("Nome");
                    cli.CPF = row.Field<string>("Cpf");
                    cli.IdCliente = row.Field<int>("IDCLIENTE");

                    lista.Add(cli);
                }
            }

            return lista;
        }
    }
}
