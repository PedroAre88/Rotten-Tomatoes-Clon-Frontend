import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';
  critico: string = '';
  

  constructor(private router: Router) { }

  ngOnInit() {
  }


  registerUser() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      critico: this.critico
    };
    
    fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.router.navigate(['/home']);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}
