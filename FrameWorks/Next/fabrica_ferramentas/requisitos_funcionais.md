# Lista de Requisitos Funcionais - Sistema de Gestão de Estoque

## 1. Autenticação de Usuários
- RF01: O sistema deve permitir o login de usuários com credenciais válidas (usuário e senha).
- RF02: Em caso de falha de autenticação, o sistema deve informar o motivo da falha (ex: usuário não encontrado, senha incorreta) e redirecionar para a tela de login.
- RF03: O sistema deve permitir o logout do usuário, redirecionando para a tela de login.

## 2. Interface Principal (Dashboard)
- RF04: A interface principal deve exibir o nome do usuário logado.
- RF05: Deve haver um meio para o usuário fazer logout.
- RF06: Deve haver acesso à interface de "Cadastro de Produto".
- RF07: Deve haver acesso à interface "Gestão de Estoque".

## 3. Cadastro de Produtos
- RF08: A interface deve listar todos os produtos cadastrados em uma tabela, carregados automaticamente.
- RF09: Deve haver um campo de busca para filtrar produtos por termo de busca, atualizando a tabela dinamicamente.
- RF10: Deve permitir inserir dados de um novo produto (nome, descrição, categoria, tamanho, peso, material, estoque mínimo, quantidade atual).
- RF11: Deve permitir editar dados de um produto existente.
- RF12: Deve permitir excluir um produto existente.
- RF13: Deve realizar validações nos campos obrigatórios e formatos válidos, exibindo alertas para dados ausentes ou inválidos.
- RF14: Deve haver um meio para retornar à interface principal.

## 4. Gestão de Estoque
- RF15: Deve listar produtos em ordem alfabética (por nome), utilizando um algoritmo de ordenação.
- RF16: Deve permitir selecionar um produto para movimentação.
- RF17: Deve permitir escolher o tipo de movimentação: entrada ou saída.
- RF18: Deve permitir inserir a data da movimentação.
- RF19: Deve permitir inserir a quantidade da movimentação.
- RF20: Para movimentações de saída, deve verificar automaticamente se o estoque ficará abaixo do mínimo, gerando um alerta.
- RF21: Deve registrar cada movimentação no histórico, incluindo responsável (usuário logado), data, tipo, quantidade e produto.

## 5. Requisitos Gerais
- RF22: O sistema deve persistir dados em um banco de dados MongoDB.
- RF23: O sistema deve ser responsivo e acessível via web.
- RF24: O sistema deve garantir rastreabilidade através do histórico de movimentações.
- RF25: O sistema deve emitir alertas automáticos para estoque baixo.
