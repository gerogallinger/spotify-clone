import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TODO: Primer enunciado el cual debe asegurar lo siguiente
  /**
   *  1- Deber se asegurarse que el formluario sea invalido cuando ingrese dato erroneo
   *
   */

  it('Deberia retornar invalido el formulario ♦', () => {
    //TODO: Arrange
    const mockCredentials = {
      email: '0x0x0x0x0',
      password: '1111111111111111111',
    };

    const emailForm: any = component.formLogin.get('email');
    const emailPassword: any = component.formLogin.get('password');
    //TODO: Act

    emailForm.setValue(mockCredentials.email);
    emailPassword.setValue(mockCredentials.email);

    //TODO: Assert

    expect(component.formLogin.invalid).toEqual(true);
  });

  it('Tiene que retornar true con el usuario de test ✔✔', () => {
    //TODO: Arrange
    const mockCredentials = {
      email: 'test@test.com',
      password: '12345678',
    };

    const emailForm: any = component.formLogin.get('email');
    const emailPassword: any = component.formLogin.get('password');
    //TODO: Act

    emailForm.setValue(mockCredentials.email);
    emailPassword.setValue(mockCredentials.email);

    //TODO: Assert

    expect(component.formLogin.invalid).toEqual(true);
  });

  it('El boton de login deberia de tener la palabra Iniciar Sesion ♦', () => {
    const elementRef = fixture.debugElement.query(
      By.css('.form-action button')
    );
    const getInnerText = elementRef.nativeElement.innerText;

    expect(getInnerText).toEqual('Iniciar sesión');
  });
});
