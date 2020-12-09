"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(i, n, s, l, d, c, u, v, piu, piuh, pbu) {
        this.id_str = i;
        this.name = n;
        this.screen_name = s;
        this.location = l;
        this.description = d;
        this.created_at = c;
        this.url = u;
        this.verified = v;
        this.profile_image_url = piu;
        this.profile_image_url_https = piuh;
        this.profile_banner_url = pbu;
    }
}
exports.User = User;
