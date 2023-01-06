import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CreditDebitFilterPipe } from './creditDebitFilter'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cleanAccount() {
    var account = {
      name: 'Admin',
      startingBalace: 100.0,
      runningBalance: 73.34,
    }
    return account
  }

  cleanTransaction() {
    var transaction = {
      type: 'debit',
      typeFilter: '',
      amount: 0.0,
      description: '',
    }

    return transaction
  }
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('authToken')

    this.router.navigate([''])
  }

  transactions = [
    {
      amount: 100.0,
      description: 'Deposito',
      type: 'credit',
    },
    {
      amount: 50.0,
      description: 'Mercado',
      type: 'debit',
    },
    {
      amount: 25.26,
      description: 'Pagamento pro Guilherme',
      type: 'debit',
    },
    {
      amount: 100.0,
      description: 'Deposito',
      type: 'credit',
    },
    {
      amount: 35.15,
      description: "Ifood",
      type: 'debit',
    },
    {
      amount: 20,
      description: 'Netflix',
      type: 'debit',
    },
  ]
  transaction = this.cleanTransaction()
  account = this.cleanAccount()

  transactionList = this.transactions

  saveTransaction(transaction: {
    amount: any
    type: any
    description?: string
  }) {
    var amount = parseFloat(this.transaction.amount.toString())
    var num = parseFloat(this.account.runningBalance.toString())
    var answer = 0

    if (transaction.type === 'credit') {
      answer = num + amount
    } else {
      answer = num - amount
    }
    this.account.runningBalance = answer

    this.transaction.amount = amount
    this.transactions.push(this.transaction)
    this.transaction = this.cleanTransaction()
  }
}

