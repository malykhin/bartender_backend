## TODO:

- finish recipe service;
- add `Machine` model, DAO, service - it should store and control the bartender bot config;
- create `Machine` provider, it should receive recipe definition and run it with `Bartender` provider
- define message based protocol to interact with front-end
- add socket.io for front-end communication. Use connections with token as master - for machine configuration, others - just for machine interaction.
