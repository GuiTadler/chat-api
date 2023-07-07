const token = require('../util/token');
const usuarioModel = require('../models/usuarioModel');

exports.entrar = async (nick) => {
  let resp = await usuarioModel.registrarUsuario(nick);
  if (resp.insertedId) {
    return {
      'idUser': resp.insertedId,
      'token': await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''), nick),
      'nick': nick
    }
  }
}

exports.sairChat = async (nick) => {
  let user = await usuarioModel.buscarUsuario(nick);
  if (user) {
    let resp = await usuarioModel.excluirUsuario(user._id);
    if (resp.deletedCount) {
      return {msg:'Ok, saiu do chat', timestamp:timestamp=Date.now()};
    }
  }
  return false;

};
