import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit {

  form!: FormGroup
  currentRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { companyId: string, jobseekerId: string },
    private reviewService: ReviewService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      review: ['', Validators.required]
    })
  }

  setRating(rating: number): void {
    this.currentRating = rating;
  }

  get isFormValid(): boolean {
    return this.form.valid
  }

  onSubmit(): void {
    this.dialogRef.close()
    const data = this.form.getRawValue()
    const reviewData = { comment: data.review, rating: this.currentRating, companyId: this.data.companyId, jobseekerId: this.data.jobseekerId }
    console.log(reviewData)
    this.reviewService.postReview(reviewData).subscribe({
      next: (res) => {
        if (res.success == true) {
          this.snackBar.open('Review successfully added', 'Close', {
            duration: 5000,
            verticalPosition: 'top'
          })
        }
      }
    })
  }

}
