export type Cidade = {
        id: number;
        nome:string;
        estado?:Estado;
}

export type Estado = {
        id:number;
        nome:string;
}