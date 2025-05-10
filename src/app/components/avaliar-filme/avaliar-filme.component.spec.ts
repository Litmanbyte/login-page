import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliarFilmeComponent } from './avaliar-filme.component';

describe('AvaliarFilmeComponent', () => {
  let component: AvaliarFilmeComponent;
  let fixture: ComponentFixture<AvaliarFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliarFilmeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliarFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
