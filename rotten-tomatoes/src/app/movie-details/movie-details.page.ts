import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;

}
interface Comment {
  username: string;
  text: string;
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: Movie;
  url = 'https://api.themoviedb.org/3/movie';
  apiKey = '33ecfee6ec14f2f1f5fa82704f1548b9';

  comments: Comment[] = [];
  newComment = ''; 
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.movie = {
      id: 0,
      title: '',
      poster_path: '',
      release_date: '',
      vote_average: 0,
      overview: '',
      
    };
  }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Movie>(this.url + '/' + id + '?api_key=' + this.apiKey).subscribe(data => {
      this.movie = data;
    });
  }
  
  addComment() {

    this.comments.push({ username: 'Usuario', text: this.newComment });
    this.newComment = '';
  }
}
