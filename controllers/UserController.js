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
exports.saveUser = void 0;
const Mongo_1 = require("../models/Mongo");
const UserControllerChecker_1 = require("./checkers/UserControllerChecker");
function saveUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userIsInDb = yield UserControllerChecker_1.checkIfUserInDb(user);
        return new Promise(resolve => {
            if (!userIsInDb) {
                Mongo_1.UserMongoose.create(user).then((data) => {
                    console.log(`Save user ${user.screen_name}.`);
                    data ? resolve(true) : resolve(false);
                });
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.saveUser = saveUser;
