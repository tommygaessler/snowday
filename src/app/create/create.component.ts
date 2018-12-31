import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common'
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

declare var StripeCheckout:any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  addOnBlur;
  invalidEmail: boolean = false;
  handler: any;
  emails: any = [];
  createPoolForm: FormGroup;
  emailInput: string = '';
  emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(fb: FormBuilder) {
    this.createPoolForm = fb.group({
      'name': [null, Validators.required],
      'buyin': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_azE802fthc69BcEpUKGLJx6W',
      image: 'https://skiride.com/assets/images/favicon.png',
      locale: 'auto',
      token: 'something'
    });
  }

  addEmail(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && this.emailRegex.test(value)) {
      this.emails.push({email: value.trim()});

      if (input) {
        input.value = '';
        this.emailInput = '';
      }
    } else {
      this.invalidEmail = true;

      setTimeout(() => {
        this.invalidEmail = false;
      }, 500)
      // handle non email
      // shake input
    }
  }

  removeEmail(invoiceTag): void {
    const index = this.emails.indexOf(invoiceTag);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  buyin() {
    this.handler.open({
      name: 'skiride',
      allowRememberMe: false,
      email: 'tommy@skiride.com',
      panelLabel: `Add`,
      description: `Add ${formatCurrency(this.createPoolForm.value.buyin, 'en-US', '$')} to my pool "${this.createPoolForm.value.name}"`,
      amount: parseFloat(this.createPoolForm.value.buyin) * 100
    });
  }

}
