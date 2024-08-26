// src/app/components/task-item/task-item.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { Task } from '../../models/task.model';

describe('TaskItemComponent', () => {
  let componente: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent], // Importa el componente standalone aquí
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    componente = fixture.componentInstance;
    componente.task = { id: 1, title: 'Tarea de prueba', description: 'Descripción de prueba', completed: false }; // Inicializar task
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería emitir un evento de edición cuando se haga clic en el botón de editar', () => {
    spyOn(componente.taskEdited, 'emit');
    const tarea: Task = { id: 1, title: 'Tarea de prueba', description: 'Descripción de prueba', completed: false };
    componente.editTask(tarea);
    expect(componente.taskEdited.emit).toHaveBeenCalledWith(tarea);
  });

  it('debería emitir un evento de eliminación cuando se haga clic en el botón de eliminar', () => {
    spyOn(componente.taskDeleted, 'emit');
    const tareaId = 1;
    componente.deleteTask(tareaId);
    expect(componente.taskDeleted.emit).toHaveBeenCalledWith(tareaId);
  });

  it('debería alternar el estado de completado de la tarea', () => {
    const tarea: Task = { id: 1, title: 'Tarea de prueba', description: 'Descripción de prueba', completed: false };
    componente.task = tarea;
    componente.toggleCompleteTask(tarea);
    expect(componente.task.completed).toBe(true); // Verifica el cambio en el estado de completado
  });
});
