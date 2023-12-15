import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  // salary: number = 0;

  education: string[] = [
    'Matrice',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      education: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      package: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Employee updated successfully'),
                this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added successfully'), this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  calculatePackage() {
    let yearsOfExperience: number = this.empForm.get('experience')?.value;

    console.log(yearsOfExperience);
    if (yearsOfExperience >= 0 && yearsOfExperience < 2) {
      this.empForm.patchValue({ package: 50000 });
      // this.salary = 50000;
    } else if (yearsOfExperience >= 2 && yearsOfExperience < 5) {
      this.empForm.patchValue({ package: 70000 });
      // this.salary = 70000;
    } else if (yearsOfExperience >= 5) {
      this.empForm.patchValue({ package: 90000 });
      // this.salary = 90000;
    } else {
      this.empForm.patchValue({ package: 0 });
      // this.salary = 0;
    }
    console.log(this.empForm.value);
  }
}
