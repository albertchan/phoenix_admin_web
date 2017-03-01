# PhoenixAdminWeb

PhoenixAdminWeb is the view layer for PhoenixAdmin, a simple, API-driven user
management system.

## Features

- Vue
- vue-router
- vuex
- vuex-router-sync
- Single-file Vue components
  - Hot-reload in development
  - CSS extraction for production
- i18n with vue-i18n
- JSON API ready with jsonapi-serializer

## Project structure

```
.
├── build/                  # Webpack build script
├── config/                 # Build configurations
├── src/                    # Source files for web app
│   ├── api/                # API methods
│   ├── assets/             # Static assets for web app
│   ├── components/         # Vue components
│   ├── helpers/            # Helpers and utilities
│   ├── router/             # Mappings for `vue-router`
│   ├── services/           # App-level services, i.e. http, i18n
│   ├── store/              # State management files for `vuex`
│   ├── styles/             # App wide CSS styles
│   ├── App.vue             # Main Vue app component
│   ├── constants.js        # Global constants
│   └── main.js             # Entry point for web app   
├── static/                 # Static files
│   └── locales/            # i18n files
├── test/                   # Function and unit tests
├── index.html              # Web app index.html
└── package.json            # List of dependencies and 3rd party libraries
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:4001
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
