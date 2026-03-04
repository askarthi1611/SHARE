import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../../features/blog/blog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private api = 'http://localhost:3000/api/blogs';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.api);
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.api}/${id}`);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.api, blog);
  }

  updateBlog(id: string, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.api}/${id}`, blog);
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  likeBlog(id: string) {
    return this.http.put(`${this.api}/like/${id}`, {});
  }

  viewBlog(id: string) {
    return this.http.put(`${this.api}/view/${id}`, {});
  }
}