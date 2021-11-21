import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderDisplayComponent } from './folder-display.component';

describe('FolderDisplayComponent', () => {
  let component: FolderDisplayComponent;
  let fixture: ComponentFixture<FolderDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
