import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogerRolComponent } from './escoger-rol.component';

describe('EscogerRolComponent', () => {
  let component: EscogerRolComponent;
  let fixture: ComponentFixture<EscogerRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscogerRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscogerRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
