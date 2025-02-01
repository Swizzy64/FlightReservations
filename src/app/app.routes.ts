import { Routes } from '@angular/router';
import { ChooseSeatsComponent } from './components/choose-seats/choose-seats.component';
import { HomeComponent } from './components/home/home.component';
import { SummaryComponent } from './components/summary/summary.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'choose-seats', component: ChooseSeatsComponent },
    { path: 'summary', component: SummaryComponent }
];
