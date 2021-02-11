import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieService {
    private API_KEY: string = environment.TMDB_API_KEY;
    private API_URL: string = environment.TMDB_API_URL;
    private URL: string = this.API_URL + 'search/movie?api_key=' + this.API_KEY + '&query=';

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:typedef
    getMovie(query: string, page: number) {
        return this.http.get(this.URL + query + '&page=' + (page ? page : 1)).pipe(map(res => res));
    }

}
