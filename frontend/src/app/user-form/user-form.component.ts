import { Component, OnInit } from '@angular/core';
import { GetPredictionService } from '../get-prediction.service'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{
  form!: FormGroup;
  formData: any = {};
  predictionResult: any = {'prediction': 0};

  constructor(private service: GetPredictionService, private formBuilder: FormBuilder) {}

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
    this.formData = this.form.value;

    if (this.form.valid){
      console.log('Extracted Form Data:', this.formData);
      this.service.getPrediction(this.formData).subscribe(
        (response: any) => {
          console.log(response);
          this.predictionResult = response;
        },
        (error: any) => {
          console.log("error", error);
        }
      );
    }else{
      console.log('form is invalid', this.formData);
    }
  }
}
