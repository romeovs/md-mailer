# md-mailer

A simple tool to send markdown emails from the command line.

## Installation

    npm install -g md-mailer

## Usage

`md-mailer` allows one to write emails in markdown, it supports
embedded images and attachments.

To use it, first prepare your email:

    ---
    from: John Appleseed <john@example.com>
    to:   Jack Bananapeel <jack@example.com>, Sue Orangeskin <sue@example.com>
    cc:   John Appleseed <me@home.be>
    subject: An example email!
    ---

    This is an example email! **Bold** text etc, it all works!

    ![an inline image](./image.jpg)

    greets,
    John

    ![an attached pdf](./document.pdf)

Just embed all the sending information in the frontmatter
preamble of the email file.

To send the email, invoke `md-mailer`:

    md-mailer -u <user> -h <host> -p <pass> --ssl file.md

## Options

#### `-h`, `--host`, `$MDMAILER_HOST`
The hostname of the mail server to use. (Example: `smtp.gmail.com`).

#### `-P`, `--port`, `$MDMAILER_PORT`
The port of the mail server.

#### `-u`, `--user`, `$MDMAILER_USER`
The username of the account that should be used at the mail provider.

#### `-p`, `--pass`, `$MDMAILER_PASS`
The password of the account that should be used at the mail provider.

*Note:* using the command line arguments like this might be unsafe,
because the password will be stored cleatext in your shell history.
Prefer setting the environment variable `$MDMAILER_PASS`.

#### `--ssl`
If present, `md-mailer` uses SSL.

#### `-d`, `--dry-run`
If present, `md-mailer` will not actually send any emails.

#### `-?`. `--help`
Show the help text.

## Header options
These options can be set from the email message header.

### `from`
The sender of the message. Can be of the form `Name <email@host>` or
`email@host`.

### `to`
A list of recipients to which the message will be sent.
You can enter a comma-separated list of emails (in the formats
described in `from`) or use yamls list syntax:

    to:
    - Sue Orangeskin <sue@example.com> 
    - john@example.com

is equivalent to

    to: Sue Orangesking <sue@example.com>, john@example.com

### `cc`, `bcc`
The list of carbon copy and blind carbon copy recipients, the format
used in `to` is also valid here.

### `subject`
The subject of the message.


