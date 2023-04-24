import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepostComponent } from './homepost.component';

describe('HomepostComponent', () => {
  let component: HomepostComponent;
  let fixture: ComponentFixture<HomepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
