import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BookingDetails } from './booking-details.interface';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class BookingService {
    constructor(private http: Http) {}

    getBookingDetails(code, name): Promise<Object> {
        return this.http.get('/api/booking/' + code + '/' + name)
            .toPromise()
            .then(response => response.json())
            .then(bookingDetails => this.transformDetails(bookingDetails) as BookingDetails);
    }

    transformDetails(b) {
        const connection = b.itinerary.connections[0];
        const passenger = b.passengers;
        const flightDetails = connection.segments[0].marketingFlight.operatingFlight;

        return {
            origin: connection.origin.IATACode,
            destination: connection.destination.IATACode,
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            title: passenger.title.name,
            flight: flightDetails.number,
            gate: null,
            boarding: flightDetails.localCheckInStart,
            seat: flightDetails.cabin.code,
            cabin: flightDetails.cabin.name,
            departs: flightDetails.localScheduledDeparture
        }
    }
}
