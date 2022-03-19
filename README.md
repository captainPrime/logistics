<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Kango

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
