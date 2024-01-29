"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const robotSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true
    },
    type: {
        type: String,
        enum: ['crane', 'truck']
    },
    actuators: {
        type: String
    }
}, {
    timestamps: true
});
exports.Robot = mongoose_1.default.model("Robot", robotSchema);
//# sourceMappingURL=Robot.js.map