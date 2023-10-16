# Software Challenge: Jenny's Fruit Shop POS

This is my front end code for the above challenge. 
Server code:
[Link to server code](https://github.com/berwyntan/raid-backend)

## User Journey

![user journey](https://github.com/berwyntan/raid/blob/main/README/Note%2012%20Oct%202023.png)

## Workflow

![work flow](https://github.com/berwyntan/raid/blob/main/README/Note%2012%20Oct%202023%202.png)

## Libraries used

### Front end

NextJS
React Table

### Server

NodeJS
Express
Mongoose
Cors
Dotenv

### Database

MongoDB

## Code Features

- Fruits and their price is stored on database and is fetched on load with useEffect
- Validation: The form entry is checked for spelling and number of words
    - The spelling of the fruits are checked with the list loaded from server, upper or lowercase doesn't matter
    - 1 order should have 2 words - eg. apple x2
    - 2 orders together should have 5 words - eg. apple x2 and banana x1
    - An error message will pop up if the spelling and/or number of words don't add up.
- Validation passed: if there are no errors, the data will be populated in table form
- POST to server: if validation passes, the data will added to the database

## Challenges

Not too familiar with NextJS 13, I have done tutorials on NextJS but they were older versions and the tutorials did not use MongoDB.
Was unable to put the server code on NextJS as I had trouble at first linking MongoDB. (Left some of the code there as proof!) Then after linking up MongoDB, I could not bring JSON files from server/database to client. Due to time constraints, I pivoted and used a separate server using NodeJS. 
It was my first time using React Table and the table could look better.

## Improvements

- Better code layout, separating the validation and calculations functions from page.js
- Inventory management for the fruits: adding the stock count to the database and then retrieving and updating the stock count on client side before updating database
- CSS
- Dropdown selections for the fruits and quantities instead of typing it in, which is error prone