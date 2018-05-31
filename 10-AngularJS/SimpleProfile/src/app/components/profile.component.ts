import { Component } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  showAddres = true;
  person = {
    name: 'Brett',
    age: 29,
    address : { street: '123 Main St', city: 'Anywhere', state: 'NC' },
    avatar: 'https://zcoin.io/wp-content/uploads/2017/01/blank-avatar-300x300.png',
    friends: [
      { name: 'Bob', age: 21 },
      { name: 'Joe', age: 27 },
      { name: 'Alice', age: 25 },
      { name: 'Lexe', age: 32 }
    ],
  }
}
