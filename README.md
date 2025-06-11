# calendar app server – assessment
backend is built with Node.js, Express, TypeScript, Prisma ORM and PostgreSQL.

## getting started

### 1 - clone the repository
```bash
git clone https://github.com/joaquincataldo3/personal-calendar-server.git
cd personal-calendar-server
```

### 2 - prerequisites checklist
* make sure you have postgresql installed and running
* make sure you installed nodejs >= 18 (20 or 22 recommended)

### 2 - install dependencies
```bash
npm install
```

### 3 - create .env file, adding following variables:
DB_HOST,
DB_PORT,
DB_NAME,
DB_USER,
DB_PASSWORD,
PORT,
DATABASE_URL,
JWT_SECRET,
ORIGIN
* by default, if not configurated, postgres is DB_USER value
* by default, if not configurated, localhost is DB_HOST value
* by default, if not configurated, DB_PORT is 5432 
* variable database_url must have this format "postgresql://-USER-:-PASSWORD-@localhost:PORT/DATABASE"
* origin variable must be localhost with port number of the frontend (ex: http://localhost:4200)

### 4 - set up database
* make sure postgresql is running locall. then run:
```bash
npx prisma migrate dev --name init
```
* this will apply the prisma schema, create the migrations and generate the necessary tables in the database.

### 5 - run the app
```bash
npm run dev
```
  
## auth endpoints
* all auth endpoints are prefixed with 'api/auth'

### GET /logout
* logs the user out
* success response:
```json
{
  "statusCode": 200,
  "message": "successfully logged out"
}
```
  
### POST /register
* registers a new user
* request body:
```json
{
  "email": "example@email.com",
  "password": "Password@123"
}
```

* success response:
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
```
* success response
```json
{
  "statusCode": 200,
  "message": "successfully logged in"
```

## events endpoints
* all events endpoints are prefixed with 'api/event'

### GET /
* retrieve all the logged user events
* success response
```json
"statusCode": 200,
  "message": "successfully retrieved events",
  "data": [
    {
      "id": 1,
      "title": "meeting",
      "description": "weekly sync",
      "start_time": "2025-06-09T10:00:00.000Z",
      "end_time": "2025-06-09T11:00:00.000Z",
      "user_id": 2
    }
  ]
```

### POST /
* creates an event
* request body
* ---description is optional---
```json
{
  "title": "meeting with team",
  "description": "discuss sprint progress",
  "startTime": "2025-06-09T15:00:00.000Z",
  "endTime": "2025-06-09T15:30:00.000Z"
}
```
* success response
```json
{
  "statusCode": 200,
  "message": "successfully created event",
  "data": {
    "id": 23,
    "title": "meeting with team",
    "description": "discuss sprint progress",
    "startTime": "2025-06-09T15:00:00.000Z",
    "endTime": "2025-06-09T15:30:00.000Z"
    "user_id": 2
  }
}
```

### PUT /:eventId
* edits an event
* request body
* ---description is optional---
```json
{
  "title": "updated title",
  "description": "updated description",
  "startTime": "2025-08-09T15:00:00.000Z",
  "endTime": "2025-10-09T15:30:00.000Z"
}
```
* success response
```json
{
  "statusCode": 200,
  "message": "event updated successfully"
}
```
### DELETE /:eventId
* deletes an event
* success response
```json
{
  "statusCode": 200,
  "message": "event successfully deleted"
}
```
