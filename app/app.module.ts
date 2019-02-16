import './util/rxjs-extensions';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { ContatosModule } from './contatos/contatos.module'; 
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { DialogService } from './dialog.service';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        ContatosModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [AppComponent],
    providers: [
        DialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}