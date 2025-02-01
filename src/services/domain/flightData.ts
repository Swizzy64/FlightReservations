export interface FlightData {
    sourceCity: string;    
    destinationCity: string;
    passengers: number;
    date: string;
}

export interface SummaryInfo{
    sourceCity: string;    
    destinationCity: string;
    passengers: number;
    date: string;
    seats: string[];
}

export enum Plane {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    BIG = 'BIG'
}