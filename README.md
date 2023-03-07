# Web Chat Application ChatX

## Description

This project is a web chat application with two folders: Frontend and Backend. The application allows users to chat with each other in real-time using websockets. The frontend is built with Vue.js while the backend is built with Node.js.

## Setup
To run the application, follow the steps below:

Clone the repository to your local machine

Navigate to the Front and Back folders and run `npm install` to install the necessary dependencies.

Create a `.env` file in the Back folder and set the values for `PORT` and `SECRET`.

Run `npm run dev` in the Front and Back folders to launch the application.

## Frontend
The Front folder contains the frontend code of the application. It is organized into the following subfolders:

```
httpClients: contains the API client for making HTTP requests to the backend.
router: contains the Vue router configuration.
store: contains the files for the Pinia store used for managing the application state.
views: contains the Vue components for rendering the UI.
```

Additionally, the following files are included in the Front folder:

```
main.js: the entry point of the application.
App.vue: the root Vue component.
style.css: the CSS file for styling the application.
```

## Backend
The Back folder contains the backend code of the application. It is organized into the following subfolders:

```
authentication: contains the code for handling user authentication.
chat: contains the code for handling the chat functionality.
config: contains the configuration files for the application.
```

Additionally, the following file is included in the Back folder:

```
app.js: the entry point of the backend code that runs the HTTP server.
```

## Improvements

This is a basic web chat application that only work locally, there are many things that we can do, we could work on:
- Using a database other than in-memory (using postgres for instance)
- Keep track of when users are connected or not
- Using typescript instead of javascript to have a better view on interfaces
- adding a moderation filter when someone send a message
- Deploy the frontend and the backend on a server

## Contributors

Martin Siesse