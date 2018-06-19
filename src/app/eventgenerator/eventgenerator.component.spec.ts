import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventgeneratorComponent } from './eventgenerator.component';

describe('EventgeneratorComponent', () => {
  let component: EventgeneratorComponent;
  let fixture: ComponentFixture<EventgeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventgeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
