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
exports.checkIfTweetAlreadyInDb = exports.mensionIsAlreadyInDb = void 0;
const Mongo_1 = require("../../models/Mongo");
/*export async function returnMentionsNotAlreadyResponded(tweetMensions: Tweet[]): Promise<Tweet[]> {
    return new Promise((resolve) => {
        let returnTweet: Tweet[] = [];
        let in_for: boolean = true;
        for (const tweetMension of tweetMensions) {
            if (in_for) {
                TweetMongoose.find({ 'id_str': tweetMension.id_str }, (err, res) => {
                    if (!res) {
                        console.log(`Mension tweet ${tweetMension.id_str} by ${tweetMension.user.id_str} not in DB.`);
                        returnTweet.push(tweetMension);
                    } else {
                        console.log(`Mension tweet ${tweetMension.id_str} already in DB, stop loop`);
                        in_for = false;
                    }
                });
            } else {
                resolve(returnTweet);
            }
        }
        resolve(returnTweet);
    })
};*/
function mensionIsAlreadyInDb(tweetMension) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            Mongo_1.TweetsMensionsMongoose.find({ 'id_str': tweetMension.id_str }, (err, res) => {
                console.log(err);
                if (res.length > 0) {
                    console.log(`${tweetMension.id_str} already in DB.`);
                    resolve(true);
                }
                else {
                    console.log(`${tweetMension.id_str} not in DB, continue.`);
                    resolve(false);
                }
            });
        });
    });
}
exports.mensionIsAlreadyInDb = mensionIsAlreadyInDb;
function checkIfTweetAlreadyInDb(tweet) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            Mongo_1.TweetMongoose.find({ 'id_str': tweet.id_str }, (err, res) => {
                if (res.length > 0) {
                    console.log(`Tweet ${tweet.id_str} already in DB.`);
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    });
}
exports.checkIfTweetAlreadyInDb = checkIfTweetAlreadyInDb;
