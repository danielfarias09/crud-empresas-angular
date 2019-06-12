import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../model/empresa'
import { ApiService } from '../../service/api.service'
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})
export class ListarEmpresaComponent implements OnInit {
  private nome: string;
  private endereco: string;
	private empresas: Array<Empresa>;

  private colunas: string[] = ['nome', 'email', 'telefone', 'acoes'];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.nome = "";
    this.endereco= "";
    this.empresas = new Array<Empresa>();
  	this.getEmpresas();
  }

  public getEmpresas(){
    this.api.getEmpresas(this.nome,this.endereco).subscribe((data:  Array<Empresa>) => {
        this.empresas  =  data;
    });
  }

  public excluirEmpresa(i,empresa){
    this.api.deleteEmpresa(empresa.id).subscribe(() => {
      this.empresas.splice(i,1);
	    this.empresas = this.empresas.slice();
    });
  }

}
