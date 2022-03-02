export const tiposMovimiento = {
  crearDocumento: 0,
  modificarDocumento: 1,
  borrarDocumento: 2,
  crearUsuario: 3,
  modificarUsuario: 4,
  borrarUsuario: 5,
  crearOficina: 6,
  modificarOficina: 7,
  borrarOficina: 8,
  crearTipo: 9,
  modificarTipo: 10,
  borrarTipo: 11,
  crearReferencia: 12,
  modificarReferencia: 13,
  borrarReferencia: 14,
  asignarFormulario: 15,
  resolverFormulario: 16,
  remitirFormulario: 17,
  desasignarFormulario: 18,
  cambioPassword: 60,
  olvidoPassword: 61,
  restablecerPassword: 62,
  registroUsuario: 63,
};
export const tiposPerfil = {
  general: 1,
  informador: 3,
  liquidador: 8,
};
export const tiposRol = {
  usuario: 1,
  responsable: 2,
  admin: 3,
};
export const estadosUsuario = {
  reserva: 0,
  activo: 1,
};
export const estadosDocumento = {
  pendiente: 0,
  asignado: 1,
  resuelto: 2,
  remitido: 3,
};

/* arrays */
export const arrTiposRol = [
  { id: 1, des: "USUARIO" },
  { id: 2, des: "RESPONSABLE" },
  { id: 3, des: "ADMINISTRADOR" },
];
export const arrTiposPerfil = [
  { id: 1, des: "GENERAL" },
  { id: 3, des: "INFORMADOR" },
  { id: 8, des: "LIQUIDADOR" },
];
export const arrEstadosUsuario = [
  { id: 0, des: "RESERVA" },
  { id: 1, des: "ACTIVO" },
];
