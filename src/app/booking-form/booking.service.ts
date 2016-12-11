import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookingService {
    constructor(private http: Http) {}

    getBookingDetails(code, name): Promise<Object> {
        return this.http.get('/api/booking/' + code + '/' + name)
            .toPromise()
            .then(response => response.json())
            .catch(error => this.handleError(error))
    }

    handleError(error) {
        console.log(error);
    }
}
