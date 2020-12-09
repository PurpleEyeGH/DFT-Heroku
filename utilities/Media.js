"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMp4Link = void 0;
function getMp4Link(media_url) {
    if (media_url.includes('video_thumb')) {
        let mp4Link;
        mp4Link = media_url.replace('_thumb', '').replace('.jpg', '.mp4');
        return mp4Link;
    }
    else {
        return '';
    }
}
exports.getMp4Link = getMp4Link;
