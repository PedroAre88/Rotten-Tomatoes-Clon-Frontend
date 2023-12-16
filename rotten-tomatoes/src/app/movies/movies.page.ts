import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}


interface MovieResponse {
  page: number;
  results: Movie[];
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})

export class MoviesPage implements OnInit {
  movies: Movie[] = [];
  url = 'https://api.themoviedb.org/3/movie/popular';
  apiKey = '33ecfee6ec14f2f1f5fa82704f1548b9';
  page = 1; 
  
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.http.get<MovieResponse>(this.url + '?api_key=' + this.apiKey + '&page=' + this.page).subscribe(data => {
      this.movies = data.results;
    });
  }

 
  nextPage() {
    this.page++;
    this.getMovies();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getMovies();
    }
  }
  logout() {

    this.router.navigate(['/home']);
  }

  openMovie(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
}