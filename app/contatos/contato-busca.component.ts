import { Component, OnInit, EventEmitter, OnChanges, Input, SimpleChanges, Output, SimpleChange } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer:hover {
            cursor: pointer;
        }
    `]
})

export class ContatoBuscaComponent implements OnInit, OnChanges {
    
    @Input() busca: string;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();
    
    constructor(
        private contatoService: ContatoService,
        private router: Router
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
        
    ngOnChanges(changes: SimpleChanges): void {
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);
    }

    search(termo: string): void {
        this.termosDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
}