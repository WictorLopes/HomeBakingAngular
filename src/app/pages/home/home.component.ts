import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './logout'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  //conta padrão para entrar
  cleanAccount() {
    var account = {
      name: 'Admin',
      startingBalace: 100.0,
      runningBalance: 73.34,
    }
    return account
  }

  //toda vez que faz uma transição volta para os valor 0, tipo débito e descrição vazia
  cleanTransaction() {
    var transaction = {
      coinType: 'real | dolar | euro',
      coinTypeFilter: 'real',
      type: 'debit',
      typeFilter: '',
      amount: 0.0,
      description: '',
    }

    return transaction
  }
  //logout apenas para voltar para a página de login
  logout(router: Router) {
    localStorage.removeItem('authToken')
    router.navigate([''])
  }
  //transações fixas para aparecer no histórico
  transactions = [
    {
      amount: 100.0,
      description: 'Deposito',
      type: 'credit',
      coinTypeFilter: 'real',
    },
    {
      amount: 50.0,
      description: 'Mercado',
      type: 'debit',
      coinTypeFilter: 'real',
    },
    {
      amount: 25.26,
      description: 'Pagamento pro Guilherme',
      type: 'debit',
      coinTypeFilter: 'dolar',
    },
    {
      amount: 100.0,
      description: 'Deposito',
      type: 'credit',
      coinTypeFilter: 'euro',
    },
    {
      amount: 35.15,
      description: 'Ifood',
      type: 'debit',
      coinTypeFilter: 'real',
    },
    {
      amount: 20,
      description: 'Netflix',
      type: 'debit',
      coinTypeFilter: 'dolar',
    },
  ]
  transaction = this.cleanTransaction()
  account = this.cleanAccount()
  transactionList = this.transactions

  //API para pegar a cotação da moeda no dia
  cotacaoDolar = 0
  cotacaoEuro = 0
  cotacaoDolarEuro = 0
  cotacaoEuroDolar = 0
  constructor(private http: HttpClient) {}
  responseDolar = this.http
    .get('https://economia.awesomeapi.com.br/all/USD-BRL')
    .subscribe((dados: any) => {
      this.cotacaoDolar = dados.USD.high
    })
  responseEuro = this.http
    .get('https://economia.awesomeapi.com.br/all/EUR-BRL')
    .subscribe((dados: any) => {
      this.cotacaoEuro = dados.EUR.high
    })
  responseDolarEuro = this.http
    .get('https://economia.awesomeapi.com.br/all/USD-EUR')
    .subscribe((dados: any) => {
      this.cotacaoDolarEuro = dados.USD.high
    })
  responseEuroDolar = this.http
    .get('https://economia.awesomeapi.com.br/all/EUR-USD')
    .subscribe((dados: any) => {
      this.cotacaoEuroDolar = dados.EUR.high
    })

    //função para calcular o valor a ser depositado dependendo da moeda e salvar a transição
  saveTransaction(transaction: {
    amount: any
    type: any
    description?: string
    coinType: any
    coinTypeFilter: any
  }) {
    var amount = parseFloat(this.transaction.amount.toString())
    var num = parseFloat(this.account.runningBalance.toString())
    var answer = 0
    if (transaction.type === 'credit') {
      transaction.coinTypeFilter == 'dolar'
        ? (answer = num + amount * this.cotacaoDolar)
        : transaction.coinTypeFilter == 'euro'
        ? (answer = num + amount * this.cotacaoEuro)
        : (answer = num + amount)
    } else {
      transaction.coinTypeFilter == 'dolar'
        ? (answer = num - amount * this.cotacaoDolar)
        : transaction.coinTypeFilter == 'euro'
        ? (answer = num - amount * this.cotacaoEuro)
        : (answer = num - amount)
    }
    this.account.runningBalance = answer

    this.transaction.amount = amount
    this.transactions.push(this.transaction)
    this.transaction = this.cleanTransaction()
  }
}
