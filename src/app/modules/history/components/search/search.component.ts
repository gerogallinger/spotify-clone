import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() callbackData: EventEmitter<any> = new EventEmitter();
  src: string = '';
  constructor() {}

  ngOnInit(): void {}

  callSearch(term: string): void {
    if (term.length > 4) {
      this.callbackData.emit(term);
      console.log('El termino en el buscador es', term);
    }
  }
}
