# README

## How to use Angular 8 on a Rails 6 app? - 19/09/2019

This project is for study purposes!

## How this project was created?

## 1. Create the project

* `rails new angular-on-rails -d postgresql`

## 2. Install angular with webpacker

* `rails webpacker:install:angular`

## 3. Add dependencies

Create a docker-compose.yml with:

```yml
version: '3'

services:
  postgresdb:
    image: postgres:10.10
    environment:
      - POSTGRES_USER=angular_on_rails
      - POSTGRES_PASSWORD=angular_on_rails
      - POSTGRES_DB=angular_on_rails_development
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
    driver: local
```

Update `default` configuration inside the database.yml with:

```yml
default: &default
  ...
  host: localhost
  username: angular_on_rails
  password: angular_on_rails
  ...
```

Now start the database dependency. 

* `docker-compose up &`

Create the database:

* `rails db:create db:migrate`

Create a Procfile with:

```
rails:   bundle exec rails server
webpack: bin/webpack-dev-server
```

Start the project:

* `foreman start`

## 4. Failed to compile! How to fix the errors?

```ssh
Module not found: Error: Can't resolve 'core-js/es6/reflect' in '/home/$USER/angular-on-rails/app/javascript/hello_angular'
Module not found: Error: Can't resolve 'core-js/es7/reflect' in '/home/$USER/angular-on-rails/app/javascript/hello_angular'
```

The way I solved this was changing the `polyfills.ts` file from:

```javascript
/** Evergreen browsers require these. **/
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
```
To:
```javascript
/** Evergreen browsers require these. **/
import 'core-js/es/reflect';
import "core-js/proposals/reflect-metadata";
```

Thanks to this [pull request](https://github.com/rails/webpacker/pull/2286/files)!

## 5. Create the view index

* `rails g controller dashboard index`

## 6. Update the view index

Open index.html.erb and replace all the code with:

```html
<hello-angular></hello-angular>
<%= javascript_pack_tag "hello_angular" %>
```

Go to the view.

It works!

## 7. Create a Angular component

 - Create a hello-component folder inside app/javascript/hello_angular/app.
 - Create a hello-component.component.ts inside this new folder with:

 ```javascript
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
 ```

 - Import this new component in the app.module.ts.

 ```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello-component/hello-component.component'

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    HelloComponent
  ]
})
export class AppModule { }

 ```

 - Now update the view index:

```html
<hello-angular></hello-angular>
<hello-component></hello-component>
<%= javascript_pack_tag "hello_angular" %>
```