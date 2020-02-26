import { Component } from "react";
import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import { withSnackbar } from "notistack";

import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

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

import api from "../../services/api";

import { Redirect } from "react-router-dom";

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

class Usuarios extends Component {
  constructor() {
    super();
    this.state = {
      orgaos: [],
      users: [],
      link: "",
      redirect: false
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.link} />;
    }
  };
  //did mount que preenche a tabela com os dados do banco assim que a página carrega
  componentDidMount() {
    api
      .getUsers()
      .then(result => {
        this.setState({ users: result.data.users });
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
    api
      .getOrgaos()
      .then(result => {
        var listOrg = {};

        result.data.orgaos.forEach(org => {
          listOrg[org.codigo] = org.sigla;
        });
        this.setState({
          orgaos: listOrg
        });
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
  }

  componentWillUnmount() {}

  //função que cria um usuário com os dados preenchidos na tabela, usando a API.
  createUser({ user }) {
    return api
      .getParam(1)
      .then(result => {
        if (result.data.param.name === "senha_padrao_autenticacao") {
          return api.createUser({
            user: { password: result.data.param.value, ...user }
          });
        } else {
          this.props.enqueueSnackbar(
            `Senha padrão não foi encontrada, verificar a grafia do parâmetro`,
            { variant: "error" }
          );
        }
      })
      .then(result => {
        this.setState({ users: [...this.state.users, result.data.user] });
        this.props.enqueueSnackbar(
          `${result.data.user.login} ${result.data.message}`,
          { variant: "success" }
        );
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
  }

  //função que edita um usuário com os dados modificados na tabela, usando a API.
  updateUser({ user, update }) {
    return api
      .updateUserAdmin({ user: update })
      .then(result => {
        const data = this.state.users;
        data[data.indexOf(user)] = update;
        this.setState({ users: data });
        this.props.enqueueSnackbar(
          `${result.data.user.login} ${result.data.message}`,
          { variant: "success" }
        );
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
  }

  //função que deleta um usuário escolhido na tabela, usando a API.
  deleteUser({ user }) {
    return api
      .deleteUser({ user })
      .then(result => {
        const data = this.state.users;
        data.splice(data.indexOf(user), 1);
        this.setState({ users: data });
        this.props.enqueueSnackbar(` ${result.data.message}`, {
          variant: "success"
        });
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <MaterialTable
          title="Lista de Usuários"
          data={this.state.users}
          icons={tableIcons}
          columns={[
            { title: "id", field: "id", editable: "never" },
            { title: "Login", field: "login" },
            { title: "Nome", field: "name" },
            { title: "CPF", field: "cpf", type: "numeric" },
            { title: "E-mail", field: "email" },
            {
              title: "Orgão",
              field: "orgao_codigo",
              lookup: { ...this.state.orgaos }
            }
          ]}
          actions={[
            {
              icon: () => <SupervisorAccountIcon color="inherit" />,
              tooltip: "Visualizar Perfis de Usuário",
              onClick: (event, rowData) => {
                console.log(rowData);
                this.setState({
                  link: `/usuarios/${rowData.id}/perfis`,
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
          editable={{
            onRowAdd: newData => this.createUser({ user: newData }),
            onRowUpdate: (newData, oldData) =>
              this.updateUser({ user: oldData, update: newData }),
            onRowDelete: oldData => this.deleteUser({ user: oldData })
          }}
        />
      </div>
    );
  }
}

export default withSnackbar(Usuarios);
