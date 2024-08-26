import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { taskInterceptor } from './task.interceptor';

describe('taskInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => taskInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('crear el componente', () => {
    expect(interceptor).toBeTruthy();
  });
});
