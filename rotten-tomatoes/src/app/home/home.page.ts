import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';
  constructor(private router: Router) {}


  login() {
    const userData = {
      username: this.username,
      password: this.password,
    };
  
    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      if (data.token) {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/movies']);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

}
