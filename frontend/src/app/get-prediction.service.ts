import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GetPredictionService {

  constructor(private http: HttpClient) {}

  getPrediction(params: any): Observable<any> {
    let url = 'http://127.0.0.1:8000/predict_house_price'
    // let params = {
    //   "longitude": -115.73,
    //   "latitude": 33.35,
    //   "housing_median_age": 23.0,
    //   "total_rooms": 1586.0,
    //   "total_bedrooms": 448.0,
    //   "population": 338.0,
    //   "households": 182.0,
    //   "median_income": 1.2132,
    //   "ocean_proximity": "INLAND"
    // } 
    return this.http.post(url, params)
  }
}
