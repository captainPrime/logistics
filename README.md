<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# QuickBunny Logistics

Server side source code repository for [the kango webapp](https://kango.app)

# API Development Checklist

- [x] User onboarding
- [x] Authentication and Authorization
- [x] Wallet funding
- [ ] Withdrawals
- [x] Upgrading of Users -> Hoppers
- [ ] Logistics & Delivery services
  - [x] Hopper update location
  - [x] Requesting a hopper -- done but not tested
  - [ ] Price Determination algorithm
  - [x] Creating an order -- done but not tested
  - [ ] Finding a hopper
  - [ ] Tracking a hopper
  - [ ] Rating a hopper

# Real Time integration

Real time integrations should be done by long polling for now. Future updates would see the rise of web sockets for propert real time handling

# Development

This development environment setup requires docker and docker-compose to have been properly installed on the host's machine

```
# Clone the repository and cd into repository
$ git clone https://git.heroku.com/kango-staging.git

# Ensure .env file is set. make sure to set all proper env variables to the appropriate values for your enviroment
$ cp .env.example .env

------------------------------------------------------------------------------------------------------------------------------------------
The previous commands are to be run once (when cloning the app). However, the following command is used to start the containers everytime.
------------------------------------------------------------------------------------------------------------------------------------------
# Build and start the containers
$ docker-compose up

🤩, you can now headover to http://localhost:9050/api-spec/ to see the documentation and confirm setup success!
```
