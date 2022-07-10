import { Component, OnInit } from '@angular/core';
import { MatSelectionList } from '@angular/material/list'
import { TodoItem } from '../shared/models/todo-item';

@Component({
  selector: 'app-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.scss']
})
export class TodoEditorComponent implements OnInit {

  todoItems : TodoItem[] = [
    new TodoItem({
      id : 0,
      title: 'item 1',
      checked : false
    }),
    new TodoItem({
      id : 1,
      title: 'item 2',
      checked : true
    })
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
