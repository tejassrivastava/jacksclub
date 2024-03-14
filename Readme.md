# JacksClub

Contains Backedn API Implementation

# About the project implementation

## Tech Stack

- Backend Framework: Express


## Features Implemented 👨‍💻

- Current Balance Function ✔
- Transaction Function ✔
- API to run these functions ✔
- Direct code to run these functions ✔

- POST `/transact` - Do transactions ✔
- GET `/user/:id` - Retrieve user balance ✔

- POST `/db/create` - Create DynamoDB Tables ✔
- POST `/db/seed` - Insert Seed Data into Tables ✔

## Prerequisite

## Setup DynamoDB Local Using Docker

- There is a file in the root docker-compose.yml
- Run docker compose -f "docker-compose.yml" up -d --build
- This will spin up a DynamoDB Local Instance
- Once done testing run docker compose -f "docker-compose.yml" down to close & remove the containers.


## Run Locally

Clone the project

```bash
 git clone https://github.com/tejassrivastava/jacksclub
```

Go to the project directory

```bash
  cd jacksclub
```

Install dependencies

```bash
  npm install
```

Start the server:

this command will automatically start express server.

```bash
  npm start
```


## Authors

- [@tejassrivastava](https://www.github.com/tejassrivastava)
