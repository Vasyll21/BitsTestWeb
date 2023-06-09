import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { EmployeeToSend } from '../models/employee-to-send';

const baseURL = 'http://localhost:65107/api/Employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(baseURL).pipe(
      catchError(this.errorHandler)
    );
  }

  read(id:any): Observable<Employee> {
    return this.httpClient.get<Employee>(`${baseURL}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  update(id:string, data:EmployeeToSend): Observable<Employee> {
    return this.httpClient.put<Employee>(`${baseURL}/${id}`, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id:string): Observable<Employee> {
    return this.httpClient.delete<Employee>(`${baseURL}/${id}`, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  uploadFile(data:FormData): Observable<Employee[]> {
    return this.httpClient.post<Employee[]>(`${baseURL}`, data, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
