class ContaBancaria {
    constructor(titular, saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }

    depositar(valor) {
        this.saldo += valor;
        console.log(`Depósito de R$${valor} realizado. Novo saldo: R$${this.saldo}`);
    }

    sacar(valor) {
        if (this.saldo >= valor) {
            this.saldo -= valor;
            console.log(`Saque de R$${valor} realizado. Novo saldo: R$${this.saldo}`);
        } else {
            console.log(`Saldo insuficiente para saque de R$${valor}.`);
        }
    }

    exibirSaldo() {
        console.log(`Saldo atual: R$${this.saldo}`);
    }
}

let conta1 = new ContaBancaria("João", 1000);
conta1.exibirSaldo();


