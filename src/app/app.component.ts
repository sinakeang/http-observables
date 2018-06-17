import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { SearchItem } from './SearchItem';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/*
- CORS.
    Cross Origin Resource Sharing.
    Feature by browser to prevent api from sharing.
    Can use Allow-Control-Allow-Origin chrome plugin to bypass for development.
- Create an intermediate service.
- Provide our service.
- Convert responses to a domain model.
- Handle async work by using promises.

- Implement most of our application by using an Observable Chain.
- Think like a reactive programmer.
- 
*/
export class AppComponent implements OnInit {
  private loading: boolean = false;
  //private results: SearchItem[];
  //change results from an array of search items, 
  //to an observable which emits an array of search items.
  private results: Observable<SearchItem[]>;
  private searchField: FormControl;

  constructor(private itunes:SearchService) { }

  ngOnInit() {
    this.searchField = new FormControl();
    /* this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .map( term => this.itunes.search(term))
      .subscribe( obs => {
        obs.subscribe( other => console.log(other))
      }); */
      /* this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap( term => this.itunes.search(term))
      .subscribe(other => console.log(other)); */
      this.results = this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap( term => this.itunes.search(term));
  }

  doSearch(term: string) {
    this.loading = true;
    /* this.itunes.search(term).subscribe( (data) => {
      this.loading = false;
      this.results = data;
    }); */
    this.results = this.itunes.search(term);
  }
}
