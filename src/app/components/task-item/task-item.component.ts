import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'] // Corregido 'styleUrl' a 'styleUrls'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskEdited = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<number>();

  editTask(task: Task): void {
    this.taskEdited.emit(task);
  }

  deleteTask(id: number): void { // Asegurarse de que id sea de tipo number
    if (id === null || id === undefined) return; // Verificar id correctamente
    this.taskDeleted.emit(id);
  }

  toggleCompleteTask(task: Task): void {
    task.completed = !task.completed;
    this.taskEdited.emit(task);
  }
}
