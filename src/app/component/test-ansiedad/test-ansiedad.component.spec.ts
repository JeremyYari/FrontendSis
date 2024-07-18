import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAnsiedadComponent } from './test-ansiedad.component';

describe('TestAnsiedadComponent', () => {
  let component: TestAnsiedadComponent;
  let fixture: ComponentFixture<TestAnsiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAnsiedadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestAnsiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
