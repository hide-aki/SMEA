import { Component } from "react";
import React from "react";
import { withSnackbar } from "notistack";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { Redirect } from "react-router-dom";
import api from "../../services/api";

//props da tabela do material table
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class Pacientes extends Component {
  constructor() {
    super();
    this.state = {
      pacientes: [], //State list com todos os pacientes
      link: "",
      redirect: false
    };
  }

  //função de redirecionamento da página
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.link} />;
    }
  };
  //did mount que preenche a tabela com os dados do banco assim que a página carrega
  componentDidMount() {
    api
      .getPacientes()
      .then(result => {
        this.setState({ pacientes: result.data });
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <MaterialTable
          title="Lista de Pacientes"
          data={this.state.pacientes}
          icons={tableIcons}
          columns={[
            { title: "Nome do Paciente", field: "nome" },
            { title: "CPF", field: "cpf", type: "numeric" },
            { title: "Sexo", field: "sexo" },
            {
              title: "Data de Nascimento",
              field: "dataNascimento",
              type: "date"
            },
            { title: "Telefone", field: "telefone", type: "numeric" }
          ]}
          actions={[
            {
              icon: () => <LocalHospitalIcon color="inherit" />,
              tooltip: "Cirurgias",
              onClick: (event, rowData) => {
                this.setState({
                  link: `/pacientes/${rowData.id}/cirurgias`,
                  redirect: true
                });
              }
            }
          ]}
          localization={{
            body: {
              emptyDataSourceMessage: "Nenhum registro encontrado",
              addTooltip: "Adicionar",
              deleteTooltip: "Deletar",
              editTooltip: "Editar",
              filterRow: {
                filterTooltip: "Filtro"
              },
              editRow: {
                deleteText: "Tem certeza que deseja deletar esse registro?",
                cancelTooltip: "Cancelar",
                saveTooltip: "Salvar"
              }
            },
            grouping: {
              placeholder: "Arrastar cabeçalhos"
            },
            header: {
              actions: "Ações"
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} de {count}",
              labelRowsSelect: "registros",
              labelRowsPerPage: "Registros por página",
              firstAriaLabel: "Primeira página",
              firstTooltip: "Primeira página",
              previousAriaLabel: "Página anterior",
              previousTooltip: "Página anterior",
              nextAriaLabel: "Próxima página",
              nextTooltip: "Próxima página",
              lastAriaLabel: "Última página",
              lastTooltip: "Última página"
            },
            toolbar: {
              addRemoveColumns: "Adicionar ou remover colunas",
              nRowsSelected: "{0} coluna(s) selecionada(s)",
              showColumnsTitle: "Mostrar colunas",
              showColumnsAriaLabel: "Mostar colunas",
              exportTitle: "Exportar",
              exportAriaLabel: "Exportar",
              exportName: "Exportar como CSV",
              searchTooltip: "Buscar",
              searchPlaceholder: "Buscar"
            }
          }}
          options={{
            actionsColumnIndex: 6,
            headerStyle: {
              backgroundColor: "#99def0",
              color: "black"
            },
            pageSize: 5
          }}
          editable={{}}
        />
      </div>
    );
  }
}

export default withSnackbar(Pacientes);
