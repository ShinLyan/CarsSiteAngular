import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  });

  carsData: any;

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.appService
      .getData()
      .subscribe((carsData) => (this.carsData = carsData));
  }

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({ behavior: 'smooth' });
    if (car) {
      this.priceForm.patchValue({ car: car.name });
    }
  }

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const offsetKoeff = 30;

    this.trans = {
      transform: `translate3d(${e.clientX / offsetKoeff}px, ${
        e.clientY / offsetKoeff
      }px, 0px)`,
    };
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    const yOffsetKoeff = 0.2;

    this.bgPos = { backgroundPositionX: `0${yOffsetKoeff * window.scrollY}px` };
  }

  onSubmit() {
    if (this.priceForm.valid) {
      this.appService.sendQuery(this.priceForm.value).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.priceForm.reset();
        },

        error: (response) => {
          alert(response.error.message);
        },
      });
    }
  }
}
