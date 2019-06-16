# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


## Built With

- NodeJS v. 10.14.2- Serverside JavaScript (among other uses)
- CryptoJS v. 3.1.9- JavaScript library of cryptography standards
- ExpressJS v. 4.16.3- NodeJS Framework

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

```
npm init
```
- Start API server, with the port 8000
```
npm run start
```
## Requirements
- When fetching details on a block, the index must be included.
- When adding a new block, you must pass a JSON object using the key, data, with a string value.

## Testing

Open browser to http://localhost:8000/block/0 to see the 0th block information. 
Postman can be used to send GET or POST requests to test the API's functionality.

## API

All data is in JSON format, and expects body for POST to be in JSON as well.

## API

All data is in JSON format, and expects body for POST to be in JSON as well.

### Get block information

- **URL**
    http://localhost:8000/block/:height

- **Method**
    Get
    
- **URL Params**
*     :height  (Required) - Integer
        0 is to get the genesis block
    
- **Success response**
    Example of response
```javascript
    {
        "hash":"b39fa813ccc713e1970c4c4d91845e061ad65e145754d6f07d1ae542dc480c40",
        "height":0,
        "body":"First block in the chain - This is the Genesis block",
        "time":"1545128444",
        "previousBlockHash":""
    }
```

- **Error response**
    Any error retrieving a block is embeded in a 404 error
    *Code*: 404
    *Content*: {"message": "Error message"}
    
### Posting a new block

- **URL**
    http://localhost:8000/block

- **Method**
    Post
    
- **Payload**
    *     header  (Required)
            'Content-Type: application/json'
    *    "body"(Any string i.e.:)
        "Testing block with test string data"
        
    
- **Success response**
    Example of response
    ```javascript
        {
            "hash":"207d1a8aa10f6a50c9f41edfcb70709675a90865b83d472a084c98ec97ab24de",
            "height":1,
            "body":"Testing block with test string data",
            "time":"1546618707",
            "previousBlockHash":"b39fa813ccc713e1970c4c4d91845e061ad65e145754d6f07d1ae542dc480c40"
        }
    
    ```

- **Error response**
    If not body sent, send an error back with this message:
    *Code*: 400
    *Content*: {"message": "Fill the body parameter"}


## Author

Antoni Martin

## Aknowledgment

Udacity