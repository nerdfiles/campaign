# Campaign with SparkPost

## Install

    $ npm install

## Start

    $ npm run start

## Compile

    $ npm run zip

## Build

    $ npm run build

## Mail

    $ npm run mail

### Create `HTTPHEADER` file

    {
      "HTTPHEADER": [
        "User-Agent: node-libcurl/1.0",
        "Authorization: SPARKPOST_API_KEY",
        "Content-Type: application/json"
      ]
    }

### Create `grouped.deduped.txt` file

    email1@domain.com
    email2@domain.com
