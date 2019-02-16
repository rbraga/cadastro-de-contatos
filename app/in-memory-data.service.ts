import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contato } from './contatos/contato.model';

export class InMemoryDataService implements InMemoryDbService {
    
    createDb() {
        let contatos: Contato[] = [
            { id: 1, nome: 'Fulano de Tal', email: 'fulano@email.com', telefone: '(00) 0000-0000'},
            { id: 2, nome: 'Ciclano', email: 'ciclano@email.com', telefone: '(00) 0000-0000'},
            { id: 3, nome: 'Seu Madruga', email: 'madruga@email.com', telefone: '(00) 0000-0000'},
            { id: 4, nome: 'Rafael Braga', email: 'rafael@email.com', telefone: '(00) 0000-0000'},
            { id: 5, nome: 'Evelyn de Souza', email: 'evelyn@email.com', telefone: '(00) 0000-0000'},
            { id: 6, nome: 'Bella', email: 'bella@dog.com', telefone: '(00) 0000-0000'}
        ];

        return {contatos};
    }
}