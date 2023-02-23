<div align="center">
  <br>
  <h1><strong>Backend Cinemnar App</strong></h1
  <br>

  <!-- [**View the Web App**](https://exceltodynamodbjson.vercel.app) -->
</div>


##  Description
Backend application Cinemnar App for Repo **fw12-frontend** and **fw12-rn-cinemnar**

## Built With
![Express](https://img.shields.io/badge/Express-v4.18.2-pink?style=flat)
![Cors](https://img.shields.io/badge/cors-v2.8.5-green?style=flat)
![Argon2](https://img.shields.io/badge/argon2-v0.30.2-blue?style=flat)
![Dotenv](https://img.shields.io/badge/dotenv-v16.0.3-orange?style=flat)
![Express Validator](https://img.shields.io/badge/expressvalidator-v6.14.2-red?style=flat)
![cloudinary](https://img.shields.io/badge/cloudinary-v1.33-navy?style=flat)
![multerstoragecloudinary](https://img.shields.io/badge/multer_storage_cloudinary-v0.30.2-blue?style=flat)
![Morgan](https://img.shields.io/badge/morgan-v1.10.0-cyan?style=flat)
![Multer](https://img.shields.io/badge/multer-v8.4.5-ray?style=flat)
![Nodemon](https://img.shields.io/badge/nodemon-v2.0.20-white?style=flat)
![pg](https://img.shields.io/badge/pg-v8.8.0-pink?style=flat)
![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-v8.5.1-blue?style=flat)
![googleapis](https://img.shields.io/badge/googleapis-v110.0.0-green?style=flat)
![nodemailer](https://img.shields.io/badge/nodemailer-v8.8.0-purple?style=flat)


## Table of Contents
- [Built With](#built-with)
- [Technologies](#technologies)
- [Run App](#run-app)
- [ENV Example](#env-example)
- [Main End Point](#main-end-point)


## Technologies
- [Node Js](https://nodejs.org/en/)
- [Express Js](https://expressjs.com/)
- [Postman](https://www.postman.com/)
- [Postgree SQL](https://www.postgresql.org/)
- [Supabase](https://supabase.com/)
- [Cyclic.sh](https://www.cyclic.sh/)


## Run App
-   Requirement:

    -   Install [Node.js](https://nodejs.org)
    -   Recommended to use [NPM](https://www.npmjs.com/)

-   Clone the repo.

    ```bash
    git clone https://github.com/PututN/fw12-backend.git
    ```

    ```bash
    cd fw12-backend
    ```

-   Install the dependencies.

    ```bash
    npm install
    ```

    ### Development
    Set up your ENV
    
     ```bash
    npm run dev
    ```
    
    ## Or Open Postman
    - Login or Register and open [Postman](https://www.postman.com/cinemnar/workspace/my-workspace/)
    - Create a Fork
    - Setting Environtments-Globals with variable  ```uri``` and Inital value ```https://dull-kilt-crab.cyclic.app```
   
   

## ENV Example
### Database URL for postgresql
DATABASE_HOST = <br>
DATABASE_PORT = <br>
DATABASE_USER = <br>
DATABASE_PASSWORD = <br>
DATABASE_NAME = <br>

### Secret key for json web token
SECRET_KEY =

### Port for the server to listen on
PORT =

### Configuration for Claudinary
CLOUD_NAME = <br>
API_KEY = <br>
API_SECRET = <br>

### Configuration for nodemailer
CLIENT_ID = <br>
CLIENT_SECRET = <br>
REFRESH_TOKEN = <br>
EMAIL_SENDER = <br>

## Main End Point
|url|method|desc|
|---|------|----|
|/auth/login|POST|login|
|/auth/register|POST|register|
|/auth/forgotPassword|POST|if user forgot password / account recovery|
|/auth/resetPassword|POST|reset new password |
|/movies?page&limit&sort&sortB&search|GET|get all movie on View All page|
|/movies/nowShowing|GET|get Now Showing Movie on Homepage|
|/movies/upComingMovies?month|GET|get Up Coming on Homepage|
|/movies/:id|GET|get data movie on Movie Detail page|
|/movieDetail/:id/schedules?city&date|GET|get data cinema on Movie Detail page|
|/profile|GET|get data profile|
|/profile/updated|PATCH|update profile data|
|/transaction/order|POST|make order|
|/transaction/history|GET|get data history transaction by user id on History page|
|/transaction/history/:id|GET|get data id history on Ticket Result page|
