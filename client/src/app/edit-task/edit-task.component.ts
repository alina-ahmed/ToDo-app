import { Component, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {

  task = {} as WritableSignal<Task>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(!id){
      alert('No id provided');
    }

    this.taskService.getTask(id!);
    this.task = this.taskService.task$;
  }

  editTask(task: Task){
    this.taskService.updateTask(this.task()._id || '', task)
    .subscribe({
      next: () =>{
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to update task');
        console.error(error);
      },
    });
  }

}
