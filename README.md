## The front-end part of the Database project

last updated in <2019-4-2> by enginewang

<br>

#### pre-install

node.js (don't forget to check the availability of npm)

vue-cli

<br>

#### version

node --version: &nbsp;&nbsp;11.13.0 &nbsp;&nbsp;&nbsp;( latest version )

vue --version:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.5.5 &nbsp;&nbsp;&nbsp;( latest version )

<br>

#### Run this project

`git clone git@github.com:enginewang/front-end-DB-project.git`

`cd dbproject`

`sudo npm install --unsafe-perm`

`npm run serve`

you will see this if the server runs well:
```
DONE  Compiled successfully in 609ms

 App running at:
 - Local:   http://localhost:8080/
 - Network: http://192.168.50.176:8080/
```

open `localhost:8080` in your browser to see the demo

<br>

#### Related Websites

**Learn HTML/css/Javascript**

<a href="https://www.w3schools.com/"> w3school (en)</a>

<a href="http://www.w3school.com.cn/"> w3school (zh)</a>

**Learn Vue.js**

<a href="https://vuejs.org/"> Vue.js </a>



<br>


#### Vue-Cli Configuration (manually)

```bash
Check the features needed for your project:
◉ Babel
◯ TypeScript
◯ Progressive Web App (PWA) Support
◉ Router
◉ Vuex
◉ CSS Pre-processors
◉ Linter / Formatter
◉ Unit Testing
◯ E2E Testing


Use history mode for router? (Requires proper server setup for index fallback
in production) (Y/n) Y


Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported
by default): (Use arrow keys)
❯ Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
  Less
  Stylus


Pick a linter / formatter config:
  ESLint with error prevention only
  ESLint + Airbnb config
❯ ESLint + Standard config
  ESLint + Prettier


Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
◉ Lint on save
◯ Lint and fix on commit


Pick a unit testing solution: (Use arrow keys)
❯ Mocha + Chai
  Jest


Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
❯ In dedicated config files
  In package.json

```
