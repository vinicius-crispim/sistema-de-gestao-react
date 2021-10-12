export type Funcionario = {
    nome: string,
    senha: string,
    email: string,
    login: string,
    telefone: string,
    tipo:TipoFuncionario,
}

export type TipoFuncionario = {
    id: number,
    tipo:string,
}
