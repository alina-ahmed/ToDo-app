import { Component, WritableSignal } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Task } from '../task';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {

  task = {} as WritableSignal<Task>;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id!){
      alert('No id provided!');
    }
    else{
      this.taskService.getTask(id!);
      this.task = this.taskService.task$;
    }

  }

  deleteTask(task: Task){
    console.log("In delete comp");
    this.taskService.deleteTask(task._id || '').subscribe({
      next:() => {
        this.router.navigate(['/']);
      },
      error:(error)=>{
        alert("Failed to delete task");
        console.log(error);
      },
    });

  }

}
