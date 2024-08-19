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

//   newTaskDesc = '';
//   finishedTasks: Task[]=[];
//  taskToBeDeleted: Task | undefined;

//    tasks: Task[] = [];

//    someTask!:{
//     taskName:string,
//     taskDescription: string,
//     taskStatus:string,
//     taskIcon: string,
//     taskStatusIcon: [
//         string,string]
// };


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

  // readonly dialog = inject(MatDialog);

  // openDialog() {

  // this.dialogModalService.openDialog().subscribe(data=>{
  
  //   // this.addTasks(data);

  // });


  // }

  // openEditDialog(task: Task){
  //   this.dialogModalService.openEditDialog(task);

  // }

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




  // getTasks():void{
  //   this.tasks=this.taskService.getTasks();
  // }

  // addTasks(data: any):void{
  
  //   let newTask : Task;

  //    newTask = {
  //     "title": data.value.taskName,
  //     "description": data.value.taskDescription,
  //     "status":data.value.taskStatus,
  //     "icon": data.value.taskIcon,
  //     "statusIcon": data.value.taskStatusIcon
  //   };


  //     // this.taskService.addTask(newTask);

  
  // }


  // deleteTask(task:Task){
  //   const index: number = this.tasks.indexOf(task);
  //   let completedTask: Task[];
  //   if (index !== -1) {
  //     completedTask=this.tasks.filter(element => element == task);
  //     this.tasks.splice(index, 1);

  //     console.log(completedTask);
  //     console.log(completedTask[0]);
  //     this.finishedTasks.push(completedTask[0]);
  //     console.log(this.finishedTasks);
        
  //   }  
  // }

}
