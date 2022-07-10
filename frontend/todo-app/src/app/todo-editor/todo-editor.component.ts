import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatSelectionList, MatListOption } from '@angular/material/list'
import { TodoItem } from '../shared/models/todo-item';
import { TodoHttpService } from '../shared/services/todo-http.service';

@Component({
  selector: 'app-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.scss']
})
export class TodoEditorComponent implements OnInit {

  todoItems: TodoItem[] = [
  ]

  selectedModels: string[] = [''];

  // Todo: replace with flux style pattern
  constructor(private todoHttp: TodoHttpService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadItems();
  }

  intercept(value: boolean, item: TodoItem) {
    console.log(value);
    console.log(item);

    // Cache value
    // do update using flux like pattern
    // check/uncheck based on result + toast on fail
  }

  loadItems() {
    const result = this.todoHttp.getAll();

    result.subscribe((x: TodoItem[]) => {
      console.log(x);
      this.todoItems = x;
      this.selectedModels = x.map(i => i.name);
      this.cdr.detectChanges();
    },
      error => {
        console.log(error);
      });

  }

  Post() {
    const result = this.todoHttp.add(new TodoItem({
      checked: false,
      name: "n00b erik",
      id: Math.floor(Math.random() * 420).toString()
    }));

    result.subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
