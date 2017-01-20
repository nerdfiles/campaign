# Campaign with SparkPost

## Preparation

Check if you have `git`. Open _Terminal_:

    $ which git

If it's not installed, install from [Getting Started](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

With hope, you're good to go in a few minutes.

## Download

    $ git clone https://github.com/nerdfiles/campaign.git
    $ cd campaign

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
