import { Injectable } from '@angular/core';
import { FishName } from './fish-name';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FishService {
  private url = 'http://localhost:3000/fishes';

  constructor(private httpClient: HttpClient) {}

  getAllFishNames(): Observable<FishName[]> {
    return this.httpClient.get<FishName[]>(this.url).pipe(
      map(fishNames => fishNames.reverse())
    );
  }

  getFishNameById(id: string): Observable<FishName> {
    return this.httpClient.get<FishName>(`${this.url}/${id}`);
  }

  editFishName(id: string, updatedFish: FishName): Observable<FishName> {
    return this.httpClient.put<FishName>(`${this.url}/${id}`, updatedFish);
  }

  deleteFishName(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
