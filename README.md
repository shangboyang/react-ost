![react-ost logo](./images/logo.png)

# react-ost
Create React apps with no build configuration. It include:
- `client-side-render` boilerplate project.
- `server-side-render` bolierplate project.

## Quick Overview
```sh
npm i -g react-ost
react-ost init
cd [my-app]
npm run dev
```

Then open http://localhost:7706/ to see your app.

## Client-Side-Render Bolierplate
```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── registerServiceWorker.js

```

## Server-Side-Render Bolierplate 
It will create a directory called `my-app` inside the current folder. 
Project structure:
```
my-app
├── build
│   ├── webpack.dev.config.js
│   └── webpack.prod.config.js
├── client
│   ├── components
│   ├── config
│   ├── containers
│   ├── css
│   ├── utils
│   ├── index.tpl.html
│   └── app.js
├── server
│   ├── middlewares
│   ├── routes
│   ├── app.js
│   ├── server.dev.js
│   └── server.prod.js
├── views
│   ├── dev
│   └── prod
├── dist
├── node_modules
├── postcss.config.js
├── .gitignore
├── .editorconfig
├──  README.md
└── package.json
```