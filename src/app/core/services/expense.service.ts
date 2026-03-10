import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn:'root'
})

export class ExpenseService {

api = "http://localhost:3000/api/expenses"

constructor(private http:HttpClient){}

createExpense(data:any):Observable<any>{
return this.http.post(this.api,data)
}

getExpenses(type: string):Observable<any>{
return this.http.get(this.api)
}

getExpensesByPeriod(period:string):Observable<any>{
return this.http.get(`${this.api}?period=${period}`)
}

deleteExpense(id:string):Observable<any>{
return this.http.delete(`${this.api}/${id}`)
}

updateExpense(id:string,data:any):Observable<any>{
return this.http.put(`${this.api}/${id}`,data)
}

}