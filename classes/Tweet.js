"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
class Tweet {
    constructor(c, i, is, t, ir1, ir1i, ir2, ir3, ur, u, s, l, u_i, e) {
        this.created_at = c;
        this.id = i;
        this.id_str = is;
        this.text = t;
        this.in_reply_to_status_id_str = ir1;
        this.in_reply_to_status_id = ir1i;
        this.in_reply_to_user_id_str = ir2;
        this.in_reply_to_screen_name = ir3;
        this.url = ur;
        this.user = u;
        this.source = s;
        this.lang = l;
        this.user_id = u_i;
        this.entities = e;
        this.save_date = new Date();
    }
}
exports.Tweet = Tweet;
