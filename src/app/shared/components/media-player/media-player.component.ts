import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

/*
TODO: rxjs es de programacion reactiva
*/

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  listObservers$: Array<Subscription> = [];
  state: string = 'paused';

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$.subscribe(
      (status) => (this.state = status)
    );
    this.listObservers$ = [observer1$];

    // this.multimediaService.trackInfo$.subscribe((res) => {
    //   console.log('Debo reproducir esta cancion... ', res);
    // });
    /*esta constante la creas para que durante el ciclo de vida del componente este 
    siempre escuchando si hay una cancion para reproducir*/
    // const observer1$: Subscription = this.multimediaService.callback.subscribe(
    //   (response: TrackModel) => {
    //     console.log('Recibiendo cancion.....', response);
    //   }
    // );
    // this.listObservers$ = [observer1$];
    // const observable1$ = this.multimediaService.myObservable1$.subscribe(
    //   (responsive) => {
    //     console.log('El agua esta llegando bien', responsive);
    //     //TODO: caso positivo
    //   },
    //   (responsiveError) => {
    //     console.log('Tuberia tapada');
    //     //TODO: caso de error
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((u) => u.unsubscribe());

    console.log('ESTE COMPONENTE SE VA A DESTRUIR... en 3 2 1 ...');
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x; //TODO: 1050 - x
    const percentageFromX = (clickX * 100) / width;
    console.log(`Click(x): ${percentageFromX}`);
    this.multimediaService.seekAudio(percentageFromX);
  }
}
