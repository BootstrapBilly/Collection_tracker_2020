# Collection tracker

## Commands

##### Start the project
```javascript 
npm start
```

##### Run test suite with cypress
```javascript 
npm run cypress
```

## Live site

 [https://collectiontracker-57b9e.web.app/](https://collectiontracker-57b9e.web.app/) - Please note, it is hosted on a Heroku server, which may take up to 10 seconds to wake up on the first request.

## About this project

This project was built to track my collection of Guiness Book Records. Currently it has 46/65 books.

<img src="./samples/collection.jpg" height="480" width="360">

## Some sample books

#### 1968 - Poor condition

<img src="./samples/1968.jpg" height="480" width="360">

#### 1988 - Fair condition

<img src="./samples/1988.jpg" height="480" width="360">

#### 2007 - Mint condition

<img src="./samples/2007.jpg" height="480" width="360">

#### 2020 - Mint condition

<img src="./samples/2020.jpg" height="480" width="360">




## Backend

 [https://github.com/BootstrapBilly/Collection_tracker_2020_api](https://github.com/BootstrapBilly/Collection_tracker_2020_api)



## Databases


User submitted images are stored directly in firebase, then the generated url is stored in MongoDb

Everything else is processed by the API and stored in MongoDb





