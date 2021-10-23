import { Cidade } from "./cidade";

export type Fornecedor = {
    nome: string,
    cnpj: string,
    email: string,
    login: string,
    senha: string,
    cidade: Cidade,
}