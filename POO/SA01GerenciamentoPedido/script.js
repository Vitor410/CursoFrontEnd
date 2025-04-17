//criar as classes

class Cliente { //model
    #id;
    #nome;
    constructor(id, nome) {
      this.#id = id;
      this.#nome = nome;
    }
  
    getId() {
      return this.#id;
    }
    getNome() {
      return this.#nome;
    }
  }
  
  class Produto { //model
    #id;
    #nome;
    #preco;
    constructor(id, nome, preco) {
      this.#id = id;
      this.#nome = nome;
      this.#preco = preco;
    }
    getId() {
      return this.#id;
    }
    getNome() {
      return this.#nome;
    }
    getPreco() {
      return this.#preco;
    }
  }
  
  class Pedido { //model
    #id;
    #cliente;
    #itens;
    #desconto;
    #total;
    constructor(id, cliente, itens, desconto) {
      this.#id = id;
      this.#cliente = cliente;
      this.#itens = itens;
      this.#desconto = desconto;
      this.#total = this.calcularTotal();
    }
    calcularTotal() {
      let total = this.#itens.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
      );
      return total - total * (this.#desconto / 100);
    }
    //getters
    getId() {
      return this.#id;
    }
    getCliente() {
      return this.#cliente;
    }
    getItens() {
      return this.#itens;
    }
    getDesconto() {
      return this.#desconto;
    }
    getTotal() {
      return this.#total;
    }
  }
  
  class SistemaPedidos {  //controller (crud)
      #clientes;
      #produtos;
      #pedidos;
      constructor() {
          this.#clientes = [];
          this.#produtos = [];
          this.#pedidos = [];
      }
  
      // getters
      getClientes(){
          return this.#clientes;
      }
      getProdutos(){
        return this.#produtos;
      }
      getPedidos(){
        return this.#pedidos;
      }
  
      cadastrarCliente(){
          const nome = document.getElementById("clienteNome").value;
          if(!nome) return alert("Digite un Nome para o Cliente.");
          const cliente = new Cliente(this.#clientes.length+1, nome);
          this.#clientes.push(cliente);
          this.#atualizarCliente(); // método para atualizar a lista de clientes no HTML
          document.getElementById("clienteNome").value = "";
      }
  
      #atualizarCliente(){
          const lista = document.getElementById("listaClientes");
          lista.innerHTML = "";
  
          const selectCliente = document.getElementById("selectCliente");
          selectCliente.innerHTML = '<option value="">Selecione um Cliente</option>';
  
          //percorrer a lista de clientes e preencher os elementos
          this.#clientes.forEach( cliente => {
              const li = document.createElement('li');
              li.textContent = cliente.getNome();
              lista.appendChild(li);
              
              const option = document.createElement("option");
              option.value = cliente.getId();
              option.textContent = cliente.getNome();
              selectCliente.appendChild(option)
          });
      }
  
      //lista de produtos
  
      cadastrarProduto(){
          const nome = document.getElementById("produtoNome").value;
          const preco = document.getElementById("produtoPreco").value;
          if(!nome || isNaN(preco)) return alert("Preencha os campos corretamente.");
          //instanciar um objeto da classe produto
          const produto = new Produto(this.#produtos.length+1, nome, preco);
          this.#produtos.push(produto);
          this.atualizarProdutos(); // método para atualizar a lista de produtos no HTML
          document.getElementById("produtoNome").value = "";
          document.getElementById("produtoPreco").value = "";
      }
  
      atualizarProdutos(){
          const lista = document.getElementById("listaProdutos");
          lista.innerHTML = "";
  
          const produtoDiv = document.getElementById("produtosDisponiveis");
          produtoDiv.innerHTML = "";
  
          //percorrer a lista de produtos e preencher os elementos
          this.#produtos.forEach( produto =>{
              const li = document.createElement("li");
              li.textContent = `${produto.getNome()} - R$ ${produto.getPreco()}`;
              lista.appendChild(li); //produto na lista de proutos
  
              const checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.value = produto.getId();
  
              const label = document.createElement("label");
              label.textContent = `${produto.getNome()} - R$ ${produto.getPreco()}`;
  
              const inputQuantidade = document.createElement("input");
              inputQuantidade.type = "number";
              inputQuantidade.value = 1;
              inputQuantidade.min = 1;
              //produtos na lista de pedidos
              produtoDiv.appendChild(checkbox);
              produtoDiv.appendChild(label);
              produtoDiv.appendChild(inputQuantidade);
              produtoDiv.appendChild(document.createElement("br"));
              checkbox.addEventListener("change", () =>{
                  if(checkbox.checked){
                    inputQuantidade.disabled = false;
                  }else{
                    inputQuantidade.disabled = true;
                  }
              });
          });
      }
    
      //lista de pedidos
      finalizarPedido(){
          const clienteNome = document.getElementById("selectCliente").value;
          if(!clienteNome)return alert("Selecione um cliente.");
          const cliente = this.#clientes.find( c => c.getId() == clienteNome);
  
          const desconto = parseFloat(document.getElementById("desconto").value) || 0;
          const itens = [];
          document.querySelectorAll("#produtosDisponiveis input[type='checkbox']").forEach((checkbox,index) => {
              if(checkbox.checked){
                  const produtoId = parseInt(checkbox.value);
                  const produto = this.#produtos.find( p => p.id === produtoId);
                  const quantidade = parseInt(document.querySelectorAll("#produtosDisponiveis input[type = 'number']")[index].value);
                  itens.push({produto, quantidade});
              }
          });
          if(itens.length === 0) return alert("Selecione pelo menos um Produto.");
          //instanciar um Pedido
          const pedido = new Pedido(this.#pedidos.length+1, cliente, itens, desconto);
          this.#pedidos.push(pedido);
          this.atualizarPedidos(); // método para atualizar os pedidos no HTML
          //limpa os campos
          document.getElementById("selectCliente").value = "";
          document.getElementById("desconto").value = "";
          document.querySelectorAll("#produtosDisponiveis input[type='checkbox']").forEach( checkbox => {
            checkbox.checked = false;
          });
      }
  
      atualizarPedidos(){
        const lista = document.getElementById("listaPedidos");
        lista.innerHTML = "";
  
        //percorrer a lista de pedidios e preencher os elementos
        this.#pedidos.forEach( pedido => {
            const li = document.createElement("li");
            li.textContent = `Pedido ID: ${pedido.getId()} - Cliente: ${pedido.getCliente().getNome()} - Total: R$ ${pedido.getTotal()}`;
            lista.appendChild(li);
        });
      }
  }
  
  //instanciar no sistema de Pedidos
  
  const sistema = new SistemaPedidos();