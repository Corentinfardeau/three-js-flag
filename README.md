# Playground-starter

A quick starter for lab projects.   
Including 
* [Gulp](http://gulpjs.com/)
* [Sass](http://sass-lang.com/)
* [GSAP](http://greensock.com/gsap) 
* [Browserify](http://browserify.org/)
* [Browsersync](https://www.browsersync.io/)
* [Babel - ES6](https://babeljs.io/) 

## Before everything
- You'll need [Node](https://nodejs.org/) (which includes NPM).
- Install Gulp using `npm install -g gulp`. This installs Gulp globally and is needed later.
- Clone this repo to your local computer
- Edit project.json with your datas
- Install the nodes modules
```shell
$ npm install
```
## Run the project

There is three kind of environments available : `dev`,  `staging`, `live`. To change the config of each environement you need to edit the __project.json__ file. 

- Build and watch the app with __development configs__
```shell
$ npm start
```
* Build app with __staging config__
```shell
$ npm run staging
```
* Build app with __live configs__
```shell
$ npm run live
```

### License

MIT
