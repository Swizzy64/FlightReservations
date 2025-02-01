import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { WeatherService } from '../../../services/weatherService';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [TableModule, CommonModule, DropdownModule, FormsModule, ButtonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  sourceCity!: string;
  destinationCity!: string;
  passengers: number = 0;
  date!: Date;
  seats!: string[];
  temperature: string = '';
  weatherIcon: string = '';
  ticketPrice: number = 0;
  ticketShowPrice: string = '';
  currency: number = 1;
  isDateValid: boolean = false;
  currencyList = [
    { label: 'PLN', value: 1 },
    { label: 'EURO', value: 4.20 },
    { label: 'USD', value: 4.02 }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private weatherService: WeatherService){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sourceCity = params["sourceCity"];
      this.destinationCity = params["destinationCity"];
      this.date = new Date(params["date"]);
      this.seats = params["seats"];
      this.getWeather(this.destinationCity);
      this.ticketPrice = this.mapTicketPrice();
      this.ticketShowPrice = this.ticketPrice.toFixed(2);
    });
  }

  getWeather(city: string){
    var today = new Date();
    var marginDate = new Date(today);
    marginDate.setDate(today.getDate() + 14);

    if(this.date <= marginDate){
      this.isDateValid = true;
      this.weatherService.getWeather(city).subscribe((result) => {
        this.temperature = result.current.temp_c;
        this.weatherIcon = result.current.condition.icon;
      });
    }     
  }

  mapTicketPrice(): number {
    if(this.sourceCity == "Warszawa"){
      if(this.destinationCity == "Gdańsk"){
        return 180;
      }
      if(this.destinationCity == "Paris"){
        return 498
      }
      if(this.destinationCity == "New York"){
        return 2499
      }
    }
    else if(this.sourceCity == "Wrocław"){
      if(this.destinationCity == "Gdańsk"){
        return 200;
      }
      if(this.destinationCity == "Paris"){
        return 670;
      }
      if(this.destinationCity == "New York"){
        return 2200;
      }
    }
    else if(this.sourceCity == "Katowice"){
      if(this.destinationCity == "Gdańsk"){
        return 195;
      }
      if(this.destinationCity == "Paris"){
        return 330;
      }
      if(this.destinationCity == "New York"){
        return 2210;
      }
    }
    
    return 0;
  }

  changeCurrency(){
    this.ticketShowPrice = (this.ticketPrice / this.currency).toFixed(2);;
  }

  goToMain(){
    this.router.navigate(['/']);
  }
}