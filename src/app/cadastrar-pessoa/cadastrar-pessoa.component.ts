import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Pessoa } from '../pessoa';
import { Telefone } from '../telefone';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.css']
})

export class CadastrarPessoaComponent implements OnInit {

	public pessoa: Pessoa;
	public telefone: Telefone;
	public telefones: Array<Telefone> = [];
	public colunas: string[] = ['id', 'ddd', 'telefone', 'acoes'];
  public formulario: FormGroup;
  public idPessoa: number;

  constructor(private api: ApiService, private router: Router,
   private route: ActivatedRoute,private datePipe: DatePipe) { }

  ngOnInit() {
    this.pessoa = new Pessoa();
    this.telefone = new Telefone();
    this.idPessoa = Number(this.route.snapshot.paramMap.get('id'));

    if(this.idPessoa != null){
      this.api.getPessoa(this.idPessoa).subscribe((pessoa: Pessoa) => {
        this.formulario.setValue({
          nome: pessoa.nome,
          cpf: pessoa.cpf,
          email: pessoa.email,
          dataNascimento: this.datePipe.transform(pessoa.dataNascimento, 'yyyy-MM-dd'),
          ddd: "",
          telefone: ""

        })
        this.telefones = pessoa.telefones;
     });
    }

    this.formulario = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('',[
        Validators.required,
        Validators.pattern("^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$")
      ]),
      email: new FormControl('',[ 
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]),
      dataNascimento: new FormControl('', Validators.required),
      ddd: new FormControl('', Validators.minLength(2)),
      telefone: new FormControl('', Validators.minLength(8)),
    });
  }

  adicionarTelefone(){
    this.telefone.ddd = this.formulario.value.ddd;
    this.telefone.numero = this.formulario.value.telefone;

  	this.telefones.push(this.telefone);
  	this.telefones = this.telefones.slice();
  	this.telefone = new Telefone();

    this.formulario.patchValue( {'ddd': null} );
    this.formulario.patchValue( {'telefone': null} );
  }

  salvarPessoa(){
    this.pessoa = this.formulario.value;
    this.pessoa.id = this.idPessoa;
  	this.pessoa.telefones = this.telefones;
    console.log(this.pessoa);
    if(this.pessoa.id){
      this.api.updatePessoa(this.pessoa).subscribe((response) => {
        this.router.navigate(['']);
      });
    }else{
      this.api.createPessoa(this.pessoa).subscribe((response) => {
        this.router.navigate(['']);
      });
    }
  }

  excluirTelefone(i,telefone){
    this.telefones.splice(i,1);
    this.telefones = this.telefones.slice();
  }

}
