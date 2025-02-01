import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { users } from './../../../assets/users.json';
import { Router } from '@angular/router';
import { FlightData } from '../../../services/domain/flightData';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() flightData: FlightData | null = null;

  password: string = '';
  login: string = '';
  usersList: any[] = [];

  constructor(private router: Router){}

  ngOnInit(): void {
    this.usersList = (users as any[]);
  }

  closeDialog() {
    this.login = '';
    this.password = '';
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  signIn(){
    var user = this.usersList.find(x => x.email == this.login);
    if(user){
      if(user.password == this.password){
        const data = this.flightData;
        this.router.navigate(['/choose-seats'], { queryParams: data });
      }
      else{
        alert("Dane logowania są nieprawidłowe!");
      }
    }    
    else{
      alert("Dane logowania są nieprawidłowe!");
    }
  }
}
