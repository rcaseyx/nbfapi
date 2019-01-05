# nbfapi

## Documentation
### /dogs

In it's current state, the dogs endpoint accepts `GET` request types. Requests can include the following parameters:

`dogs/<dog_id>`

or

`dogs/<age_preference>/<size_preference>`

The second option allows for filtering based on user preferences. This filtering is done on the backend to improve frontend performance, rather than trying to filter in the React code.

### /users

The users endpoint can currently accept the following request types:

* `POST`
* `GET`
* `DELETE`

`POST` requests to the endpoint create new users. These requests require the following fields in the request body:

*  `username`
*  `password`

Other optional fields include `firstName` and `lastName`.

`GET` requests must include the user ID in the parameters. This is used to grab individual user information.

`DELETE` requests must also include the user ID in the parameters. This will remove the user from the database.

## Technology Used
| Backend |
| :-----: |
| [NodeJs](https://nodejs.org/en/about/) |
| [Express](https://expressjs.com/) |
| [MongoDb](https://www.mongodb.com/) |
| [Mongoose](https://mongoosejs.com/) |
| [JWT](https://jwt.io/) |
| [Passport](http://www.passportjs.org/) |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| [Morgan](https://www.npmjs.com/package/morgan/v/1.1.1) |
| [Faker](https://www.npmjs.com/package/faker) |
| [Mocha](https://mochajs.org/) |
| [Chai](https://www.chaijs.com/) |
