import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerStopComponent } from './server-stop.component';

describe('ServerStopComponent', () => {
  let component: ServerStopComponent;
  let fixture: ComponentFixture<ServerStopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerStopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
