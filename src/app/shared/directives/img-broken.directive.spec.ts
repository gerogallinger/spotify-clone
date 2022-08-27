import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImgBrokenDirective } from './img-broken.directive';

//TODO:
@Component({
  template: '<img class="testing-directiva" appImgBroken [src]="srckMock">',
})
class TestComponent {
  public srckMock: any = null;
}

//TODO: La prueba de imgBroken es la siguiente

describe('ImgBrokenDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [TestComponent, ImgBrokenDirective],
    })
  );
  fixture = TestBed.createComponent(TestComponent);
  component = fixture.componentInstance;

  //TODO:  se deberia instanciar correctamente
  it('should create an instance', () => {
    const mockElement = new ElementRef('');
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });

  it('Test component deberia instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
