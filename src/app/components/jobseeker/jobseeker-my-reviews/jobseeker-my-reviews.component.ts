import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IReview } from 'src/app/models/review';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jobseeker-my-reviews',
  templateUrl: './jobseeker-my-reviews.component.html',
  styleUrls: ['./jobseeker-my-reviews.component.css']
})
export class JobseekerMyReviewsComponent implements OnInit {

  myReviews: IReview[] = []
  jobseekerId!: string | null

  constructor(private _reviewService: ReviewService,
    private _authService: AuthService,
    private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    this.getAllReviews()
  }

  getAllReviews(): void {
    if (this.jobseekerId)
      this._reviewService.getAllReviews(this.jobseekerId,undefined).subscribe({
        next: (res) => {
          this.myReviews = res
        }
      })
  }

  deleteReview(reviewId: string | undefined): void {
    void Swal.fire({
      title: 'Do you want to delete this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed && reviewId) {
        this._reviewService.deleteReview(reviewId).subscribe({
          next: (res) => {
            if (res.success === true) {
              this._snackbar.open('Review deleted', 'Close', {
                duration: 5000,
                verticalPosition: 'top'
              })
              this.getAllReviews()
            }
          }
        })
      }
    })

  }

}
