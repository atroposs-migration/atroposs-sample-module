import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtropossSampleModuleComponent } from './atroposs-sample-module.component';

describe('AtropossSampleModuleComponent', () => {
  let component: AtropossSampleModuleComponent;
  let fixture: ComponentFixture<AtropossSampleModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtropossSampleModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtropossSampleModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
