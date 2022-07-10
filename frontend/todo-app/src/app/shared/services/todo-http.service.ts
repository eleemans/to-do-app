import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoHttpService {
  constructor(private http: HttpClient) {  }

  getAll() {
    const result: Observable<TodoItem[]> = this.http.get<TodoItem[]>('https://ckxq4ku63i.execute-api.eu-central-1.amazonaws.com/prod/items');
    return result;
  }

  add(item: TodoItem){
    const result = this.http.post('https://ckxq4ku63i.execute-api.eu-central-1.amazonaws.com/prod/items', item);
    return result;
  }
}
