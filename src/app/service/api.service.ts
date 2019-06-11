import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static readonly BASE_URL = 'http://localhost:8080/empresas/';

  constructor(private http: HttpClient) {}

  getEmpresas(nome, endereco) {
    	return this.http.get(ApiService.BASE_URL, {params:{nome: nome, endereco: endereco}});
  	}

  createEmpresa(pessoa){
    return  this.http.post(ApiService.BASE_URL, pessoa);
 	}

  getEmpresa(id){
    return  this.http.get(ApiService.BASE_URL + id);
 	}

 	deleteEmpresa(id){
    return  this.http.delete(ApiService.BASE_URL + id);
 	}

  updateEmpresa(pessoa){
    return  this.http.put(ApiService.BASE_URL, pessoa);
  }

}
