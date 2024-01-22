import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FishNameComponent } from '../fish-name/fish-name.component';
import { FishName } from '../fish-name';
import { FishService } from '../fish.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fish',
  standalone: true,
  imports: [CommonModule, FishNameComponent, RouterModule],
  template: `
    <section class='container'>
      <form class='search-form'>
        <input type='text' placeholder='Search by name' class='search-input' #filter>
        <button class='home-button' type='button' (click)='filterResults(filter.value)'>Search</button>
        <button *ngIf='showAllButtonVisible' class='home-button' type='button' (click)='showAllFishes()'>Show all</button>      
      </form>
      <p class='create-post' [routerLink]="['/create-a-post']">Create a post</p>
    </section>
    <section class='results'>
      <app-fish-name *ngFor='let fishName of paginatedFishList' [fishName]='fishName'></app-fish-name>
    </section>
    <div *ngIf='fishNameList.length > 1' class='pagination-buttons'>
      <button *ngIf='currentPage > 1' (click)='previousPage()' [disabled]='currentPage === 1' class='pagination-button'>Previous</button>
      <p>Page {{ currentPage }} of {{ totalPages }}</p>
      <button *ngIf='currentPage < totalPages' (click)='nextPage()' [disabled]='currentPage === totalPages' class='pagination-button'>Next</button>
    </div>
  `,
  styleUrls: ['./fish.component.css']
})
export class FishComponent implements OnInit {
  fishNameList: FishName[] = [];
  filteredFishList: FishName[] = [];
  paginatedFishList: FishName[] = [];
  showAllButtonVisible = false;

  pageSize: number = 8;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private fishService: FishService) {}

  ngOnInit(): void {
    this.fishService.getAllFishNames().subscribe(
      (fishNameList) => {
        this.fishNameList = fishNameList;
        this.filterResults('');
      },
      (error) => {
        console.error('Error fetching fish names', error);
      }
    );
  }

  filterResults(text: string) {
    const searchText = text.trim().toLowerCase();

    if (!searchText) {
      this.filteredFishList = this.fishNameList;
      this.showAllButtonVisible = false;
    } else {
      this.filteredFishList = this.fishNameList.filter(
        fishName => fishName?.name.toLowerCase().includes(searchText)
      );
      this.showAllButtonVisible = true;
    }

    this.totalPages = Math.ceil(this.filteredFishList.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedFishList();
  }

  showAllFishes() {
    this.filteredFishList = this.fishNameList;
    this.showAllButtonVisible = false;

    const filterInput = document.querySelector('.search-input') as HTMLInputElement;
    if (filterInput) {
      filterInput.value = '';
    }

    this.totalPages = Math.ceil(this.filteredFishList.length / this.pageSize);
    this.currentPage = 1;
    this.updatePaginatedFishList();
  }

  updatePaginatedFishList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredFishList.length);
    this.paginatedFishList = this.filteredFishList.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedFishList();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedFishList();
    }
  }
}
