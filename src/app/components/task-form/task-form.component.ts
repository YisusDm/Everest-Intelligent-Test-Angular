// src/app/components/task-form/task-form.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],  // Importa FormsModule para el manejo de formularios
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Output() taskSaved = new EventEmitter<Task>();
  @Input() task: Task = { id: null, completed: false, description: '', title: ''};

  onSubmit() {
    if (!this.task) return;

    this.taskSaved.emit(this.task);
    this.task = { id: null, title: '', description: '', completed: false };  // Resetear el formulario después de guardar
  }
}
