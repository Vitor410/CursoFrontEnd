import connectMongo from '@/services/mongodb';
import Usuario, { Iusuario } from '../models/Usuario';

// Exemplo de dados em memória
let usuarios: Iusuario[] = [];

export const UsuarioController = {
  listar: (): Iusuario[] => {
    return usuarios;
  },

  buscarPorId: (id: string): Iusuario | undefined => {
    return usuarios.find(u => u.id === id);
  },

  criar: (usuario: Iusuario): Iusuario => {
    usuarios.push(usuario);
    return usuario;
  },

  atualizar: (id: string, dados: Partial<Iusuario>): Iusuario | undefined => {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
      Object.assign(usuario, dados);
      return usuario;
    }
    return undefined;
  },

  remover: (id: string): boolean => {
    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      usuarios.splice(index, 1);
      return true;
    }
    return false;
  }
};

//métodos de autenticação de usuário (login) ( senha é passada criptografada)
export const autenticaUsuario = async (username: string, password: string) => {
    await connectMongo();
    //busca o usuário pelo username e a senha ainda criptografada
    const usuario = await Usuario.find({username}).select("+password");
    // usuário não encontrado
    if (!usuario || usuario.length === 0) return null;
    //comparar a senha digitada com a senha do banco
    const senhaSecreta = await usuario[0].compareSenha(password);
    if (!senhaSecreta) return null; //senha incorreta
    return usuario[0]; // se deu certo retorna o usuário sem a senha 
}