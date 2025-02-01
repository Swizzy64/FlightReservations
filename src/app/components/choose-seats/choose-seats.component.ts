import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plane, SummaryInfo } from '../../../services/domain/flightData';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-choose-seats',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './choose-seats.component.html',
  styleUrl: './choose-seats.component.scss'
})
export class ChooseSeatsComponent implements OnInit {
  sourceCity!: string;
  destinationCity!: string;
  passengers: number = 0;
  date!: string;
  plane!: Plane;
  seatRows: string[][] = [];
  selectedSeats: { [key: string]: boolean } = {};
  summary!: SummaryInfo;
  cabinBaggage: number = 0;
  registeredBaggage: number = 0;
  baggageOptions: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sourceCity = params["sourceCity"];
      this.destinationCity = params["destinationCity"];
      this.passengers = params["passengers"];
      this.date = params["date"];
      this.passengers = Number(params["passengers"]);
      this.baggageOptions = Array.from({ length: this.passengers + 1 }, (_, i) => i);
      if(this.destinationCity == "Gdańsk"){
        this.plane = Plane.SMALL;
        this.generateSeats(16);
      }
      else if(this.destinationCity == "Paris"){
        this.plane = Plane.MEDIUM;
        this.generateSeats(36);
      }
      else if(this.destinationCity == "New York"){
        this.plane = Plane.BIG;
        this.generateSeats(44);
      }
    });
  }

  generateSeats(count: number): void {
    this.seatRows = [];
    this.selectedSeats = {};

    const seats = Array.from({ length: count }, (_, i) => `M${i + 1}`);

    for (let i = 0; i < count; i += 4) {
      this.seatRows.push(seats.slice(i, i + 4));
    }
  }

  getSelectedSeats() {
    return Object.keys(this.selectedSeats)
      .filter(seat => this.selectedSeats[seat]);
  }

  confirmSeats(){
    var seats = this.getSelectedSeats();
    if(seats.length > this.passengers){
      alert("Wybrana ilość miejsc jest większa od liczby pasażerów!")
    }
    else if(seats.length < this.passengers){
      alert("Wybrana ilość miejsc jest mniejsza od liczby pasażerów!")
    }
    else{
      this.summary = {
        sourceCity: this.sourceCity,
        destinationCity: this.destinationCity,
        passengers: this.passengers,
        date: this.date,
        seats: seats
      } as SummaryInfo;
      const data = this.summary;
      this.router.navigate(['/summary'], { queryParams: data })
    }
  }
}