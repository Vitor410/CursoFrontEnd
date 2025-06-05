export class Curriculo {
    
    constructor(
        public cpf: string,
        public nome: string,
        public email: string,
        public telefone: string,
        public experiencia: string,
    ) {}
    
    
    toMap(): { [key: string]: any } {
        return {
            cpf: this.cpf,
            nome: this.nome,
            email: this.email,
            telefone: this.telefone,
            experiencia: this.experiencia,
        };
    }
    
    
    static fromMap(map: any): Curriculo {
        return new Curriculo(
            map.cpf,
            map.nome,
            map.email,
            map.telefone,
            map.experiencia,
        );
    }       
}