import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { languages } from 'src/app/models/jobseeker';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-add-languages-dialog',
  templateUrl: './add-languages-dialog.component.html',
  styleUrls: ['./add-languages-dialog.component.css']
})
export class AddLanguagesDialogComponent implements OnInit {

  form!: FormGroup

  constructor(
    @Inject(FormBuilder) private _fb: FormBuilder,
    @Inject(MatDialogRef) public _dialogRef: MatDialogRef<AddLanguagesDialogComponent>,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { languages: [string] }) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      languages: this._fb.array([])
    });

    if (this.data.languages && this.data.languages.length > 0) {
      this.data.languages.forEach((language) => {
        this.addLanguage(language);
      });
    } else {
      this.addLanguage();
    }
  }

  createLanguage(initialValue = ''): FormGroup {
    return this._fb.group({
      name: [initialValue, Validators.required]
    });
  }

  get languages(): FormArray {
    return this.form.get('languages') as FormArray;
  }

  addLanguage(initialValue = ''): void {
    this.languages.push(this.createLanguage(initialValue));
  }

  onSubmit(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (this.form.valid && jobseekerId) {
      const languages: languages[] = this.languages.value;
      const languageNames = languages.map(language => language.name)
      this._jobseekerService.addLanguages(languageNames, jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Languages added', 'Close', {
              duration: 4000,
              verticalPosition: 'top'
            })
            this._dialogRef.close()
          }
        }
      })
    }
  }

  deleteLanguages(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (jobseekerId) {
      this._jobseekerService.addLanguages([], jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Languages deleted', 'Close', {
              duration: 4000,
              verticalPosition: 'top'
            })
            this._dialogRef.close()
          }
        }
      })
    }
  }



}
