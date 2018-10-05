import { CalcRateService } from './_services/calc-rate.service';
import { Component, OnInit } from '@angular/core';
import { ddds, plans } from './_utils/constants';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ddds = ddds;
  plans = plans;
  form: FormGroup;
  result: number;
  constructor(private calcService: CalcRateService) { }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      origin: new FormControl(null),
      destiny: new FormControl(null),
      duration: new FormControl(),
      plan: new FormControl()
    });
  }

  onSubmit() {
    if (this.form.get('origin').value !== this.form.get('destiny').value) {
      this.result = this.calcService.calcRate(this.form.value);
    }
  }
}
