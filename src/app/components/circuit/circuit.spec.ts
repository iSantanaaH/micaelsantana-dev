import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Circuit } from './circuit';

describe('Circuit', () => {
  let component: Circuit;
  let fixture: ComponentFixture<Circuit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Circuit],
    }).compileComponents();

    fixture = TestBed.createComponent(Circuit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
