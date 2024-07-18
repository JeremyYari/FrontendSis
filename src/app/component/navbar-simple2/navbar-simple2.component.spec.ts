import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSimpleComponent } from './navbar-simple2.component';

describe('NavbarSimpleComponent', () => {
  let component: NavbarSimpleComponent;
  let fixture: ComponentFixture<NavbarSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
