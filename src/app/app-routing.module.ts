import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarPessoaComponent } from './listar-pessoa/listar-pessoa.component';
import { CadastrarEmpresaComponent } from './cadastrar-empresa/cadastrar-empresa.component';

const routes: Routes = [
	{ path:  '', redirectTo:  'pessoas', pathMatch:  'full' },
	{
    path:  '',
    component:  ListarPessoaComponent
	},
	{
    path:  'cadastrar-empresa',
    component:  CadastrarEmpresaComponent
  },
    {
      path:  'editar-empresa/:id',
      component:  CadastrarEmpresaComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
