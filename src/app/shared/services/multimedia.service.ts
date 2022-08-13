import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>();
  myObservable1$: BehaviorSubject<any> = new BehaviorSubject('✔✔✔');

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement; //TODO: tipo de dato audio
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemainig$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe((responsiveOK) => {
      this.setAudio(responsiveOK);
    });

    this.listenAllEvents();
    /**
     * CASO DE myObservable como tipo de dato Subject
     */
    // setTimeout(() => {
    //   this.myObservable1$.next('Enviame agua');
    // }, 1000);
    /**
     * CASO DE myObservable como tipo de dato observable
     */
    // this.myObservable1$ = new Observable((observer: Observer<any>) => {
    //   observer.next('Enviamos agua');
    //   setTimeout(() => {
    //     observer.next('Enviamos agua ✔');
    //   }, 2500);
    //   setTimeout(() => {
    //     observer.next('Se tapo la tuberia 🤦‍♂️');
    //   }, 3500);
    // });
  }
  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play');
        break;
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'ended':
        this.playerStatus$.next('ended');
        break;
      // case 'paused':
      //   this.playerStatus$.next('paused');
      //   break;
      default:
        this.playerStatus$.next('paused');
        break;
    }
  };

  //esto es una arrow funtion
  private calculateTime = () => {
    const { duration, currentTime } = this.audio;
    // console.table([duration, currentTime]);
    this.setTimeElapsed(currentTime);
    this.setRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  };

  private setTimeElapsed(currentTime: number): void {
    let second = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);

    const displaySeconds = second < 10 ? `0${second}` : second;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`;

    this.timeElapsed$.next(displayFormat);
  }

  private setRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;

    let second = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);

    const displaySeconds = second < 10 ? `0${second}` : second;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`;
    this.timeRemainig$.next(displayFormat);
  }

  private setPercentage(currentTime: number, duration: number): void {
    //TODO duration ---> 100%
    //TODO currentTime ---> (x)
    //TODO (currentTime * 100) / duration
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }

  /*
    METODOS PUBLICOS
  */
  public setAudio(track: TrackModel): void {
    console.log('✔  estamos desde el servicio', track);
    this.audio.src = track.url;
    this.audio.play();
  }

  public togglePlayer(): void {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  public seekAudio(percentage: number): void {
    const { duration } = this.audio;
    const percentageToSecond = (percentage * duration) / 100;
    this.audio.currentTime = percentageToSecond;
  }
}
