import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FishService } from '../fish.service';
import { FishName } from '../fish-name';
import { DeletionService } from '../deletion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <main class='listing-container'>
    <button type='button' class='listing-button' (click)='goBack()'>← Go back</button>
    <h2 *ngIf="deletionSuccess" class="success-message">
      Post deleted successfully!
    </h2>
    <ng-container *ngIf="!editingMode; else editModeTemplate">
      <article *ngIf="!deletionSuccess && fishName" class='listing-post'>
        <img class='listing-photo' [src]='fishName.photo'>
        <section class='listing-description'>
          <h3 class='listing-heading'>{{fishName.name}}</h3>
          <p class='listing-species'>{{fishName.species}}</p>
        </section>
        <section class='listing-features'>
          <h3 class='section-heading'>Features:</h3>
          <ul class='section-list'>
            <li class='section-feature'>
              <p class='feature-name'>Color:</p> 
              <p>{{fishName.color}}</p>
            </li>
            <li class='section-feature'>
              <p class='feature-name'>Size:</p>
              <p>{{fishName.size}}</p>
            </li>
            <li class='section-feature'>
              <p class='feature-name'>Location:</p>
              <p>{{fishName.location}}</p>
            </li>
          </ul>
        </section>
        <p *ngIf='confirmingDeletion' class='deletion-text'>Are you sure you would like to delete this post?</p>
        <div class='buttons-wrapper'>
          <ng-container *ngIf='!confirmingDeletion'>
            <button type='button' class='details-button' (click)='editPost()'>Edit</button>
            <button type='button' class='details-button' (click)='confirmDeletion()'>Delete</button>
          </ng-container>
          <ng-container *ngIf='confirmingDeletion'>
            <button type='button' class='details-button' (click)='deleteFish()'>Confirm</button>
            <button type='button' class='details-button' (click)='cancelDeletion()'>Cancel</button>
          </ng-container>
        </div>
        <p *ngIf='cancelMessageVisible' class='cancel-message'>Post is not deleted!</p>
        <p *ngIf='cancelEditMessageVisible' class='cancel-message'>Changes are not made!</p>
        <p *ngIf='changesSavedMessageVisible' class='save-message'>Changes saved successfully!</p>
      </article>
    </ng-container>
    <ng-template #editModeTemplate>
      <form *ngIf='editingMode' [formGroup]='fishForm' (ngSubmit)='saveChanges()' class='form-wrapper'>
        <h3 class='edit-heading'>Edit post</h3>
        <div class='input-wrapper'>
          <label>Add URL of photo:</label>
          <input type='text' formControlName='photo'>
          <div *ngIf="fishForm.get('photo')?.hasError('required') && fishForm.get('photo')?.touched" class="error-message">
            Photo URL is required.
          </div>
          <div *ngIf="fishForm.get('photo')?.hasError('pattern') && fishForm.get('photo')?.touched" class="error-message">
            Please enter a valid URL starting with 'http://' or 'https://'.
          </div>
        </div>
        <div class='input-wrapper'>
          <label>Add name of the fish:</label>
          <input type='text' formControlName='name'>
          <div *ngIf="fishForm.get('name')?.hasError('required') && fishForm.get('name')?.touched" class="error-message">
            Fish name is required.
          </div>
          <div *ngIf="fishForm.get('name')?.hasError('minlength') && fishForm.get('name')?.touched" class="error-message">
            Name must be at least {{ fishForm.get('name')?.errors?.['minlength'].requiredLength }} characters long.
          </div>
          <div *ngIf="fishForm.get('name')?.hasError('maxlength') && fishForm.get('name')?.touched" class="error-message">
            Name cannot exceed {{ fishForm.get('name')?.errors?.['maxlength'].requiredLength }} characters.
          </div>
        </div>
        <div class='input-wrapper'>
          <label>Add name of species:</label>
          <input type='text' formControlName='species'>
          <div *ngIf="fishForm.get('species')?.hasError('required') && fishForm.get('species')?.touched" class="error-message">
            Species name is required.
          </div>
          <div *ngIf="fishForm.get('species')?.hasError('minlength') && fishForm.get('species')?.touched" class="error-message">
            Species name must be at least {{ fishForm.get('species')?.errors?.['minlength'].requiredLength }} characters long.
          </div>
          <div *ngIf="fishForm.get('species')?.hasError('maxlength') && fishForm.get('species')?.touched" class="error-message">
            Species name cannot exceed {{ fishForm.get('species')?.errors?.['maxlength'].requiredLength }} characters.
          </div>
        </div>
        <div class='input-wrapper'>
          <label>Add color:</label>
          <input type='text' formControlName='color'>
          <div *ngIf="fishForm.get('color')?.hasError('required') && fishForm.get('color')?.touched" class="error-message">
            Color is required.
          </div>
          <div *ngIf="fishForm.get('color')?.hasError('minlength') && fishForm.get('color')?.touched" class="error-message">
            Color must be at least {{ fishForm.get('color')?.errors?.['minlength'].requiredLength }} characters long.
          </div>
          <div *ngIf="fishForm.get('color')?.hasError('maxlength') && fishForm.get('color')?.touched" class="error-message">
            Color cannot exceed {{ fishForm.get('color')?.errors?.['maxlength'].requiredLength }} characters.
          </div>
        </div>
        <div class='input-wrapper'>
          <label>Add size:</label>
          <input type='text' formControlName='size'>
          <div *ngIf="fishForm.get('size')?.hasError('required') && fishForm.get('size')?.touched" class="error-message">
            Size is required.
          </div>
          <div *ngIf="fishForm.get('size')?.hasError('minlength') && fishForm.get('size')?.touched" class="error-message">
            Size must be at least {{ fishForm.get('color')?.errors?.['minlength'].requiredLength }} characters long.
          </div>
          <div *ngIf="fishForm.get('size')?.hasError('maxlength') && fishForm.get('size')?.touched" class="error-message">
            Size cannot exceed {{ fishForm.get('size')?.errors?.['maxlength'].requiredLength }} characters.
          </div>
        </div>
        <div class='input-wrapper'>
          <label>Add location:</label>
          <input type='text' formControlName='location'>
          <div *ngIf="fishForm.get('location')?.hasError('required') && fishForm.get('location')?.touched" class="error-message">
            Location is required.
          </div>
          <div *ngIf="fishForm.get('location')?.hasError('minlength') && fishForm.get('location')?.touched" class="error-message">
            Location must be at least {{ fishForm.get('location')?.errors?.['minlength'].requiredLength }} characters long.
          </div>
          <div *ngIf="fishForm.get('location')?.hasError('maxlength') && fishForm.get('location')?.touched" class="error-message">
            Location cannot exceed {{ fishForm.get('location')?.errors?.['maxlength'].requiredLength }} characters.
          </div>
        </div>
        <div class='buttons-wrapper'>
          <button type='submit' class='details-button'>Save changes</button>
          <button type='button' class='details-button' (click)='cancelEdit()'>Cancel</button>
        </div>
      </form>
    </ng-template>
  </main>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  fishName: FishName | undefined;
  deletionSuccess = false;
  private deletionSubscription: Subscription;
  confirmingDeletion = false;
  cancelMessageVisible = false;
  fishForm: FormGroup;
  editingMode = false;
  cancelEditMessageVisible = false;
  changesSavedMessageVisible = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private fishService: FishService, 
    private router: Router,
    private deletionService: DeletionService
  ) {
    this.deletionSubscription = this.deletionService.deletionSuccess$.subscribe(
      (deletionSuccess) => this.deletionSuccess = deletionSuccess
    );

    this.fishForm = new FormGroup({
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
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const fishNameId = params['id'];

      this.fishService.getFishNameById(fishNameId).subscribe(
        (fishName) => {
          this.fishName = fishName;
          this.fishForm.patchValue({
            photo: fishName.photo,
            name: fishName.name,
            species: fishName.species,
            color: fishName.color,
            size: fishName.size,
            location: fishName.location,
          });
        },
        (error) => {
          console.error('Error fetching fish details', error);
        }
      );
    });

    this.deletionSubscription = this.deletionService.deletionSuccess$.subscribe(
      (deletionSuccess) => {
        this.deletionSuccess = deletionSuccess;
        if (deletionSuccess) {
          this.errorMessage = null;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.deletionService.setDeletionSuccess(false);
    this.deletionSubscription.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  editPost() {
    this.editingMode = true;
  }

  confirmDeletion() {
    this.confirmingDeletion = true;
  }

  cancelDeletion() {
    this.confirmingDeletion = false;
    this.cancelMessageVisible = true;

    setTimeout(() => {
      this.cancelMessageVisible = false;
    }, 3000);
  }

  deleteFish() {
    if (this.fishName) {
      this.fishService.deleteFishName(this.fishName.id).subscribe(
        () => {
          this.deletionService.setDeletionSuccess(true);
        },
        (error) => {
          console.error('Error deleting fish', error);
          this.errorMessage = 'Error: Something went wrong';
        }
      );
    }
  }

  saveChanges() {
    if (this.fishName) {
      this.fishName = {
        ...this.fishName,
        ...this.fishForm.value
      };

      this.fishService.editFishName(this.fishName!.id, this.fishName!).subscribe(
        () => {
          this.editingMode = false;
          this.errorMessage = null;
        },
        (error) => {
          console.error('Error updating fish', error);
          this.errorMessage = 'Error: Something went wrong';
        }
      );
    } else {
      console.error('Cannot save changes. Fish details are undefined.');
    }

    this.changesSavedMessageVisible = true;

    setTimeout(() => {
      this.changesSavedMessageVisible = false;
    }, 3000);
  }

  cancelEdit() {
    this.editingMode = false;
    this.router.navigate(['/details', this.fishName?.id]);
    this.cancelEditMessageVisible = true;

    setTimeout(() => {
      this.cancelEditMessageVisible = false;
    }, 3000);
  }
}
