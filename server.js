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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TweetController_1 = require("./controllers/TweetController");
const UserController_1 = require("./controllers/UserController");
const TweetControllerChecker_1 = require("./controllers/checkers/TweetControllerChecker");
const cron_1 = require("cron");
const dotenv_1 = __importDefault(require("dotenv"));

const net = require('net');
const client = net.connect({port: 80, host:"google.com"}, () => {
  console.log('MyIP='+client.localAddress);
});

dotenv_1.default.config();
function start() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Started');
        const lastMensions = yield TweetController_1.getLastMensions();
        try {
            for (var lastMensions_1 = __asyncValues(lastMensions), lastMensions_1_1; lastMensions_1_1 = yield lastMensions_1.next(), !lastMensions_1_1.done;) {
                const mensionTweet = lastMensions_1_1.value;
                const mensionIsInDb = yield TweetControllerChecker_1.mensionIsAlreadyInDb(mensionTweet);
                if (!mensionIsInDb) {
                    let tweetToSave;
                    try {
                        tweetToSave = yield TweetController_1.getTweetToSave(mensionTweet);
                    }
                    catch (err) {
                        console.log(err);
                    }
                    if (tweetToSave) {
                        if (yield TweetController_1.saveTweet(tweetToSave)) {
                            if (yield TweetController_1.saveTweetCallTheBot(mensionTweet)) {
                                // Save two users, User of the tweet and mension user
                                if ((yield UserController_1.saveUser(tweetToSave.user)) && (yield UserController_1.saveUser(mensionTweet.user))) {
                                    if (yield TweetController_1.responseToCallTweet(tweetToSave, mensionTweet)) {
                                        console.log(`Tweet and mension saved, check if we have another.`);
                                    }
                                    ;
                                }
                            }
                        }
                        else {
                            console.log(`Problem to insert tweet ${tweetToSave.id_str}`);
                        }
                    }
                }
                else {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (lastMensions_1_1 && !lastMensions_1_1.done && (_a = lastMensions_1.return)) yield _a.call(lastMensions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log('Ended');
    });
}
var job = new cron_1.CronJob('*/15 * * * * *', () => {
    start();
}, null, true, 'America/Los_Angeles');
