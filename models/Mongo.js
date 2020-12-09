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
exports.TweetEntitieMediaMongoose = exports.TweetEntitieUrlsMongoose = exports.TweetEntitieMongoose = exports.UserMongoose = exports.TweetsMensionsMongoose = exports.TweetMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGO_DB;
;
let database;
mongoose_1.default.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
database = mongoose_1.default.connection;
database.once("open", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to database");
}));
database.on("error", () => {
    console.log("Error connecting to database");
});
const TweetEntitieUrlsSchema = new mongoose_1.default.Schema({
    url: { type: String, required: true },
    expended_url: { type: String, required: false },
    display_url: { type: String, required: true },
});
const TweetEntitieMediasSchema = new mongoose_1.default.Schema({
    id_str: { type: String, required: true },
    media_url: { type: String, required: true },
    media_url_https: { type: String, required: false },
    display_url: { type: String, required: false },
    expanded_url: { type: String, required: false },
    type: { type: String, required: false },
    media_video_url: { type: String, required: false },
});
const TweetEntitieSchema = new mongoose_1.default.Schema({
    urls: [TweetEntitieUrlsSchema],
    media: [TweetEntitieMediasSchema]
});
const TweetSchema = new mongoose_1.default.Schema({
    created_at: { type: String, required: true },
    id: { type: Number, required: true },
    id_str: { type: String, required: true },
    text: { type: String, required: true },
    in_reply_to_status_id_str: { type: String, required: false },
    in_reply_to_status_id: { type: Number, required: false },
    in_reply_to_user_id_str: { type: String, required: false },
    in_reply_to_screen_name: { type: String, required: false },
    url: { type: String, required: false },
    source: { type: String, required: false },
    lang: { type: String, required: false },
    user_id: { type: String, required: true },
    save_date: { type: Date, required: true },
    entities: TweetEntitieSchema
    //entities: {type: Schema.Types.ObjectId, ref: 'TweetEntitie', required: false }
});
const UserSchema = new mongoose_1.default.Schema({
    id_str: { type: String, required: true },
    name: { type: String, required: false },
    screen_name: { type: String, required: true },
    location: { type: String, required: false },
    description: { type: String, required: false },
    created_at: { type: String, required: true },
    url: { type: String, required: false },
    verified: { type: String, required: true },
    profile_image_url: { type: String, required: false },
    profile_image_url_https: { type: String, required: false },
    profile_banner_url: { type: String, required: false }
});
exports.TweetMongoose = mongoose_1.default.model("Tweet", TweetSchema);
exports.TweetsMensionsMongoose = mongoose_1.default.model("TweetsMensions", TweetSchema);
exports.UserMongoose = mongoose_1.default.model("User", UserSchema);
exports.TweetEntitieMongoose = mongoose_1.default.model("TweetEntitie", TweetEntitieSchema);
exports.TweetEntitieUrlsMongoose = mongoose_1.default.model("TweetEntitieUrls", TweetEntitieUrlsSchema);
exports.TweetEntitieMediaMongoose = mongoose_1.default.model("TweetEntitieMedias", TweetEntitieMediasSchema);
