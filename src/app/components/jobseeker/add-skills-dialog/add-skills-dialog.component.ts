import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { skills } from 'src/app/models/jobseeker';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-add-skills-dialog',
  templateUrl: './add-skills-dialog.component.html',
  styleUrls: ['./add-skills-dialog.component.css']
})
export class AddSkillsDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    @Inject(FormBuilder) private _fb: FormBuilder,
    @Inject(MatDialogRef) public _dialogRef: MatDialogRef<AddSkillsDialogComponent>,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { skills: [string] }) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      skills: this._fb.array([])
    });

    if (this.data.skills && this.data.skills.length > 0) {
      this.data.skills.forEach((skill) => {
        this.addSkill(skill);
      });
    } else {
      this.addSkill();
    }
  }

  createSkill(initialValue = ''): FormGroup {
    return this._fb.group({
      name: [initialValue, Validators.required]
    });
  }

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  addSkill(initialValue = ''): void {
    this.skills.push(this.createSkill(initialValue));
  }

  onSubmit(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (this.form.valid && jobseekerId) {
      const skills: skills[] = this.skills.value;
      const skillNames = skills.map(skill => skill.name)
      this._jobseekerService.addSkills(skillNames, jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Skills added', 'Close', {
              duration: 4000,
              verticalPosition: 'top'
            })
            this._dialogRef.close()
          }
        }
      })
    }
  }

  deleteSkills(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (jobseekerId) {
      this._jobseekerService.addSkills([], jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Skills deleted', 'Close', {
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
