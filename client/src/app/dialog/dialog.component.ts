import { ChangeDetectionStrategy, Component, effect, EventEmitter, Inject, inject, input, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../task';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog.component.html',
  styleUrl: './dialog.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule, MatCheckbox, MatLabel, MatFormFieldModule, MatInputModule, MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class DialogComponent {

  initialState = input<Task>();

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    effect(()=>{
      this.taskForm.setValue({
        title: this.initialState()?.title || '',
        detail: this.initialState()?.detail || '',
        status: this.initialState()?.status || '',
        icon: this.initialState()?.icon || '',
        statusIcon: this.initialState()?.statusIcon || null

      })
    })
  }


  @Output() formsValueChanged = new EventEmitter<Task>();

  @Output() formSubmitted = new EventEmitter<Task>();

  @Output() deletePressed = new EventEmitter<Task>();

  selectedImage : boolean[] = [
   false,
   false,
   false,
   false,
   false
  ];



  // @Input() newTask!: {
  //   taskName: string,
  //   taskDescription: string,
  //   taskStatus: string,
  //   taskIcon: string,
  //   taskStatusIcon: string[]
  // };


  taskForm = new FormGroup({
    title: new FormControl(''),
    detail: new FormControl(''),
    status: new FormControl(''),
    icon: new FormControl(''),
    statusIcon: new FormControl(['', '']),



  })


  // public ngOnInit(): void {

  //   this.newTask = {
  //     taskName: this.data.taskName,
  //     taskDescription: this.data.taskDescription,
  //     taskStatus: this.data.taskStatus,
  //     taskIcon: this.data.taskIcon,
  //     taskStatusIcon: this.data.taskStatusIcon
  //   };

  // }


  // ngOnChanges(changes: SimpleChanges): void {

  //   console.log("Changes:");
  //   console.log(changes['newTask']);

  //   if (changes['newTask'].currentValue) {
  //     this.taskForm.patchValue(this.newTask);
  //   }

  //   let currentTask : Task = {
  //     "title":this.newTask.taskName,
  //     "description": this.newTask.taskDescription,
  //     "status":this.newTask.taskStatus,
  //     "icon": this.newTask.taskIcon,
  //     "statusIcon": this.newTask.taskStatusIcon
  //   };

  //   this.taskSevice.addTask(currentTask);
  // }



  chooseStatus(value: any) {

    this.taskForm.controls.status.setValue(value);
    if (value == 'In Progress') {
      this.taskForm.controls.statusIcon.setValue(["../assets/Time_atack_duotone.svg", "#E9A23B"]);
    }
    else if (value == 'Completed') {
      this.taskForm.controls.statusIcon.setValue(["../assets/Done_round_duotone.svg", "#32D657"]);
    }
    else {
      this.taskForm.controls.statusIcon.setValue(["../assets/close_ring_duotone.svg", "#DD524C"]);
    }
  }



  // selectIcon(selectedIcon: HTMLImageElement) {

  //   // let currentIcon=selectedIcon;

  //   // currentIcon.style.backgroundColor = "#F5D565";
  //   // this.taskForm.controls.icon.setValue(currentIcon.src);

    

  // }

  selectIcon(index: number,content: HTMLImageElement){
    this.selectedImage[index]=!this.selectedImage[index];
    for (let i = 0; i < 5; i++) {
      if(i!=index){
        this.selectedImage[i]=false;

      }
    }
  this.taskForm.controls.icon.setValue(content.src);


  }


  // deleteTask(task: FormGroup){
  //   console.log(task.value);
  //   let currentTask : Task = {
  //     "title":task.value.taskName,
  //     "description": task.value.taskDescription,
  //     "status":task.value.taskStatus,
  //     "icon": task.value.taskIcon,
  //     "statusIcon": task.value.statusIcon
  //   };

    

    
  // }


  getTitle(){
    return this.taskForm.get('title');
  }

  getDescription(){
    return this.taskForm.get('description');
  }

  getStatus(){
    return this.taskForm.get('status');
  }

  getIcon(){
    return this.taskForm.get('icon');
  }

  getStatusIcon(){
    return this.taskForm.get('statusIcon');
  }

  submitForm(){
    console.log("Task submitted");
    console.log(this.taskForm.value as Task);

    this.formSubmitted.emit(this.taskForm.value as Task);
  }


  delete(){
    console.log("In delete");
    this.deletePressed.emit(this.taskForm.value as Task);
    console.log(this.taskForm.value as Task);

    const id = this.route.snapshot.paramMap.get('id');
    if(!id){
      alert('No id provided');
    }


    this.taskService.deleteTask(id || '').subscribe({
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
