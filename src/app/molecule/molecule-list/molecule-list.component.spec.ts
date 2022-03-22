import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeListComponent } from './molecule-list.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MoleculeListService } from './molecule-list.service';

describe('MoleculeListComponent', () => {
  const moleculeListServiceStub = {
    getMolecules() {
      return of({
        count: 0,
        next: '',
        previous: '',
        results: [],
      });
    },
  };

  let component: MoleculeListComponent;
  let fixture: ComponentFixture<MoleculeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoleculeListComponent],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: MoleculeListService, useValue: moleculeListServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
