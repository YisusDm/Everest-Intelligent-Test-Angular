// src/app/components/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, TaskFormComponent, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterStatus: string = 'all';
  editingTask: Task = { id: null, completed: false, description: '', title: ''}; // Variable para manejar la tarea que se está editando

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.filterTasks(this.filterStatus);
    });
  }

  onTaskSaved(task: Task): void {
    if (task.id) {
      // Update existing task
      this.taskService.updateTask(task).subscribe(() => {
        this.loadTasks();
        this.editingTask = { id: null, completed: false, description: '', title: ''}; // Limpiar la tarea en edición después de guardar
      });
    } else {
      // Create new task
      this.taskService.createTask(task).subscribe(() => {
        this.loadTasks();
        this.editingTask = { id: null, completed: false, description: '', title: ''}; // Limpiar la tarea en edición después de guardar
      });
    }
  }

  onEditTask(task: Task): void {
    this.editingTask = { ...task }; // Crear una copia de la tarea para editar
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  filterTasks(status: string): void {
    this.filterStatus = status;
    if (status === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (status === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    } else {
      this.filteredTasks = this.tasks;
    }
  }
}
