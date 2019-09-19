# README

## How to use Angular 8 on a Rails 6 app?

This project is for study purposes!

## How this project was created?

### Create the project

* `rails new angular-on-rails -d postgresql`

### Install angular with webpacker

* `rails webpacker:install:angular`

### Add dependencies

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

### Failed to compile! How to fix the errors?

```ssh
Module not found: Error: Can't resolve 'core-js/es6/reflect' in '/home/$USER/angular-on-rails/app/javascript/hello_angular'
Module not found: Error: Can't resolve 'core-js/es7/reflect' in '/home/$USER/angular-on-rails/app/javascript/hello_angular'
```

The way I solved this was changing the polyfills.ts file from:

```javascript
/** Evergreen browsers require these. **/
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
```
To:
```javascript
/** Evergreen browsers require these. **/
// import 'core-js/es6/reflect';
// import 'core-js/es7/reflect';
import 'core-js/es/reflect';
import "core-js/proposals/reflect-metadata";
```

### Create the view index

* `rails g controller dashboard index`

### Update view index

Open index.html.erb and replace all the code with:

```html
<hello-angular></hello-angular>
<%= javascript_pack_tag "hello_angular" %>
```

Go to the view.

It works!

### How to create a angular component?