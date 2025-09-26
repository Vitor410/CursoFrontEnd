export interface Ordem {
  id: string;
  descricao: string;
  usuarioId: string;
  equipamentoId: string;
  status: string;
  criadoEm?: Date;
}

let ordens: Ordem[] = [];

export const OrdemController = {
  listar: (): Ordem[] => ordens,

  buscarPorId: (id: string): Ordem | undefined => ordens.find(o => o.id === id),

  criar: (ordem: Ordem): Ordem => {
    ordens.push(ordem);
    return ordem;
  },

  atualizar: (id: string, dados: Partial<Ordem>): Ordem | undefined => {
    const ordem = ordens.find(o => o.id === id);
    if (ordem) {
      Object.assign(ordem, dados);
      return ordem;
    }
    return undefined;
  },

  remover: (id: string): boolean => {
    const index = ordens.findIndex(o => o.id === id);
    if (index !== -1) {
      ordens.splice(index, 1);
      return true;
    }
    return false;
  }
};
