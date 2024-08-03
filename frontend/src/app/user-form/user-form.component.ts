import { Component, OnInit } from '@angular/core';
import { GetPredictionService } from '../get-prediction.service'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{
  form!: FormGroup;

  constructor(private service: GetPredictionService, private formBuilder: FormBuilder, private http:HttpClient) {}

  ngOnInit(){
    this.form = this.formBuilder.group({
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      housing_median_age: ['', Validators.required],
      total_rooms: ['', Validators.required],
      total_bedrooms: ['', Validators.required],
      population: ['', Validators.required],
      households: ['', Validators.required],
      median_income: ['', Validators.required],
      ocean_proximity: ['NEAR BAY', Validators.required] // Default value
    });
  }
  

  getPrediction(){
    // return this.service.getPrediction()
    let url = 'http://127.0.0.1:8000/predict_house_price'
    let params = {
      "longitude": -115.73,
      "latitude": 33.35,
      "housing_median_age": 23.0,
      "total_rooms": 1586.0,
      "total_bedrooms": 448.0,
      "population": 338.0,
      "households": 182.0,
      "median_income": 1.2132,
      "ocean_proximity": "INLANDD"
    }
     
    return this.http.get(url, {params}).subscribe((response:any) => {console.log(response)}, (error:any) => {console.log("error")})
    
  }
}
