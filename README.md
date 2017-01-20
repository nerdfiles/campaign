# Campaign with SparkPost

Greatly depends on [ZURB Foundation for Emails](https://github.com/zurb/foundation-emails-template), but without the AWS stuff. In progress. There's gotta be some smart-ass reason to use `node-libcurl` over `request`, right? Check out [node-sparkpost](https://github.com/SparkPost/node-sparkpost) for tested code.

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

### Testing

    $ npm run mail/testing

Be sure to check out [Content](https://github.com/nerdfiles/campaign#content) before sending.

#### Update `TEST_RECIPIENT` file

    email@domain.com

### Create `FROM` file

    sandbox@sparkpostbox.com

Should specify your domain listed on [sparkpost.com](https://sparkpost.com) when done testing. (No file extension is necessary. You can use TextEdit.)

### Create `HTTPHEADER` file

    {
      "HTTPHEADER": [
        "User-Agent: node-libcurl/1.0",
        "Authorization: SPARKPOST_API_KEY",
        "Content-Type: application/json"
      ]
    }

(No file extension is necessary. You can use TextEdit.)

### Create `grouped.deduped.txt` file

    email1@domain.com
    email2@domain.com

## Content

    ./dist/        # templates generated by build
    ./distText/    # hand-made e-mail templates
    ./subjectText/ # corresponding subject lines

