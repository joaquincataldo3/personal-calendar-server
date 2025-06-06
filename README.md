# calendar app server – assessment
backend is built with Node.js, Express, TypeScript, Prisma ORM and PostgreSQL.

## getting started

### 1 - clone the repository
```bash
git clone https://github.com/your-username/calendar-app.git
```bash
cd calendar-app/server
```

### 2 - install dependencies
```bash
npm install
```

### 3 - create .env file, adding following variables:
DB_HOST=localhost
DB_PORT=3030
DB_NAME=personal_calendar
DB_USER=<postgress-user>
DB_PASSWORD=<postgress-password>
PORT=3050
DATABASE_URL="postgresql://<postgress-user>:<postgress-password>@localhost:3030/personal_calendar"
JWT_SECRET="secret-ponce"

### 4 - set up database
* make sure postgresql is running locall. then run:
```bash
npx prisma migrate dev --name init
```

## auth endpoints
* all auth endpoints are prefixed with 'api/auth'

### GET /logout
* logs the user out
* success response
```json
{
  "statusCode": 200,
  "message": "successfully logged out"
}
```
  
### POST /register
* registers a new user
* request body
```json
{
  "email": "example@email.com",
  "password": "Password@123"
}
```

* success response
```json
{
  "statusCode": 201,
  "message": "successfully created user"
}
```
### POST /sign-in
* signs the user in
* request body
```json
{
  "email": "example@email.com",
  "password": "Password@123"
}
* success response
```json
{
  "statusCode": 200,
  "message": "successfully logged in"
}
```
