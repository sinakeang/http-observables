import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import 'rxjs/add/operator/map';
import { SearchItem } from './SearchItem';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {
  apiRoot: string = 'https://itunes.apple.com/search';
  //results: Object[];
  results: SearchItem[];
  loading: boolean;

  constructor(private http:Http) {
    this.results = [];
    this.loading = false;
  }

  search(term: string): Observable<SearchItem[]> {
    let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;

    return this.http.get(apiURL)
      .map( res => {
        let results = res.json().results.map( item => {
          return new SearchItem(
            item.trackName,
            item.artistName,
            item.trackViewUrl,
            item.artworkUrl30,
            item.artistId
          );
        });
        return results;
      });
  }
}
