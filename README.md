# calendar app server – assessment
backend is built with Node.js, Express, TypeScript, Prisma ORM and PostgreSQL.

## getting started

### 1 - clone the repository
```bash
git clone https://github.com/joaquincataldo3/personal-calendar-server.git
cd personal-calendar-server
```

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
* variable database_url must have this format "postgresql://-USER-:-PASSWORD-@localhost:PORT/DATABASE"

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
      "event_date": "2025-06-09T10:00:00.000Z",
      "user_id": 2
    }
  ]
```

### POST /
* signs the user in
* request body
* ---description is optional---
```json
{
  "title": "meeting with team",
  "description": "discuss sprint progress",
  "eventDate": "2025-06-09T15:00:00.000Z"
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
    "event_date": "2025-06-09T15:00:00.000Z",
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
  "eventDate": "2025-06-11T15:00:00.000Z"
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
