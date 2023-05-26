# phrase-projects

Simple frontend application that serves as a demonstration of working with an API.
This project utilizes Vue 3 with Composition API syntax, TypeScript, Pinia, Vite, and vue-router.

## Used engines
| Engine | Version   |
|--------|-----------|
| node   | v18.13.0  |
| npm    | 8.19.3    |


## Configuration

Before running the project you need to create .env file in the root directory and add there VITE_APP_GATEWAY_URL variable with your frontend API URL. For example:

```
VITE_APP_GATEWAY_URL=http://localhost:5173/api
```
where '5173' is default port for this frontend app.

Also, make sure that you have correctly specified the URL to the backend API inside `vite.config.ts` file.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```


# Used packages:
- typescript
- axios
- eslint
- prettier
- reset-css
