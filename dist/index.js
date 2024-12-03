"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = require("./Infrastructure/Http/server");
const config_1 = require("./config/config");
server_1.app.listen(config_1.appConfig.port, () => {
    console.log(`Server is running on port ${config_1.appConfig.port}`);
});
