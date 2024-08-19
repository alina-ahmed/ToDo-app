import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { DialogComponent } from './dialog/dialog.component';

export const routes: Routes = [
    {
        path: '',
        component: TaskComponent,
        title: 'Task List',
    },
    {
        path: 'new',
        component: AddTaskComponent,
    },
    {
        path: 'edit/:id',
        component: EditTaskComponent,
    }
];
