"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserInDb = void 0;
const Mongo_1 = require("../../models/Mongo");
function checkIfUserInDb(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            Mongo_1.UserMongoose.findOneAndUpdate({ 'id_str': user.id_str }, user, (err, user) => {
                if (user) {
                    console.log(`User ${user.id_str}(${user.screen_name}) already in DB, just update.`);
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    });
}
exports.checkIfUserInDb = checkIfUserInDb;
