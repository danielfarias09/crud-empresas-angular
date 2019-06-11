import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getPessoas(nome, cpf) {
    	return this.http.get('http://localhost:8080/pessoas/',{params:{nome: nome, cpf: cpf}});
  	}

  createPessoa(pessoa){
    return  this.http.post('http://localhost:8080/pessoas/',pessoa);
 	}

  getPessoa(id){
    return  this.http.get('http://localhost:8080/pessoas/' + id);
 	}

 	deletePessoa(id){
    return  this.http.delete('http://localhost:8080/pessoas/' + id);
 	}

  updatePessoa(pessoa){
    return  this.http.put('http://localhost:8080/pessoas/',pessoa);
  }

}
