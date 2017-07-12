import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
import { Company } from '../data-objects/company';
 
@Injectable()
export class CompanyService {
  private companyUrl = "http://localhost:3010/api/companies";  // URL to web API
 
  constructor (private http: Http) {}
 
  getHeroes(): Observable<Company[]> {
    console.log("SERVICE: getHeroes() START")
    return this.http.get(this.companyUrl)
                    .map(this.extractData)
                    .catch(this.handleError); 
  }

  addCompany(company: Company){
      console.log("NEW COMPANY WILL BE CREATED!")
      console.log("EMAIL:  "+company.email)
      console.log("USERNAME:  "+company.name)
      console.log("ADDRESS:  "+company.address)
      console.log("PASSWORD:  "+company.password)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
 
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}