// import { Injectable } from '@angular/core';
// import { Task } from './task';
// import { TASKS } from './mock-tasks';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {

//   constructor() { }

//   getTasks(): Task[]{
//     return TASKS;
//   }

//   getCurrentTask(specificTask: Task){
//     let currentTask=TASKS.filter((task)=> task.title === specificTask.title);
//     return currentTask;
//   }

//   addTask(newTask: Task){
//     TASKS.push(newTask);
//     console.log(TASKS);
//   }

//   deleteTask(task:Task){
//     const index: number = TASKS.indexOf(task);

    
//   }



// }


import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:5200';
  tasks$ = signal<Task[]>([]);
  task$ = signal<Task>({} as Task);
  
  constructor(private httpClient: HttpClient) { }

  private refreshTasks() {
    this.httpClient.get<Task[]>(`${this.url}/tasks`)
      .subscribe(tasks => {
        this.tasks$.set(tasks);
      });
  }

  getTasks() {
    this.refreshTasks();
    return this.tasks$();
  }

  getTask(id: string) {
    this.httpClient.get<Task>(`${this.url}/tasks/${id}`).subscribe(task => {
      this.task$.set(task);
      return this.task$();
    });
  }

  createTask(task: Task) {
    console.log("In create task");
    console.log(task);
    return this.httpClient.post(`${this.url}/tasks`, task, { responseType: 'text' });
  }

  updateTask(id: string, task: Task) {
    return this.httpClient.put(`${this.url}/tasks/${id}`, task, { responseType: 'text' });
  }

  deleteTask(id: string) {
    return this.httpClient.delete(`${this.url}/tasks/${id}`, { responseType: 'text' });
  }
}
