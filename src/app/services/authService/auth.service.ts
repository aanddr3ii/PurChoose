import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
