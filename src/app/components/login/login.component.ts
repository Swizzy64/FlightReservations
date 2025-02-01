import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { users } from './../../../assets/users.json';
import { Router } from '@angular/router';
import { FlightData } from '../../../services/domain/flightData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() flightData: FlightData | null = null;

  loginForm: FormGroup;
  usersList: any[] = [];

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.usersList = (users as any[]);
  }

  closeDialog() {
    this.loginForm.reset();
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  signIn() {
    if (this.loginForm.invalid) return;

    const { login, password } = this.loginForm.value;
    const user = this.usersList.find(u => u.email === login);

    if (user && user.password === password) {
      this.router.navigate(['/choose-seats'], { queryParams: this.flightData });
    } else {
      alert("Dane logowania są nieprawidłowe!");
    }
  }
}
