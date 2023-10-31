# Client side for IMLI home utility system (api server repo is privated)

This project was made with:

* [React](https://react.dev/)
* [Webpack](https://webpack.js.org/)
* [TypesScript](https://github.com/microsoft/TypeScript)
* [Apollo/Graphql](https://www.apollographql.com/)

## Enviroment variables (cannot run project without it!)
`.env.example` files need to be renamed to `.env` and populate the empty values

```
REACT_APP_ENV="development"
REACT_APP_AUTH_SECRET="secret123"
REACT_APP_LOGIN_LINK="{YOUR SERVER API ROUTE URL or http://localhost:4000/api/login}"
REACT_APP_GRAPHQL_LINK="{YOUR APOLLO SERVER URL or http://localhost:4000/graphql}"
```

When trying to login through `/login` any credentials will work in development mode

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm run start`

Run this command `only` when the `server is up` (because it needs to generate graphql types from server)

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

This project is docker friendly
