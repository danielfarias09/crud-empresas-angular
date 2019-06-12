import { Component, OnInit } from '@angular/core';
import { Empresa } from '../model/empresa';
import { Endereco } from '../model/endereco';
import { ApiService } from '../service/api.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css']
})
export class CadastrarEmpresaComponent implements OnInit {

  public empresa: Empresa;
  public endereco: Endereco;
  public idEmpresa: number;
  public formulario: FormGroup;

  constructor(private api: ApiService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.empresa = new Empresa();
    this.endereco = new Endereco();
    this.idEmpresa = Number(this.route.snapshot.paramMap.get('id'));

    if(this.idEmpresa != null){
      this.api.getEmpresa(this.idEmpresa).subscribe((empresa: Empresa) => {
        this.formulario.setValue({
          nome: empresa.nome,
          email: empresa.email,
          ddd: empresa.ddd,
          telefone: empresa.telefone,
          logradouro: empresa.endereco.logradouro,
          numero: empresa.endereco.numero,
          bairro: empresa.endereco.bairro,
          cep: empresa.endereco.cep
        })
     });
    }

    this.formulario = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('',[ 
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]),
      ddd: new FormControl('', Validators.minLength(2)),
      telefone: new FormControl('', Validators.minLength(8)),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required)
    });
  }

  salvarEmpresa(){
    this.empresa = this.formulario.value;
    this.endereco.logradouro =  this.formulario.value.logradouro;
    this.endereco.numero = this.formulario.value.numero;
    this.endereco.bairro = this.formulario.value.bairro;
    this.endereco.cep = this.formulario.value.cep;

    this.empresa.endereco = this.endereco;
    console.log(this.empresa)
    this.empresa.id = this.idEmpresa;
    
    if(this.empresa.id){
      this.api.updateEmpresa(this.empresa).subscribe((response) => {
        this.router.navigate(['']);
      });
    }else{
      this.api.createEmpresa(this.empresa).subscribe((response) => {
        this.router.navigate(['']);
      });
    }
  }

}
