import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  title!: string;
  description!: string;
  icon!: string;
  status!: string;
  statusIcon!:[];




  constructor(public dialog: MatDialog) { }

  openDialog(): Observable<any>{
    const dialogRef=this.dialog.open(DialogComponent,{
      data:{taskName:this.title, taskDescription: this.description, taskIcon: this.icon, taskStatus:this.status, taskStatusIcon: this.statusIcon}
    });
    return dialogRef.afterClosed();

  }

  openEditDialog(task: Task){
   
    const dialogRef=this.dialog.open(DialogComponent,{
      data:{ 
        taskName:task.title, taskDescription: task.detail, taskIcon: task.icon, taskStatus:task.status, taskStatusIcon: task.statusIcon}
    });
    return dialogRef.afterClosed();

  }





}
