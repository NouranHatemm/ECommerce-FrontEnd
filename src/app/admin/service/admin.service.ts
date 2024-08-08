import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { environment } from 'src/environments/environments';

const BASIC_URL = environment.BASIC_URL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient ,private UserStorageService:UserStorageService) { }

  addCategory(categoryDto:any): Observable<any>{
    // http://localhost:8080/api/admin/category
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader(),
    } )
  }

  getAllCategories(): Observable<any>{
    return this.http.get(BASIC_URL + 'api/admin',{
      headers: this.createAuthorizationHeader(),
    })
  }

  addProduct(productDto:any): Observable<any>{
    return this.http.post(BASIC_URL + 'api/admin/product', productDto, {
      headers: this.createAuthorizationHeader(),
    } )
  }

  updateProduct(productId:any, productDto:any): Observable<any>{
  return this.http.post(BASIC_URL + `api/admin/product/${productId}`, productDto, {
    headers: this.createAuthorizationHeader(),
  } )
 }

  getAllProducts(): Observable<any>{
      return this.http.get(BASIC_URL + 'api/admin/products',{
      headers: this.createAuthorizationHeader(),
    })
  }

  getProductById(productId): Observable<any>{
    return this.http.get(BASIC_URL + `api/admin/product/${productId}`,{
    headers: this.createAuthorizationHeader(),
  })
}

  getAllProductsByName(name:any): Observable<any>{
    return this.http.get(BASIC_URL + `api/admin/search/${name}`,{
      headers: this.createAuthorizationHeader(),
    })
  }

  deleteProduct(productId:any): Observable<any>{
    return this.http.delete(BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }
 
   
  getPlacedOrders(): Observable<any>{
    return this.http.get(BASIC_URL + 'api/admin/placedOrders', {
      headers: this.createAuthorizationHeader(),
    })
  }

  postFAQ(productId: number, faqDto: any): Observable<any>{
    return this.http.post(BASIC_URL + `api/admin/faq/${productId}`, faqDto,{
      headers: this.createAuthorizationHeader()
    } )
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization',  this.UserStorageService.getToken()
    )
    
  }

}