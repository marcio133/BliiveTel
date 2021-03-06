import { CalcRateService } from '../_services/calc-rate.service';
import { Component, OnInit } from '@angular/core';
import { ddds, plans, rates } from '../_utils/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ddds = ddds;
  plans = plans;
  form: FormGroup;
  result: number;
  resultNoPlan: number;
  errorMessage: string = null;
  homeMessage = 'Vamos te ajudar a calcular suas despesas.';
  rates = rates;
  isLoading = false;
  constructor(private calcService: CalcRateService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      origin: new FormControl(null, Validators.required),
      destiny: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.compose(
        [Validators.min(1), Validators.required])),
      plan: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const { origin, destiny } = this.form.value;
    if (origin !== destiny) {
      this.errorMessage = null;
      this.isLoading = true;
      const { result, resultNoPlan } = this.calcService.calcRate(this.form.value);
      if (this.rates[`${origin}-${destiny}`]) {
        this.setResult(result, resultNoPlan);
      } else {
        this.setResult();
        this.homeMessage = 'Opa, ainda não temos essa rota disponível.';
      }
      setTimeout(() => {
        this.isLoading = false;
        document.getElementById('result').scrollIntoView();
      }, 1000);
    } else {
      this.errorMessage = 'Os ddds de origem e destino precisam ser diferentes.';
    }
  }

  setResult(result: number = null, resultNoPlan: number = null) {
    this.result = result;
    this.resultNoPlan = resultNoPlan;
  }

}
