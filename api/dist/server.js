"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const bluebird_1 = __importDefault(require("bluebird"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default.connect("mongodb://storage:27017/monumental", {}).then(() => {
    // Start Express server
    const server = app_1.default.listen(3000, () => {
        console.log("  App is running at http://localhost:%d", 3000);
        console.log("  Press CTRL-C to stop\n");
    });
    // setup websockets channel
    // Websockets(server)
}).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    process.exit(1);
});
//# sourceMappingURL=server.js.map