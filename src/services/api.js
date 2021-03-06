import api_interna from "./api_interna";

export default class api {
  // Autentica o usuário e retorna o token Bearer equivalente ao login

  /** Autentication route
   * @param {nomeUsuario}
   * @param {senha}
   */
  static autenticate(nomeUsuario, senha) {
    return api_interna.post("auth/login", { nomeUsuario, senha });
  }

  //Rotas de Pacientes

  // Retorna todos os pacientes
  static getPacientes() {
    return api_interna.get("/pacientes");
  }
  /** Retorna um paciente por id
   * @param {id}
   */
  static getPaciente(id) {
    return api_interna.get(`pacientes/${parseInt(id)}`);
  }

  //Profissionais-Saude Routes

  //get all Profissionais-saude
  static getProfissionaisSaude() {
    return api_interna.get(`profissionais-saude`);
  }

  //get one Profissional-saude by id
  static getProfissionalSaude(id) {
    return api_interna.get(`profissionais-saude/${parseInt(id)}`);
  }

  //get one Profissional-saude by type
  static getProfissionalSaudeTipo(type) {
    return api_interna.get(`profissionais-saude?tipo=${type}`);
  }

  //Acompanhamentos Routes

  //get all Acompanhamentos
  static getAcompanhamentos() {
    return api_interna.get(`acompanhamentos`);
  }

  //get one Acompanhamento by id
  static getAcompanhamento(id) {
    return api_interna.get(`acompanhamentos/${id}`);
  }
  //get one Acompanhamento by cirurgia id
  static getAcompanhamentoCirurgia(idCirurgia) {
    return api_interna.get(
      `acompanhamentos?cirurgiaLimpaId=${parseInt(idCirurgia)}`
    );
  }

  /**Create Acompanhamento
   * @param {acompanhamento}
   */
  static createAcompanhamento({ acompanhamento }) {
    return api_interna.post(`acompanhamentos`, {
      cirurgiaLimpaId: parseInt(acompanhamento.cirurgiaLimpaId),
      responsavelPreenchimentoId: parseInt(
        acompanhamento.responsavelPreenchimentoId
      ),
      permanenciaPaciente: acompanhamento.permanenciaPaciente,
      reinternacao: acompanhamento.reinternacao,
      usoProtese: acompanhamento.usoProtese,
      eventoAdverso: acompanhamento.eventoAdverso,
      isc: acompanhamento.isc
    });
  }

  /**Update Acompanhamento
   * @param {acompanhamento}
   */
  static updateAcompanhamento({ acompanhamento }) {
    return api_interna.put(`acompanhamentos/${parseInt(acompanhamento.id)}`, {
      cirurgiaLimpaId: parseInt(acompanhamento.cirurgiaLimpaId),
      responsavelPreenchimentoId: parseInt(
        acompanhamento.responsavelPreenchimentoId
      ),
      permanenciaPaciente: acompanhamento.permanenciaPaciente,
      reinternacao: acompanhamento.reinternacao,
      usoProtese: acompanhamento.usoProtese,
      eventoAdverso: acompanhamento.eventoAdverso,
      isc: acompanhamento.isc
    });
  }

  //Rotas de Cirurgias Limpas

  /** Armazena uma nova cirurgia
   * @param {cirurgiaLimpa}
   */
  static createCirurgiaLimpa({ cirurgiaLimpa }) {
    return api_interna.post("cirurgias-limpas", {
      pacienteId: cirurgiaLimpa.pacienteId,
      medicoCirurgiaoId: parseInt(cirurgiaLimpa.medicoCirurgiaoId),
      medicoAnestesistaId: parseInt(cirurgiaLimpa.medicoAnestesistaId),
      dataHoraInicio: cirurgiaLimpa.dataHoraInicio,
      dataHoraFim: cirurgiaLimpa.dataHoraFim,
      descricao: cirurgiaLimpa.descricao,
      novaCirurgia: cirurgiaLimpa.novaCirurgia,
      temperaturaMinimaSala: parseInt(cirurgiaLimpa.temperaturaMinimaSala),
      temperaturaMaximaSala: parseInt(cirurgiaLimpa.temperaturaMaximaSala),
      cirurgiaLimpa: cirurgiaLimpa.cirurgiaLimpa
    });
  }

  /** Atualiza uma cirurgia limpa existente
   * @param {cirurgiaLimpa}
   */
  static updateCirurgiaLimpa({ cirurgiaLimpa }) {
    return api_interna.put(`cirurgias-limpas/${cirurgiaLimpa.id}`, {
      pacienteId: cirurgiaLimpa.pacienteId,
      medicoCirurgiaoId: parseInt(cirurgiaLimpa.medicoCirurgiaoId),
      medicoAnestesistaId: parseInt(cirurgiaLimpa.medicoAnestesistaId),
      dataHoraInicio: cirurgiaLimpa.dataHoraInicio,
      dataHoraFim: cirurgiaLimpa.dataHoraFim,
      descricao: cirurgiaLimpa.descricao,
      novaCirurgia: cirurgiaLimpa.novaCirurgia,
      temperaturaMinimaSala: parseInt(cirurgiaLimpa.temperaturaMinimaSala),
      temperaturaMaximaSala: parseInt(cirurgiaLimpa.temperaturaMaximaSala),
      cirurgiaLimpa: cirurgiaLimpa.cirurgiaLimpa
    });
  }

  //get all Cirurgias limpas
  static getCirurgiasLimpas() {
    return api_interna.get(`cirurgias-limpas`);
  }

  //get one Cirurgia limpa by Paciente id
  static getCirurgiaLimpaPaciente(idPaciente) {
    return api_interna.get(
      `cirurgias-limpas?pacienteId=${parseInt(idPaciente)}`
    );
  }

  //get one Cirurgia limpa by id
  static getCirurgiaLimpa(id) {
    return api_interna.get(`cirurgias-limpas/${parseInt(id)}`);
  }

  //delete one Cirurgia limpa by id
  static deleteCirurgiaLimpa(id) {
    return api_interna.delete(`cirurgias-limpas/${parseInt(id)}`);
  }

  //Registro Routes

  //get all registros
  static getRegistros() {
    return api_interna.get(`registros`);
  }

  /**get all registros by acompanhamentoID
   *   @param {acompanhamentoId}
   */
  static getRegistrosAcompanhamento(acompanhamentoId) {
    return api_interna.get(
      `registros?acompanhamentoId=${parseInt(acompanhamentoId)}`
    );
  }

  /**get one registro by id
   * @param {id}
   */
  static getRegistro(id) {
    return api_interna.get(`registros/${parseInt(id)}`);
  }

  /**create a new registro
   * @param {registro}
   */
  static createRegistro({ registro }) {
    return api_interna.post(`registros`, {
      id: 0,
      dataHora: "2020-03-19T15:14:29.675Z",
      acompanhamentoId: 0,
      formatoId: 0
    });
  }
  /**update an already existing registro
   * @param {registro}
   */
  static updateRegistro({ registro }) {
    return api_interna.put(`registros/${parseInt(registro.id)}`, {
      id: registro.id,
      dataHora: registro.dataHora,
      acompanhamentoId: registro.acompanhamentoId,
      formatoId: registro.formatoId
    });
  }

  //Formato Routes

  //get all formatos
  static getFormatos() {
    return api_interna.get(`formatos`);
  }
  /**get one formato by id
   * @param {id}
   */
  static getFormato(id) {
    return api_interna.get(`formatos/${parseInt(id)}`);
  }
}
