import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarEmpresaComponent } from './components/listar-empresa/listar-empresa.component';
import { CadastrarEmpresaComponent } from './components/cadastrar-empresa/cadastrar-empresa.component';

const routes: Routes = [
	{ path:  '', redirectTo:  'empresas', pathMatch:  'full' },
	{
    path:  '',
    component:  ListarEmpresaComponent
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
