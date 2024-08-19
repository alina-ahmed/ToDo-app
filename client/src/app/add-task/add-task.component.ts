import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  constructor(
    private router: Router,
    private taskService: TaskService
  ){}

  addTask(task: Task){
    console.log("In add task");
    this.taskService.createTask(task).subscribe({
      next: () =>{
        this.router.navigate(['/']);
      },
      error:(error)=>{
        alert('Failed to create task');
        console.error(error);
      },
    });
    this.taskService.getTasks();
  }

}
