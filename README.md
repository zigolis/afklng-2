# AFKLng-2x

## Requirements

These are the basic requirements for your application:

* ```node``` v5.8.0+
* ```npm```  v3.7.3+
* ```angular-cli```  v1.0.0-beta.22-1


## Instalation

First of all, clone this repository:

	git clone git@github.com:zigolis/afklng-2.git

After that, enter to the folder $ cd afklng-2 and install the dependencies:

	npm install

To build and start the application run the npm start script

	npm start

And finally set the node / proxy server up running

	npm run mock

If you want to run the end to end tests, you only need to call npm test

	npm test


Your app should be running on ```http://localhost:4200/``` and the mock server on ```http://localhost:3000/api/booking/code/name```