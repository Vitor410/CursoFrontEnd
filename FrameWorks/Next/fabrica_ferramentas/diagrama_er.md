# Diagrama Entidade-Relacionamento (DER) - Sistema de Gestão de Estoque

## Entidades

### 1. Usuário (User)
- **Atributos:**
  - id: ObjectId (chave primária)
  - nome: String (obrigatório)
  - email: String (obrigatório, único)
  - senha: String (obrigatório, hash)
  - criadoEm: Date (obrigatório, padrão: data atual)
  - atualizadoEm: Date (obrigatório, padrão: data atual)

### 2. Produto (Product)
- **Atributos:**
  - id: ObjectId (chave primária)
  - nome: String (obrigatório)
  - descricao: String
  - categoria: String (ex: martelo, chave de fenda)
  - tamanho: String (ex: pequeno, médio, grande)
  - peso: Number (em kg)
  - material: String (ex: aço, madeira)
  - estoqueMinimo: Number (obrigatório, padrão: 0)
  - quantidadeAtual: Number (obrigatório, padrão: 0)
  - criadoEm: Date (obrigatório, padrão: data atual)
  - atualizadoEm: Date (obrigatório, padrão: data atual)

### 3. Movimentação de Estoque (StockMovement)
- **Atributos:**
  - id: ObjectId (chave primária)
  - produtoId: ObjectId (chave estrangeira para Product)
  - usuarioId: ObjectId (chave estrangeira para User)
  - tipo: String (obrigatório, enum: 'entrada', 'saida')
  - quantidade: Number (obrigatório)
  - data: Date (obrigatório)
  - criadoEm: Date (obrigatório, padrão: data atual)

## Relacionamentos

### Usuário - Movimentação de Estoque
- **Tipo:** 1:N (Um usuário pode registrar múltiplas movimentações)
- **Chave estrangeira:** usuarioId em StockMovement referencia id em User

### Produto - Movimentação de Estoque
- **Tipo:** 1:N (Um produto pode ter múltiplas movimentações)
- **Chave estrangeira:** produtoId em StockMovement referencia id em Product

## Diagrama Textual

```
+----------------+       +-------------------+       +-----------------------+
|     User       |       |    StockMovement  |       |       Product         |
+----------------+       +-------------------+       +-----------------------+
| - id (PK)      |<------| - id (PK)         |       | - id (PK)             |
| - nome         |       | - produtoId (FK)  |------>| - nome                |
| - email        |       | - usuarioId (FK)  |       | - descricao           |
| - senha        |       | - tipo            |       | - categoria           |
| - criadoEm     |       | - quantidade      |       | - tamanho             |
| - atualizadoEm |       | - data            |       | - peso                |
+----------------+       | - criadoEm        |       | - material            |
                         +-------------------+       | - estoqueMinimo       |
                                                      | - quantidadeAtual     |
                                                      | - criadoEm            |
                                                      | - atualizadoEm        |
                                                      +-----------------------+
```

## Notas
- Todas as entidades incluem timestamps para auditoria.
- StockMovement registra o histórico completo de entradas e saídas.
- Produto inclui atributos específicos para ferramentas (material, tamanho, peso).
- Usuário é único por email para autenticação.
