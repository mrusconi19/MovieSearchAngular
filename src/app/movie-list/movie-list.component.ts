import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  moviesFound = false;
  searching = false;
  searchText = '';
  nothingFound = false;
  page = 0;

  totalPages = 0;

  // tslint:disable-next-line:typedef
  handleSuccess(data: any) {
    if (this.page === 0) { this.page += 1; }
    this.nothingFound = data.results.length === 0;
    this.moviesFound = data.results.length > 0;
    this.movies = data.results.sort((a: any, b: any) => b.vote_average - a.vote_average);
    this.totalPages = data.total_pages;
    console.log(data.results);
    console.log(this.totalPages);
  }

  // tslint:disable-next-line:typedef
  handleError(error: any) {
    console.log(error);
  }

  constructor(private movieService: MovieService) { }

  // tslint:disable-next-line:typedef
  handleKeyUp(e: { keyCode: number; }, query: string, page: number) {
    if (e.keyCode === 13 && query === '') {
      return;
    } else if (e.keyCode === 13) {
      this.searchMovies(query, page);
    }
  }

  // tslint:disable-next-line:typedef
  nextPage(query: string) {
    if (this.totalPages !== 0) {
      if (this.page < this.totalPages) {
        this.page = this.page + 1;
        this.searchMovies(query, this.page);
      }
    }
  }

  // tslint:disable-next-line:typedef
  previousPage(query: string) {
    if (this.page !== 1) {
      this.page = this.page - 1;
      this.searchMovies(query, this.page);
    }
  }

  // tslint:disable-next-line:typedef
  searchMovies(query: string, page: number) {
    this.searching = true;
    return this.movieService.getMovie(query, page).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  // For debugging:

  // tslint:disable-next-line:typedef
  // searchMovies(query: string){
  //   return this.movieService.getMovie(query).subscribe(
  //     data => console.log(data),
  //     error => console.log(error),
  //     () => console.log('Request Complete!'));
  // }

  ngOnInit(): void {
  }

}
