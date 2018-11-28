import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common'

declare var StripeCheckout:any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  handler: any;
  createPoolForm: FormGroup;
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
