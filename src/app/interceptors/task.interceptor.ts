// src/app/interceptors/task.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpEvent, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from '../models/task.model';

// Función para obtener tareas desde el localStorage
const getTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

// Función para guardar tareas en el localStorage
const saveTasksToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const taskInterceptor: HttpInterceptorFn = (req, next) => {
  const tasks = getTasksFromLocalStorage(); // Obtener tareas del localStorage

  // Simula la respuesta para la solicitud GET /tasks
  if (req.method === 'GET' && req.url.includes('/tasks')) {
    return of(new HttpResponse({
      status: 200,
      body: tasks,
    })).pipe(
      delay(500)  // Simula un pequeño retraso para imitar el tiempo de respuesta del servidor
    );
  }

  // Simula la respuesta para la solicitud POST /tasks
  if (req.method === 'POST' && req.url.includes('/tasks')) {
    const newTask = req.body as any;
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    saveTasksToLocalStorage(tasks); // Guardar tareas actualizadas en el localStorage
    return of(new HttpResponse({
      status: 201,
      body: newTask,
    })).pipe(
      delay(500)
    );
  }

  // Simula la respuesta para la solicitud PUT /tasks/{id}
  if (req.method === 'PUT' && req.url.includes('/tasks')) {
    const updatedTask = req.body as any;
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex > -1) {
      tasks[taskIndex] = updatedTask;
      saveTasksToLocalStorage(tasks); // Guardar tareas actualizadas en el localStorage
      return of(new HttpResponse({
        status: 200,
        body: updatedTask,
      })).pipe(
        delay(500)
      );
    } else {
      return of(new HttpResponse({
        status: 404,
        body: { error: 'Task not found' },
      })).pipe(
        delay(500)
      );
    }
  }

  // Simula la respuesta para la solicitud DELETE /tasks/{id}
  if (req.method === 'DELETE' && req.url.includes('/tasks')) {
    const taskId = parseInt(req.url.split('/').pop() || '0', 10);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
      saveTasksToLocalStorage(tasks); // Guardar tareas actualizadas en el localStorage
      return of(new HttpResponse({
        status: 200,
        body: { message: 'Task deleted' },
      })).pipe(
        delay(500)
      );
    } else {
      return of(new HttpResponse({
        status: 404,
        body: { error: 'Task not found' },
      })).pipe(
        delay(500)
      );
    }
  }

  // Pasar la solicitud al siguiente interceptor (o al backend real)
  return next(req);
};
