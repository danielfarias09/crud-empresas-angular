import { Telefone } from './telefone';

export class Pessoa {
	id: number;
	nome: string;
	cpf: string;
	idade: string;
	email: string;
	dataNascimento: Date;
	telefones: Array<Telefone> = new Array<Telefone>();
}
