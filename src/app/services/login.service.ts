import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Dados de usuário mockados para simular o login
  private mockUsers = [
    { name: 'Admin', email: 'admin@example.com', password: '123456', token: 'mock-token-admin' },
    { name: 'Usuário Teste', email: 'user@example.com', password: '123456', token: 'mock-token-user' },
    { name: 'Denilce', email: 'denilce.veloso@fatec.sp.gov.br', password: '123456', token: 'mock-token-denilce' }
  ];

  constructor() { }

  login(email: string, password: string) {
    // Simula uma chamada assíncrona com delay
    return of(this.mockUsers.find(user => 
      user.email === email && user.password === password
    )).pipe(
      delay(500), // Simula tempo de resposta
      tap((user) => {
        if (user) {
          sessionStorage.setItem("auth-token", user.token);
          sessionStorage.setItem("username", user.name);
        } else {
          throw new Error('Credenciais inválidas');
        }
      })
    );
  }

  signup(name: string, email: string, password: string) {
    // Simula cadastro - apenas adiciona ao array mockado (não persiste entre recarregamentos)
    const newUser = {
      name,
      email,
      password,
      token: `mock-token-${Math.random().toString(36).substr(2, 9)}`
    };
    
    this.mockUsers.push(newUser);
    
    return of(newUser).pipe(
      delay(500), // Simula tempo de resposta
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
      })
    );
  }
}