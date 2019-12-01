import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "./../../services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  success_message;
  error_message;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.saveUser(this.registerForm.value).subscribe(
      res => {
        if (res["status"] == true) {
          this.registerForm.reset();
          this.submitted = false;
          this.success_message = res["message"];
        } else {
          this.error_message = res["message"];
        }

        var fn = this;
        setTimeout(function() {
          fn.success_message = "";
          fn.error_message = "";
        }, 2000);
      },
      error => {
        console.log(error);
      }
    );
  }
}
