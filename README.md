# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/selestrel07/nodejs2025Q2-service.git
```

## Installing NPM modules

```sh
npm install
```

## Running application

```sh
npm start
```

After starting the app on port (4000 as default, you can use your own port value in `.env` file) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```sh
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Using API
#### Users API

- `/user`
`GET`
  - without parameters
    - returns all registered users
  - with `/:id` path parameter
    - returns user with provided id if user was found
    - returns 400 response if provided id is not a valid UUID
    - returns 404 response if user was not found

  `POST`
   - with body
      ```
      {
        login: string,
        password: string
      }
      ```
      - returns 201 response and a new user record if user was successfully created
      - returns 400 response if:
        - request body doesn't contain all required fields
        - any field has wrong type

    `PUT`
  - with `/:id` path parameter and body
      ```
      {
        oldPassword: string,
        newPassword: string
      }
      ```
      - returns 200 response and an updated user record if user was successfully updated
      - returns 400 response if:
        - provided id is not a valid UUID
        - request body doesn't contain all required fields
        - any field has wrong type
      - returns 403 response if oldPassword is wrong (doesn't correspond user's password field)
      - returns 404 response if user was not found

    `DELETE`
  - with `/:id` path parameter
    - returns 204 response if user was deleted
    - returns 400 response if provided id is not a valid UUID
    - returns 404 response if user was not found
#### Tracks API
- `/track`
  `GET`
  - without parameters
    - returns all tracks
  - with `/:id` path parameter
    - returns track with provided id if track was found
    - returns 400 response if provided id is not a valid UUID
    - returns 404 response if track was not found

  `POST`
   - with body
      ```
      {
        name: string,
        duration: number, //integer
        artistId: string | null, //optional
        albumId: string | null // optional
      }
      ```
      - returns 201 response and a new track record if track was successfully created
      - returns 400 response if:
        - request body doesn't contain all required fields
        - any field has wrong type

  `PUT`
  - with `/:id` path parameter and body
      ```
      {
        name: string,
        duration: number, //integer
        artistId: string | null, //optional
        albumId: string | null // optional
      }
      ```
      - returns 200 response and an updated track record if track was successfully updated
      - returns 400 response if:
        - provided id is not a valid UUID
        - request body doesn't contain all required fields
        - any field has wrong type
      - returns 404 response if track was not found

  `DELETE`
  - with `/:id` path parameter
    - returns 204 response if track was deleted
    - returns 400 response if provided id is not a valid UUID
    - returns 404 response if track was not found
#### Artists API
- `artist`
  `GET`
  - without parameters
    - returns all artists
  - with `/:id` path parameter
    - returns artist with provided id if artist was found
    - returns 400 response if provided id is not a valid UUID
    - returns 404 response if artist was not found

  `POST`
   - with body
      ```
      {
        name: string,
        grammy: boolean
      }
      ```
      - returns 201 response and a new artist record if artist was successfully created
      - returns 400 response if:
        - request body doesn't contain all required fields
        - any field has wrong type

  `PUT`
  - with `/:id` path parameter and body
      ```
      {
        name: string,
        grammy: boolean
      }
      ```
      - returns 200 response and an updated artist record if artist was successfully updated
      - returns 400 response if:
        - provided id is not a valid UUID
        - request body doesn't contain all required fields
        - any field has wrong type
      - returns 404 response if artist was not found

  `DELETE`
  - with `/:id` path parameter
    - returns 204 response if artist was deleted
    - returns 400 response if provided id is not a valid UUID
    - returns 404 response if artist was not found
#### Albums API
- `/album`
  `GET`
  - without parameters
    - returns all albums
  - with `/:id` path parameter
    - returns album with provided id if album was found
    - returns 400 response if provided id is not a valid UUID
    - returns 404 response if album was not found

  `POST`
   - with body
      ```
      {
        name: string,
        year: number, //integer, positive
        artistId: string | null //optional
      }
      ```
      - returns 201 response and a new album record if album was successfully created
      - returns 400 response if:
        - request body doesn't contain all required fields
        - any field has wrong type

  `PUT`
  - with `/:id` path parameter and body
      ```
      {
        name: string,
        year: number, //integer, positive
        artistId: string | null //optional
      }
      ```
      - returns 200 response and an updated album record if album was successfully updated
      - returns 400 response if:
        - provided id is not a valid UUID
        - request body doesn't contain all required fields
        - any field has wrong type
      - returns 404 response if album was not found

  `DELETE`
  - with `/:id` path parameter
    - returns 204 response if album was deleted
    - returns 400 response if provided id is not a valid UUID
    - returns 404 response if album was not found
#### Favorites API
- `/favs`
  `GET`
  - without parameters
    - returns all favorite artists, albums and tracks in format
      ```
      {
        artists: Artist[],
        albums: Album[],
        tracks: Track[]
      }
      ```
  `POST`
    - with `/track/:id` path parameter
      - returns 201 response if track was added to favorites
      - returns 400 response if provided id is not a valid UUID
      - returns 422 response if track with id `:id` was not found
    - with `/album/:id` path parameter
      - returns 201 response if album was added to favorites
      - returns 400 response if provided id is not a valid UUID
      - returns 422 response if album with id `:id` was not found
    - with `/artist/:id` path parameter
      - returns 201 response if artist was added to favorites
      - returns 400 response if provided id is not a valid UUID
      - returns 422 response if artist with id `:id` was not found

  `DELETE`
    - with `/track/:id` path parameter
      - returns 204 response if track was removed from favorites
      - returns 400 response if provided id is not a valid UUID
      - returns 404 response if track with id `:id` was not found in favorites
    - with `/album/:id` path parameter
      - returns 204 response if album was removed from favorites
      - returns 400 response if provided id is not a valid UUID
      - returns 404 response if album with id `:id` was not found in favorites
    - with `/artist/:id` path parameter
      - returns 204 response if artist was removed from favorites
      - returns 400 response if provided id is not a valid UUID
      - returns 404 response if artist with id `:id` was not found in favorites


### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
