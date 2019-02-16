import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()
export class ContatoService { 

    private contatosUrl: string = 'app/contatos';

    constructor(
        private http: Http
    ) {}

    getContatos(): Promise<Contato[]> {
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
    }

    getContato(id: number): Promise<Contato> {
        return this.getContatos()
            .then((contatos: Contato[]) => contatos.find(contato =>  contato.id === id))
    }

    private handleError(err: any): Promise<any> {
        console.log('Error: ', err);
        return Promise.reject(err.message || err);
    }

    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        })
        .then(() => {
            console.log("primeiro then");
            return 'Curso Angular 2';
        })
        .then((param: string) => {
            console.log("segundo then");
            console.log(param);

            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log('continuando depois de 4 segundos...');
                    resolve2();
                }, 4000);
            })
        })
        .then(() => {
            console.log('terceiro then');
            return this.getContatos();
        })
    }

}
