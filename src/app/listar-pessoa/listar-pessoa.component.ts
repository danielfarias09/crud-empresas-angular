import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Pessoa } from '../pessoa';
import { Router } from "@angular/router";

@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.css']
})

export class ListarPessoaComponent implements OnInit {
  private nome: string;
  private cpf: string;
	private pessoas: Array<Pessoa>;

	private colunas: string[] = ['id', 'nome', 'email', 'cpf', 'idade', 'qtdTelefones','acoes'];

  constructor(private api: ApiService,private router: Router) { }

  ngOnInit() {
    this.nome = "";
    this.cpf= "";
    this.pessoas = new Array<Pessoa>();
  	this.getPessoas();
  }

  public getPessoas(){
    this.api.getPessoas(this.nome,this.cpf).subscribe((data:  Array<Pessoa>) => {
        this.pessoas  =  data;
    });
  }

  public excluirPessoa(i,pessoa){
    this.api.deletePessoa(pessoa.id).subscribe(() => {
      this.pessoas.splice(i,1);
	    this.pessoas = this.pessoas.slice();
    });
  }

}
