import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionEspecialistaComponent } from './opcion-especialista.component';

describe('OpcionEspecialistaComponent', () => {
  let component: OpcionEspecialistaComponent;
  let fixture: ComponentFixture<OpcionEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionEspecialistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
