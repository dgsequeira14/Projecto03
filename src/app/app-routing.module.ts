import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { HomemComponent } from './produtos/homem/homem.component';
import { InfoprodutoComponent } from './infoproduto/infoproduto.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'homem', component: HomemComponent },
  { path: 'produtos/:id', component: InfoprodutoComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
