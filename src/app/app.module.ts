import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { HomeComponent } from './core/home/home.component';
import { HomemComponent } from './produtos/homem/homem.component';
import { InfoprodutoComponent } from './infoproduto/infoproduto.component';
import { LoginmodalComponent } from './loginmodal/loginmodal.component';
import { FiltroComponent } from './filtro/filtro.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ServprodutosService } from './servprodutos/servprodutos.service';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { GestaoprodutosComponent } from './gestaoadmin/gestaoprodutos/gestaoprodutos.component';
import { GestaoutilizadoresComponent } from './gestaoadmin/gestaoutilizadores/gestaoutilizadores.component';
import { GestaoadminComponent } from './gestaoadmin/gestaoadmin/gestaoadmin.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    HomeComponent,
    HomemComponent,
    InfoprodutoComponent,
    LoginmodalComponent,
    FiltroComponent,
    WishlistComponent,
    CarrinhoComponent,
    GestaoprodutosComponent,
    GestaoutilizadoresComponent,
    GestaoadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatGridListModule,
    BrowserAnimationsModule,
    NgbCarouselModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  providers: [ServprodutosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
