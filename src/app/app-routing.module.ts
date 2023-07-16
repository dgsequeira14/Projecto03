import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { HomemComponent } from './produtos/homem/homem.component';
import { InfoprodutoComponent } from './infoproduto/infoproduto.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { GestaoadminComponent } from './gestaoadmin/gestaoadmin/gestaoadmin.component';
import { GestaoprodutosComponent } from './gestaoadmin/gestaoprodutos/gestaoprodutos.component';
import { GestaoutilizadoresComponent } from './gestaoadmin/gestaoutilizadores/gestaoutilizadores.component';
import { RegistoutilizadorComponent } from './registoutilizador/registoutilizador.component';
import { PerfilutilizadorComponent } from './perfil/perfilutilizador/perfilutilizador.component';
import { AlterarperfilComponent } from './perfil/alterarperfil/alterarperfil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home',
    pathMatch: 'full',
    redirectTo: '/',
  },
  { path: 'homem', component: HomemComponent },
  { path: 'produtos/:id', component: InfoprodutoComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'gestaoadmin', component: GestaoadminComponent },
  { path: 'gestaoadmin/gestaoprodutos', component: GestaoprodutosComponent },
  {
    path: 'gestaoadmin/gestaoutilizadores',
    component: GestaoutilizadoresComponent,
  },
  { path: 'registo', component: RegistoutilizadorComponent },
  { path: 'perfil', component: PerfilutilizadorComponent, children: [{ path: 'alterarinformacoes', component: AlterarperfilComponent } ]},
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
