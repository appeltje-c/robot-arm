"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotState = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const robotStateSchema = new mongoose_1.default.Schema({
    coords: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});
exports.RobotState = mongoose_1.default.model("RobotState", robotStateSchema);
//# sourceMappingURL=RobotState.js.map