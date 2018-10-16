import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '@core/constants/routes';
import { BackendService } from '@core/backend/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public title = 'phone-book';
  public accessCodeFromControl = new FormControl('', [Validators.required]);

  constructor(private router: Router, private backend: BackendService) {}

  onSumbit() {
    if (this.accessCodeFromControl.invalid) {
      return;
    }
    this.backend.login(this.accessCodeFromControl.value).subscribe(
      user => {
        this.router.navigate([ROUTES.contacts]);
      },
      err => {
        console.error(err);
      }
    );
  }
}
