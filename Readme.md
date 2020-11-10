# REST API Node.JS & MongoDB

## System Requirement
1. Node.js
2. MongoDB

## Note
1. Port can change from .env file
2. MongoDB connectionstring can change from .env file
3. JWT secret key & limit expiration time can change from .env file

## List Modules

1. Auth
2. Post
   

### Auth
> Authentication user, register, login, logout

#### Register
__METHOD__
```
POST
```

__Sample Host__
```
http://host/api/register
```

__Sample Request__
```
{
    name: string,
    phone: string,
    password: string
}
```

__Sample Response__
```
{
  "code": 201,
  "message": "User was created",
  "data": {
    "_id": "5faa3fbf07f7c844b89b556c",
    "name": "Tri Fitriadi",
    "phone": "089912614713",
    "password": "$2a$07$64buPLRpaB/eig065IzgVOR8lLNzNsqtA6PpjA4icvPXE8E7mMWdK",
    "created_at": "2020-11-10T07:22:39.483Z",
    "__v": 0
  },
}
```

__Sample Error Phone Already Register__
```
{
  "code": 400,
  "message": "",
  "data": {},
  "error": "Phone number is already"
}
```

__Sample Error Field__
```
{
  "code": 400,
  "message": "",
  "data": {},
  "error": "\"phone\" is not allowed to be empty"
}
```

#### Login
__METHOD__
```
POST
```

__Sample Host__
```
http://host/api/login
```

__Sample Request__
```
{
    phone: string,
    password: string
}
```

__Sample Response__
```
{
  "code": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE5NmExODQ0YTY4NjRhNjAyZjYwNWIiLCJpYXQiOjE2MDQ5OTMzODYsImV4cCI6MTYwNDk5Njk4Nn0.LlOkwGPO9A5BqJkZEdQLfcAu1jruzvwEoE_HfYmwKug"
  }
}
```

__Sample Error Field__
```
{
  "code": 400,
  "message": "",
  "data": {},
  "error": "\"phone\" is not allowed to be empty"
}
```


#### Logout
__METHOD__
```
POST
```


__Sample 
Host__
```
http://host/api/logout
```

__Sample Headers__
```
user-token:string 
```

__Sample Response__
```
{
  "code": 200,
  "message": "Logout successfully",
  "data": {}
}
```


### Post
> Create and show posting from user

#### Create
__METHOD__
```
POST
```

__Sample Host__
```
http://host/api/post
```

__Sample Headers__
```
user-token: string
```

__Sample Request__
```
{
	user_id: string,
	post: string,
	hashtag: Array,
	category: Array,
	like: number,
	share: number
}
```

__Sample Response__
```
{
  "code": 201,
  "message": "Post was created succesfully",
  "data": {
    "hashtag": [
      "#BelajarBertani",
      "#PetaniModern",
      "#PadiSawah"
    ],
    "category": [
      "Pertanian",
      "Padi",
      "Pupuk",
      "Penyakit"
    ],
    "like": 21,
    "share": 0,
    "_id": "5faa441e7d86de530845d490",
    "user_id": "5faa4026a4e4ab406427a8c4",
    "post": "Kenapa ya padi umur 23 hari tidak tumbuh normal. apakah penyebabnya? mohon bantuannya",
    "created_at": "2020-11-10T07:41:18.086Z",
    "updated_at": "2020-11-10T07:41:18.086Z",
    "__v": 0
  }
}
```

__Sample Error Field__
```
{
  "code": 500,
  "message": "",
  "data": {},
  "error": "Post validation failed: user_id: Path `user_id` is required."
}
```

__Sample Error JWT__
```
{
  "status": 400,
  "message": "Invalid / Expired token"
}
```

__Sample Error Request Without JWT__

```
{
  "code": 403,
  "error": "Access Denied"
}
```

#### List
```
- List using query param page & sort
- if query param page empty default is 1
- if query param sor empty deault is asc
```

__METHOD__
```
GET
```

__Sample Host__
```
http://host/api/post
```

```
http://host/api/post?page=1
```

```
http://host/api/post?page=1&sort=desc
```

__Sample Headers__
```
user-token: string
```

__Sample Response__
```
{
  "code": 200,
  "message": "Succes",
  "data": [
    {
      "hashtag": [
        "#BelajarBertani",
        "#PetaniModern",
        "#PadiSawah"
      ],
      "category": [
        "Pertanian",
        "Padi",
        "Pupuk",
        "Penyakit"
      ],
      "like": 0,
      "share": 0,
      "_id": "5fa984186bab430db8f1d6a7",
      "user_id": "5fa96a1844a6864a602f605b",
      "post": "Kenapa ya padi umur 23 hari tidak tumbuh normal. apakah penyebabnya? mohon bantuannya",
      "created_at": "2020-11-09T18:02:00.367Z",
      "updated_at": "2020-11-09T18:02:00.367Z",
      "__v": 0
    },
    {
      "hashtag": [
        "#BelajarBertani",
        "#PetaniModern",
        "#PadiSawah"
      ],
      "category": [
        "Pertanian",
        "Padi",
        "Pupuk",
        "Penyakit"
      ],
      "like": 0,
      "share": 0,
      "_id": "5fa984196bab430db8f1d6a8",
      "user_id": "5fa96a1844a6864a602f605b",
      "post": "Kenapa ya padi umur 23 hari tidak tumbuh normal. apakah penyebabnya? mohon bantuannya",
      "created_at": "2020-11-09T18:02:01.384Z",
      "updated_at": "2020-11-09T18:02:01.384Z",
      "__v": 0
    },
    ...
  ],
  "pagination": {
    "total": 15,
    "totalPages": 2,
    "page": 1,
    "nextPage": 2,
    "prevPage": null,
    "pagingCounter": 1
  }
}
```

__Sample Error JWT__
```
{
  "status": 400,
  "message": "Invalid / Expired token"
}
```

__Sample Error Request Without JWT__

```
{
  "code": 403,
  "error": "Access Denied"
}
```

#### Detail

__METHOD__
```
GET
```

__Sample Host__
```
http://host/api/post/:id
```


__Sample Headers__
```
user-token: string
```

__Sample Response__
```
{
  "code": 200,
  "message": "Success",
  "data": {
    "hashtag": [
      "#BelajarBertani",
      "#PetaniModern",
      "#PadiSawah"
    ],
    "category": [
      "Pertanian",
      "Padi",
      "Pupuk",
      "Penyakit"
    ],
    "like": 0,
    "share": 0,
    "_id": "5fa984186bab430db8f1d6a7",
    "user_id": "5fa96a1844a6864a602f605b",
    "post": "Kenapa ya padi umur 23 hari tidak tumbuh normal. apakah penyebabnya? mohon bantuannya",
    "created_at": "2020-11-09T18:02:00.367Z",
    "updated_at": "2020-11-09T18:02:00.367Z",
    "__v": 0
  }
}
```

__Sample Error JWT__
```
{
  "status": 400,
  "message": "Invalid / Expired token"
}
```

__Sample Error Request Without JWT__

```
{
  "code": 403,
  "error": "Access Denied"
}
```