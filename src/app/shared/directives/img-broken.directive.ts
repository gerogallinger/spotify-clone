import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]',
})
export class ImgBrokenDirective {
  @HostListener('error') handleError(): void {
    //manejador del error
    const elNative = this.elHost.nativeElement;
    console.log('Esta imagen revento -->', this.elHost);
    elNative.src = '../../../assets/img-broken.jpg';
  }

  constructor(private elHost: ElementRef) {
    console.log(this.elHost);
  }
}
