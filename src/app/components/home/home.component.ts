import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { WeatherService } from './../../../services/weatherService';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from './../../components/login/login.component';
import { FlightData } from '../../../services/domain/flightData';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, CalendarModule, FormsModule, CommonModule, DropdownModule, InputNumberModule, DialogModule, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  visible: boolean = true;
  showDialog: boolean = false;
  currentDate: string = '';
  selectedDate: Date | null = null;
  passengers: number = 0;
  temperature: string = '';
  weatherIcon: string = '';
  flightData: FlightData;
  minDate!: Date;

  sourceCities = [
    { label: 'Warszawa', value: 'Warszawa' },
    { label: 'Katowice', value: 'Katowice' },
    { label: 'Wrocław', value: 'Wrocław' }
  ];

  destinationCities = [
    { label: 'Gdańsk', value: 'Gdańsk' },
    { label: 'Paryż', value: 'Paris' },
    { label: 'Nowy York', value: 'New York' }
  ];

  selectedSourceCity: any = null;
  selectedDestinationCity: any = null;
  constructor(private weatherService: WeatherService){
    this.minDate = new Date();
    this.flightData = {
      sourceCity: '',
      destinationCity: '',
      date: '',
      passengers: 0
    } as FlightData;
  }

  ngOnInit() {
    this.getWeather('Warszawa');    
    this.updateDate();
  }

  updateDate() {
    const now = new Date();
    this.currentDate = now.toLocaleString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric', 
      minute: 'numeric',
      hour12: false, 
    });
  }

  changeSourceCity(){
      this.getWeather(this.selectedSourceCity);
  }

  getWeather(city: string){
    this.weatherService.getWeather(city).subscribe((result) => {
      this.temperature = result.current.temp_c;
      this.weatherIcon = result.current.condition.icon;
    }); 
  }

  openDialog() {
    if(this.selectedDate != null && this.selectedSourceCity != null && this.selectedDestinationCity != null && this.passengers > 0){
      this.flightData!.date = this.selectedDate!.toString();
      this.flightData!.sourceCity = this.selectedSourceCity!.toString();
      this.flightData!.destinationCity = this.selectedDestinationCity!.toString();
      this.flightData!.passengers = this.passengers!;
      this.showDialog = true;
    }    
    else{
      alert("Proszę wypełnić wszystkie pola!")
    }
  }
}
