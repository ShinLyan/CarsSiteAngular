import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  carsData = [
    {
      image: '1.png',
      name: 'Lamborghini Huracan Spyder',
      gear: 'полный',
      engine: 5.2,
      places: 2,
    },
    {
      image: '2.png',
      name: 'Chevrolet Corvette',
      gear: 'полный',
      engine: 6.2,
      places: 2,
    },
    {
      image: '3.png',
      name: 'Ferrari California',
      gear: 'полный',
      engine: 3.9,
      places: 4,
    },
    {
      image: '4.png',
      name: 'Lamborghini Urus',
      gear: 'полный',
      engine: 4.0,
      places: 5,
    },
    {
      image: '5.png',
      name: 'Audi R8',
      gear: 'полный',
      engine: 5.2,
      places: 2,
    },
    {
      image: '6.png',
      name: 'Chevrolet Camaro',
      gear: 'полный',
      engine: 2.0,
      places: 4,
    },
  ];

  constructor(private fb: FormBuilder) {}

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
      alert('Спасибо за заявку, мы свяжемся с вами в ближайшее время!');
      this.priceForm.reset();
    }
  }
}
