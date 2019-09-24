import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hello-component',
  template: `<h1>Hello component</h1>`
})
export class HelloComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

console.log("Hello Component")