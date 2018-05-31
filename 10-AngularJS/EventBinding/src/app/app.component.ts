import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EventBinding';
  text:string;

  constructor(){
    this.text = "HELLO";
  }

  clicked(event){
    console.log(event);
    this.text = "Button Clicked";
  }

  showText(event){
    console.log(this.text);
  }
}
