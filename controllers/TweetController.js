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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseToCallTweet = exports.saveTweetCallTheBot = exports.saveTweet = exports.getTweetToSave = exports.getLastMensions = void 0;
const twit_1 = __importDefault(require("twit"));
const Mongo_1 = require("../models/Mongo");
const Tweet_1 = require("../classes/Tweet");
const TweetResponse_1 = __importDefault(require("../utilities/TweetResponse"));
const Media_1 = require("../utilities/Media");
const class_transformer_1 = require("class-transformer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const twit = new twit_1.default({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true,
});
function getLastMensions() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            twit.get("statuses/mentions_timeline", (err, data) => {
                const mensionsObject = class_transformer_1.plainToClass(Tweet_1.Tweet, data);
                resolve(mensionsObject);
            });
        });
    });
}
exports.getLastMensions = getLastMensions;
function getTweetToSave(tweet) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            twit.get(`statuses/show/${tweet.in_reply_to_status_id_str}`, (err, data) => {
                const tweetToSave = class_transformer_1.plainToClass(Tweet_1.Tweet, data);
                if (tweetToSave instanceof Tweet_1.Tweet) {
                    if (tweetToSave.id_str != undefined) {
                        if (tweetToSave.in_reply_to_screen_name != 'DontForgetTweet') {
                            console.log(`Get tweet ${tweetToSave.id_str}.`);
                            resolve(tweetToSave);
                        }
                    }
                    reject('Tweet delete or no response to DontForgetTweet');
                }
            });
        });
    });
}
exports.getTweetToSave = getTweetToSave;
function saveTweet(tweet) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            tweet.user_id = tweet.user.id_str;
            if (tweet.entities.media && tweet.entities.media.length > 0) {
                for (const tem of tweet.entities.media) {
                    tem.media_video_url = Media_1.getMp4Link(tem.media_url);
                }
            }
            Mongo_1.TweetMongoose.create(tweet, (err) => {
                console.log(`Save tweet ${tweet.id_str}.`);
                if (err) {
                    console.log(err);
                    resolve(false);
                }
                /*if(tweet.entities.urls && tweet.entities.urls.length > 0) {
                  for(const teu of tweet.entities.urls) {
                    teu.id_str_source_tweet = tweet.id_str;
                  }
                  TweetEntitieUrlsMongoose.create(tweet.entities.urls, (err: any, data) => {
                    if (data.length > 0) { console.log(`Save tweet entities urls.`); }
                    if (err) { resolve(false); }
                  });
                }
                if(tweet.entities.media && tweet.entities.media.length > 0) {
                  for(const tem of tweet.entities.media) {
                    tem.id_str_source_tweet = tweet.id_str;
                    tem.media_video_url = getMp4Link(tem.media_url);
                  }
                  TweetEntitieMediaMongoose.create(tweet.entities.media, (err: any, data) => {
                    if (data.length > 0) { console.log(`Save tweet entities media.`); }
                    if (err) { resolve(false); }
                  })
                }*/
                resolve(true);
            });
        });
    });
}
exports.saveTweet = saveTweet;
function saveTweetCallTheBot(tweet) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            tweet.user_id = tweet.user.id_str;
            Mongo_1.TweetsMensionsMongoose.create(tweet).then((data) => {
                console.log(`Save tweet mension was called the bot ${tweet.id_str}.`);
                data ? resolve(true) : resolve(false);
            });
        });
    });
}
exports.saveTweetCallTheBot = saveTweetCallTheBot;
function responseToCallTweet(tweetToSave, mensionTweet) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            twit.post("statuses/update", { in_reply_to_status_id: mensionTweet.id_str, auto_populate_reply_metadata: true, status: TweetResponse_1.default(mensionTweet) }, (err, data, response) => {
                console.log(`Response at ${mensionTweet.user.screen_name} for tweet ${tweetToSave.id_str}.`);
                data ? resolve(true) : resolve(false);
            });
        });
    });
}
exports.responseToCallTweet = responseToCallTweet;
