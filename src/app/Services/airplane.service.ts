import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Airplane} from '../models/airplane.model';

@Injectable()
export class AirplaneService {
  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:5001/api/v1/airplanes';

  getAirplanes() {
    return this.http.get<Airplane[]>(this.baseUrl);
  }

  getAirplaneById(id: number) {
    return this.http.get<Airplane>(this.baseUrl + '/' + id);
  }

  createAirplane(user: Airplane) {
    return this.http.post(this.baseUrl, user);
  }

  updateAirplane(user: Airplane) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteAirplane(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
