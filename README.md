Random People Viewer
======================

An example application that connects to the Random User Generator API
and generates a set of random users. Users can then be clicked on to
retrieve their details.

[Demo](http://ericliao.github.io/eric-random-people/)

## Running locally ##

To run locally you will need to install [Node.js](http://nodejs.org) and
[grunt](http://github.com/gruntjs/grunt).

``` bash
# Clone the repository.
git clone git://github.com/ericliao/eric-random-people.git

# Change directory into it.
cd eric-random-people

# Install the Node dependencies and Bower dependencies.
npm install
bower install

# Build and run the server
grunt dev
```

The app will be accessible [here](http://localhost:9000/).

You can also generate/view a single person [here](http://localhost:9000/#person/{seed}).

## Tests ##

Once ```grunt dev``` has been run, the unit tests are accessible [here](http://localhost:9000/test/index.html).

## Deployment ##

``` bash
# Change directory into it.
cd eric-random-people

# Install the Node dependencies and Bower dependencies.
npm install
bower install

# Build the distribution
grunt dist
```
Then simply put:
* index.html
* dist/

on a server.