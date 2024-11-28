import { Component, inject, OnInit,WritableSignal } from '@angular/core';
import { Task } from '../task';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { DialogComponent } from '../dialog/dialog.component';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {

  tasks$ = {} as WritableSignal<Task[]>;


  constructor(private taskService:TaskService, private dialogModalService:DialogService){}

  ngOnInit(): void {
    this.fetchTasks();
  }

  deleteTask(id: string): void{
    this.taskService.deleteTask(id).subscribe({
      next: () => this.fetchTasks(),
    });

  }

  private fetchTasks(): void{
    this.tasks$=this.taskService.tasks$;
    this.taskService.getTasks();

  }


  setTaskBgColor(task: Task){

    console.log(task.detail!="");

    if(task.status=="In Progress")
      return "#F5D565";
    else if(task.status=="Completed")
      return "#A0ECB1";
    else if(task.status=="Won't Do")
      return "#F7D4D3";
    else
    return "#E3E8EF";

  }

