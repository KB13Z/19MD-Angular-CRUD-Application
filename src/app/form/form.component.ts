import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FishName } from '../fish-name';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <section class='form-container'>
      <form class='form-wrapper' (ngSubmit)="onSubmit()" [formGroup]="applyForm">
        <h2 class='form-heading'>Create a post</h2>
        <div class='input-wrapper'>
          <label>Add URL of photo:</label>
          <input type='text' formControlName='photo'>
          <div *ngIf="applyForm.get('photo')?.hasError('required') && applyForm.get('photo')?.touched && (submitted && applyForm.invalid)" class="error-message">
            Photo URL is required.
          </div>
          <div *ngIf="applyForm.get('photo')?.hasError('pattern') && applyForm.get('photo')?.touched && (submitted && applyForm.invalid)" class="error-message">
            Please enter a valid URL starting with 'http://' or 'https://'.
          </div>
        </div>
        <div class='input-wrapper'>
          <label>Add name of the fish:</label>
          <input type='text' formControlName='name'>
          <div *ngIf="applyForm.get('name')?.hasError('required') && applyForm.get('name')?.touched && (submitted && applyForm.invalid)" class="error-message">
            Fish name is required.
          </div>
          <div *ngIf="applyForm.get('name')?.hasError('minlength') && applyForm.get('name')?.touched" class="error-message">
            Name must be at least {{ applyForm.get('name')?.errors?.['minlength'].requiredLength }} characters long.
          </div>
          <div *ngIf="applyForm.get('name')?.hasError('maxlength') && applyForm.get('name')?.touched" class="error-message">
            Name cannot exceed {{ applyForm.get('name')?.errors?.['maxlength'].requiredLength }} characters.
          </div>
        </div>
        <div class='input-wrapper'>
          <label>Add name of species:</label>
          <input type='text' formControlName='species'>
          <div *ngIf="applyForm.get('species')?.hasError('required') && applyForm.get('species')?.touched && (submitted && applyForm.invalid)" class="error-message">
            Species name is required.
          </div>
          <div *ngIf="applyForm.get('species')?.hasError('minlength') && applyForm.get('species')?.touched" class="error-message">
            Species name must be at least {{ applyForm.get('species')?.errors?.['minlength'].requiredLength }} characters long.
          </div>
          <div *ngIf="applyForm.get('species')?.hasError('maxlength') && applyForm.get('species')?.touched" class="error-message">
            Species name cannot exceed {{ applyForm.get('species')?.errors?.['maxlength'].requiredLength }} characters.
          </div>
        </div>
        <div class='input-wrapper'>
          <label>Add color:</label>
          <input type='text' formControlName='color'>
          <div *ngIf="applyForm.get('color')?.hasError('required') && applyForm.get('color')?.touched && (submitted && applyForm.invalid)" class="error-message">
            Color is required.
          </div>
          <div *ngIf="applyForm.get('color')?.hasError('minlength') && applyForm.get('color')?.touched" class="error-message">
            Color must be at least {{ applyForm.get('color')?.errors?.['minlength'].requiredLength }} characters long.
          </div>
          <div *ngIf="applyForm.get('color')?.hasError('maxlength') && applyForm.get('color')?.touched" class="error-message">
            Color cannot exceed {{ applyForm.get('color')?.errors?.['maxlength'].requiredLength }} characters.
          </div>
        </div>
        <div class='input-wrapper'>
          <label>Add size:</label>
          <input type='text' formControlName='size'>
          <div *ngIf="applyForm.get('size')?.hasError('required') && applyForm.get('size')?.touched && (submitted && applyForm.invalid)" class="error-message">
            Size is required.
          </div>
          <div *ngIf="applyForm.get('size')?.hasError('minlength') && applyForm.get('size')?.touched" class="error-message">
            Size must be at least {{ applyForm.get('size')?.errors?.['minlength'].requiredLength }} characters long.
          </div>
          <div *ngIf="applyForm.get('size')?.hasError('maxlength') && applyForm.get('size')?.touched" class="error-message">
            Size cannot exceed {{ applyForm.get('size')?.errors?.['maxlength'].requiredLength }} characters.
          </div>
        </div>
        <div class='input-wrapper'>
          <label>Add location:</label>
          <input type='text' formControlName='location'>
          <div *ngIf="applyForm.get('location')?.hasError('required') && applyForm.get('location')?.touched && (submitted && applyForm.invalid)" class="error-message">
            Location is required.
          </div>
          <div *ngIf="applyForm.get('location')?.hasError('minlength') && applyForm.get('location')?.touched" class="error-message">
            Location must be at least {{ applyForm.get('location')?.errors?.['minlength'].requiredLength }} characters long.
          </div>
          <div *ngIf="applyForm.get('location')?.hasError('maxlength') && applyForm.get('location')?.touched" class="error-message">
            Location cannot exceed {{ applyForm.get('location')?.errors?.['maxlength'].requiredLength }} characters.
          </div>
        </div>
        <div class='form-buttons'>
          <button type='button' class='form-button' (click)="preview()">Preview</button>
          <button type='submit' class='form-button'>Submit</button>
        </div>
        <div *ngIf="postSubmitted" class="success-message">
          Post submitted successfully!
        </div>
        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
      <div *ngIf="showPreview" class="post-preview">
        <h3 class="preview-title">Preview</h3>
        <img [src]="applyForm.value.photo" alt="Preview image" class="preview-image" />
        <section class="preview-description">
          <h3 class="preview-name">{{ applyForm.value.name }}</h3>
          <p class="preview-species">{{ applyForm.value.species }}</p>
        </section>
        <section>
          <h3 class="preview-features">Features:</h3>
          <ul class="preview-list">
            <li class="preview-feature">
              <p class="feature-name">Color:</p>
              <p>{{ applyForm.value.color }}</p>
            </li>
            <li class="preview-feature">
              <p class="feature-name">Size:</p>
              <p>{{ applyForm.value.size }}</p>
            </li>
            <li class="preview-feature">
              <p class="feature-name">Location:</p>
              <p>{{ applyForm.value.location }}</p>
            </li>
          </ul>
        </section>
      </div>
    </section>
  `,
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  applyForm = new FormGroup({
    photo: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^https?:\/\/.+/)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    species: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    color: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    size: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100)
    ]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100)
    ]),
  });

  showPreview = false;
  postSubmitted = false;
  submitted = false;
  errorMessage: string | null = null;

  preview() {
      this.showPreview = true;
  };

  constructor(private httpClient: HttpClient) {
    const savedFormData = localStorage.getItem('fishFormData');
    if (savedFormData) {
      this.applyForm.patchValue(JSON.parse(savedFormData));
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.applyForm.valid) {
      this.httpClient.post('http://localhost:3000/fishes', this.applyForm.value).subscribe(response => {
        console.log('Form data saved successfully:', response);

        this.applyForm.reset();
        this.showPreview = false;
        this.postSubmitted = true;

        setTimeout(() => {
          this.postSubmitted = false;
          this.submitted = false;
        }, 3000);

        localStorage.setItem('fishFormData', JSON.stringify(this.applyForm.value));
      },
      error => {
        console.error('Error submitting form:', error);
        this.postSubmitted = false;
        this.submitted = false;
        this.errorMessage = 'Error: Something went wrong';
      });
    } else {
      Object.values(this.applyForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
