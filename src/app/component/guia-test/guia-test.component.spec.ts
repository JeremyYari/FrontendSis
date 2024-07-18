import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaTestComponent } from './guia-test.component';

describe('GuiaTestComponent', () => {
  let component: GuiaTestComponent;
  let fixture: ComponentFixture<GuiaTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuiaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
