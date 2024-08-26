import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let servicio: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    servicio = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('recuperar las tareas de la API vía GET', () => {
    const tareasDummy: Task[] = [
      { id: 1, title: 'Tarea 1', description: 'Descripción de Tarea 1', completed: false },
      { id: 2, title: 'Tarea 2', description: 'Descripción de Tarea 2', completed: true }
    ];

    servicio.getTasks().subscribe(tareas => {
      expect(tareas.length).toBe(2);
      expect(tareas).toEqual(tareasDummy);
    });

    const solicitud = httpMock.expectOne(servicio.apiUrl);
    expect(solicitud.request.method).toBe('GET');
    solicitud.flush(tareasDummy);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
