import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";
@Injectable({ providedIn: 'root' })
export class BasicService {

    constructor(private http: HttpClient) { }

    private readonly backendBaseUrl = environment.backendBaseUrl;

    validateUserName(username: string) {
        console.log(username);  
        return this.http.get(this.backendBaseUrl + 'validate-user-name', { params: { username: username } });
    }
}