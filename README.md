# Client side for IMLI home utility system (api server repo is privated)

This project was made with:

* [React](https://react.dev/)
* [Webpack](https://webpack.js.org/)
* [TypesScript](https://github.com/microsoft/TypeScript)
* [Apollo/Graphql](https://www.apollographql.com/)

Client and api has to be in the same directory with its default forlder name: `app-imli-client` and `app-imli-server`

## Enviroment variables (cannot run project without it!)
`.env.example` files need to be renamed to `.env` and populate the empty values

This project is docker friendly
If runnig on windows, make sure that docker runs on WSL, and you are running commands from a linux terminal (Ubuntu or Bash)

When all of the services are in place, from top directory of client service run `docker compose up --build`
The project should be up and running momenterally

When accessing `localhost:3000` you will be greated with the loggin screan for the first time.
For development use there will be a `Register` button, for you to create a new local testing account
