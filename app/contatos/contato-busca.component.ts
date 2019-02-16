import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html'
})

export class ContatoBuscaComponent implements OnInit {
    
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService
    ) { }

    ngOnInit(): void { 
        this.contatos = this.termosDaBusca
            .debounceTime(600) // aguarde por 300mms para emitir novos eventos
            .distinctUntilChanged() // ignore se o próximo termo for igual ao termo anterior
            .switchMap(term => term ? this.contatoService.search(term) : Observable.of<Contato[]>([])
            ).catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);
            });

        this.contatos.subscribe((contatos: Contato[]) => {
            console.log('retornou do servidor: ', contatos);
        });
    }

    search(termo: string): void {
        this.termosDaBusca.next(termo);
    }
}