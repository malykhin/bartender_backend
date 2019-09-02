# bartender_backend

Backend service for [bartender_frontend](https://github.com/malykhin/bartender_frontend).
Works with hardware controller [bartender_arduino](https://github.com/malykhin/bartender_arduino).

1. `npm i`
2. `cp .env_sample .env`
3. `npm run start:dev`

## TODO:

- ~~finish recipe service;~~
- ~~add `Machine` model, DAO, service - it should store and control the bartender bot config;~~
- create `Machine` provider, it should receive recipe definition and run it with `Bartender` provider;
- add graphql types / resolvers for manage entities ~~slot~~, ~~slots~~, ~~liquids~~, ~~machine~~;
- modify graphql resolvers for hardware interactions;
- add graphql subscribers to check machine statuses;
