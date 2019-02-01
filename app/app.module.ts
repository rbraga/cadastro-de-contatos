import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { ContatosModule } from './contatos/contatos.module'; 


@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        ContatosModule
        ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}