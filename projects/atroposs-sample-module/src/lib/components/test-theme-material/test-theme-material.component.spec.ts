import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestThemeMaterialComponent } from './test-theme-material.component';

describe('TestThemeMaterialComponent', () => {
  let component: TestThemeMaterialComponent;
  let fixture: ComponentFixture<TestThemeMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestThemeMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestThemeMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
