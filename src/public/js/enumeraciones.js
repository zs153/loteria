export const tiposMovimiento = {
  crearLoteria: 1,
  modificarLoteria: 2,
  borrarLoteria: 3,
  crearUsuario: 4,
  modificarUsuario: 5,
  borrarUsuario: 6,
  cambiarEstado: 7,
  actualizarPerfil: 8,
  cambioPassword: 9,
  olvidoPassword: 10,
  restablecerPassword: 11,
  registroUsuario: 12,
};
export const tiposRol = {
  usuario: 1,
  admin: 2,
};
export const estadosLoteria = {
  pendiente: 1,
  pagada: 2,
};

/* arrays */
export const arrTiposRol = [
  { id: 1, des: "USUARIO" },
  { id: 2, des: "ADMINISTRADOR" },
];
export const arrEstadosLoteria = [
  { ID: 1, DES: "PENDIENTE", LIT: "PEN" },
  { ID: 2, DES: "PAGADA", LIT: "PAG" },
];
