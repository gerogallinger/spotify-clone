import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]',
})
export class ImgBrokenDirective {
  @Input() customImg: string | boolean = false;
  @HostListener('error') handleError(): void {
    //manejador del error
    const elNative = this.elHost.nativeElement;
    console.log('Esta imagen revento -->', this.elHost);

    if (this.customImg) {
      elNative.src = this.customImg;
    } else {
      //Aca podes poner una imagen que este en el proyecto por las dudas se caiga la de respaldo
      elNative.src =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png';
    }
  }

  constructor(private elHost: ElementRef) {
    //console.log(this.elHost);
  }
}
