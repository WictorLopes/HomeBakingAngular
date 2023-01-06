import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any
  //conta padrão para entrar
  emailDB: string = 'admin'

  senhaDB: string = '123'

  mensagem: string | undefined

  constructor(private formBuilder: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.criarForm()
  }
//criar o formulario de preenchimento de login vazio
  criarForm() {
    this.form = this.formBuilder.group({
      email: [''],

      senha: [''],
    })
  }
  //checagem de dados se bate com a conta padrão, se sim direciona para o home se não exibe mensagem de texto
  login() {
    if (
      this.form.get('email').value == this.emailDB &&
      this.form.get('senha').value == this.senhaDB
    ) {
      this.router.navigate(['home'])
    } else {
      this.mensagem = 'Usuário e/ou senha inválidos.'
    }
  }
}
