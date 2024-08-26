// src/app/components/task-form/task-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { Task } from '../../models/task.model';

describe('TaskFormComponent', () => {
  let componente: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [FormsModule],
      // declarations: [TaskFormComponent]
      imports: [FormsModule, TaskFormComponent], // Importa el componente standalone aquí
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('emitir un evento taskSaved cuando se llame a saveTask', () => {
    spyOn(componente.taskSaved, 'emit');
    const tarea: Task = { id: 1, title: 'Nueva Tarea', description: 'Descripción de la tarea', completed: false };
    componente.task = tarea;
    componente.onSubmit();
    expect(componente.taskSaved.emit).toHaveBeenCalledWith(tarea);
  });

  it('reiniciar el formulario después de guardar la tarea', () => {
    componente.task = { id: 1, title: 'Prueba', description: 'Descripción de prueba', completed: false };
    componente.onSubmit();
    expect(componente.task).toEqual({ id: null, title: '', description: '', completed: false });
  });
});
