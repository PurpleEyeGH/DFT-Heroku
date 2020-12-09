"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitieMedia = exports.EntitieUrls = exports.Entitie = void 0;
class Entitie {
    constructor(u, m) {
        this.urls = u;
        this.media = m;
    }
}
exports.Entitie = Entitie;
class EntitieUrls {
    //id_str_source_tweet: string;
    constructor(u, e, d /*, i: string*/) {
        this.url = u;
        this.expended_url = e;
        this.display_url = d;
        //this.id_str_source_tweet = i;
    }
}
exports.EntitieUrls = EntitieUrls;
class EntitieMedia {
    //id_str_source_tweet: string;
    constructor(i, mu, muh, d, e, t, mvu /*, isst: string*/) {
        this.id_str = i;
        this.media_url = mu;
        this.media_url_https = muh;
        this.display_url = d;
        this.expanded_url = e;
        this.type = t;
        this.media_video_url = mvu;
        //this.id_str_source_tweet = isst;
    }
}
exports.EntitieMedia = EntitieMedia;
