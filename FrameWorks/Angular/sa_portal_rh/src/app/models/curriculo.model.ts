export class Curriculo {
    
    constructor(
        public cpf: number,
        public nome: string,
        public email: string,
        public telefone: number,
        public experiencia: string,
    ) {}
    
    
    toMap(): { [key: string]: any } {
        return {
        id: this.cpf,
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