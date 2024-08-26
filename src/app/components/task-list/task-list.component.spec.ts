// src/app/components/task-list/task-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let componente: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let servicioTareas: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [HttpClientTestingModule],
      // declarations: [TaskListComponent],
      imports: [HttpClientTestingModule, TaskListComponent],
      providers: [TaskService]
    }).compileComponents();

    servicioTareas = TestBed.inject(TaskService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('cargar las tareas al inicializar', () => {
    const tareasMock: Task[] = [
      { id: 1, title: 'Tarea 1', description: 'Descripción 1', completed: false },
      { id: 2, title: 'Tarea 2', description: 'Descripción 2', completed: true }
    ];

    spyOn(servicioTareas, 'getTasks').and.returnValue(of(tareasMock));
    componente.ngOnInit();
    expect(componente.tasks).toEqual(tareasMock);
    expect(componente.filteredTasks).toEqual(tareasMock);
  });

  it('llamar al método filterTasks cuando se cambie el estado del filtro', () => {
    spyOn(componente, 'filterTasks');
    componente.filterStatus = 'completed';
    componente.filterTasks(componente.filterStatus);
    expect(componente.filterTasks).toHaveBeenCalledWith('completed');
  });

  it('actualizar una tarea cuando se llame a onTaskSaved', () => {
    const tarea: Task = { id: 1, title: 'Tarea Actualizada', description: 'Descripción Actualizada', completed: true };
    spyOn(servicioTareas, 'updateTask').and.returnValue(of(tarea));
    spyOn(componente, 'loadTasks');
    componente.onTaskSaved(tarea);
    expect(servicioTareas.updateTask).toHaveBeenCalledWith(tarea);
    expect(componente.loadTasks).toHaveBeenCalled();
  });
});
