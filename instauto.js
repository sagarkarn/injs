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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var instagram_private_api_1 = require("instagram-private-api");
var fs = require("fs");
var util_1 = require("util");
var chalk = require("chalk");
var readFileAsync = util_1.promisify(fs.readFile);
var log = console.log;
var ig = new instagram_private_api_1.IgApiClient();
var username = 'toda.ydeals';
var password = 'Bunny@99050';
var like_in_hour = 25;
var comment_in_hour = 10;
var follow_in_hour = 15;
var like_in_days = 250;
var comment_in_days = 110;
var follow_in_days = 130;
var like_prob = 0.9;
var follow_prob = 0.7;
var comment_prob = 0.5;
var hashtags = [];
var comments = [];
var dont_unfollow = [];
var dont_like_contain_hashtags = [];
var hashtags_quantity = 90;
var randomize = true;
var unfollow_not_follow_back = '48:00:00';
var unfollow_all = "168:00:00";
var min_follower = 10;
var max_follower = 2500;
var min_following = 10;
var max_following = 3000;
var min_post = 1;
var relationship_ratio = 0.8;
var image_path;
var video_path;
var igtv_path;
var caption = "";
var loggedInUser = null;
function cookieSave(file) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = JSON.stringify(file);
            fs.writeFile("config/" + username + "/login.pkl", data, function (err) {
                if (err)
                    console.log('error found' + err);
            });
            return [2 /*return*/];
        });
    });
}
function cookieLoad() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFileAsync("config/" + username + "/login.pkl", 'utf-8')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function cookieExists() {
    return __awaiter(this, void 0, void 0, function () {
        var exist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exist = true;
                    return [4 /*yield*/, fs.stat("config/" + username + "/login.pkl", function (err) {
                            if (err) {
                                exist = false;
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, exist];
            }
        });
    });
}
ig.state.generateDevice(username);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var txt, txt1, txt2, cookie, err_1, err_2, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                txt = chalk.bold.cyanBright("|--------------------|\n|");
                txt1 = chalk.bold.redBright("instajs by sagarkarn");
                txt2 = chalk.bold.cyanBright("|\n|--------------------|");
                log(txt + txt1 + txt2);
                return [4 /*yield*/, get_setting()];
            case 1:
                _a.sent();
                createInitFolders();
                log(chalk.magenta('trying to login...'));
                return [4 /*yield*/, ig.simulate.preLoginFlow()];
            case 2:
                _a.sent();
                ig.request.end$.subscribe(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var serialized;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ig.state.serialize()];
                            case 1:
                                serialized = _a.sent();
                                delete serialized.constants;
                                return [4 /*yield*/, cookieSave(serialized)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, cookieExists()];
            case 3:
                if (!_a.sent()) return [3 /*break*/, 8];
                log(chalk.cyan('Cache found login using cache'));
                _a.label = 4;
            case 4:
                _a.trys.push([4, 7, , 8]);
                return [4 /*yield*/, cookieLoad()];
            case 5:
                cookie = _a.sent();
                return [4 /*yield*/, ig.state.deserialize(cookie)];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                log(err_1);
                return [3 /*break*/, 8];
            case 8:
                _a.trys.push([8, 10, , 11]);
                return [4 /*yield*/, ig.account.currentUser()];
            case 9:
                loggedInUser = _a.sent();
                return [3 /*break*/, 11];
            case 10:
                err_2 = _a.sent();
                loggedInUser = null;
                return [3 /*break*/, 11];
            case 11:
                if (!!loggedInUser) return [3 /*break*/, 15];
                log(chalk.cyan('Error with cahce or cache not found'));
                _a.label = 12;
            case 12:
                _a.trys.push([12, 14, , 15]);
                return [4 /*yield*/, ig.account.login(username, password)];
            case 13:
                loggedInUser = _a.sent();
                return [3 /*break*/, 15];
            case 14:
                err_3 = _a.sent();
                log(chalk.bgRed('Username or Passward wrong'));
                return [3 /*break*/, 15];
            case 15:
                if (!loggedInUser) {
                    log(loggedInUser);
                    log(chalk.red('Invalid Username or password login failed'));
                    return [2 /*return*/];
                }
                log(chalk.green('login success, username: ') + chalk.magenta(username));
                //  await like_by_tag(['funny','meme'],90);
                return [4 /*yield*/, foo()];
            case 16:
                //  await like_by_tag(['funny','meme'],90);
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
function like_by_tag(hashtag, quantity) {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rand(quantity, null)];
                case 1:
                    quantity = _a.sent();
                    for (i = 0; i < hashtag.length; i++) {
                        console.log(hashtag[i]);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function rand(n, m) {
    if (!m) {
        return Math.floor(Math.random() * n + 1);
    }
    else {
        var o = m - n;
        return Math.floor(Math.random() * o + n);
    }
}
function saveUser(user, types) {
    var dateObj = new Date();
    var date = dateObj.getTime();
    var data = user.toString() + "=>" + date + "\n";
    try {
        if (types == 'follow') {
            fs.appendFileSync("config/" + username + "/follower.txt", data);
        }
        if (types == 'like') {
            fs.appendFileSync("config/" + username + "/like.txt", data);
        }
        if (types == 'comment') {
            fs.appendFileSync("config/" + username + "/comment.txt", data);
        }
    }
    catch (err) {
        console.log(err);
    }
}
function like(mediaId) {
    return __awaiter(this, void 0, void 0, function () {
        var wait, result, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wait = rand(10000, 15000);
                    return [4 /*yield*/, delay(wait)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getHourData('like')];
                case 2:
                    if (!((_a.sent()) <= like_in_hour)) return [3 /*break*/, 10];
                    return [4 /*yield*/, getDailyData('like')];
                case 3:
                    if (!((_a.sent()) <= like_in_days)) return [3 /*break*/, 8];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, ig.media.like({
                            mediaId: mediaId,
                            d: 1,
                            moduleInfo: {
                                module_name: "profile",
                                user_id: loggedInUser.pk,
                                username: loggedInUser.username
                            }
                        })];
                case 5:
                    result = _a.sent();
                    if (result)
                        saveUser(mediaId, 'like');
                    return [2 /*return*/, true];
                case 6:
                    err_4 = _a.sent();
                    console.log(err_4);
                    return [2 /*return*/, false];
                case 7: return [3 /*break*/, 9];
                case 8:
                    log(chalk.red('daily like reached skiping like...'));
                    return [2 /*return*/, false];
                case 9: return [3 /*break*/, 11];
                case 10:
                    log(chalk.red('hour likes reached skiping like...'));
                    return [2 /*return*/, false];
                case 11: return [2 /*return*/, false];
            }
        });
    });
}
function choice(li) {
    return li[Math.floor(Math.random() * li.length)];
}
function comment(mediaId) {
    return __awaiter(this, void 0, void 0, function () {
        var r, commentR, text, wait, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    r = Math.random();
                    text = choice(comments);
                    wait = rand(10000, 25000);
                    return [4 /*yield*/, delay(wait)];
                case 1:
                    _a.sent();
                    if (!(r <= comment_prob)) return [3 /*break*/, 12];
                    return [4 /*yield*/, getHourData('comment')];
                case 2:
                    if (!((_a.sent()) <= comment_in_hour)) return [3 /*break*/, 10];
                    return [4 /*yield*/, getDailyData('comment')];
                case 3:
                    if (!((_a.sent()) <= comment_in_days)) return [3 /*break*/, 8];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    log('commenting ' + text);
                    return [4 /*yield*/, ig.media.comment({ mediaId: mediaId, text: text })];
                case 5:
                    _a.sent();
                    return [2 /*return*/, true];
                case 6:
                    err_5 = _a.sent();
                    log(err_5);
                    return [2 /*return*/, false];
                case 7: return [3 /*break*/, 9];
                case 8:
                    log(chalk.red('daily follow reached skiping follow...'));
                    return [2 /*return*/, false];
                case 9: return [3 /*break*/, 11];
                case 10:
                    log(chalk.red('hour follow reached skiping follow...'));
                    return [2 /*return*/, false];
                case 11: return [3 /*break*/, 13];
                case 12:
                    log(chalk.red('skiping...'));
                    return [2 /*return*/, false];
                case 13: return [2 /*return*/];
            }
        });
    });
}
function follow(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var r, wait, result, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    r = Math.random();
                    wait = rand(10000, 25000);
                    return [4 /*yield*/, delay(wait)];
                case 1:
                    _a.sent();
                    if (!(r <= follow_prob)) return [3 /*break*/, 12];
                    return [4 /*yield*/, getHourData('follow')];
                case 2:
                    if (!((_a.sent()) <= follow_in_hour)) return [3 /*break*/, 10];
                    return [4 /*yield*/, getDailyData('follow')];
                case 3:
                    if (!((_a.sent()) <= follow_in_days)) return [3 /*break*/, 8];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, ig.friendship.create(userId, 'profile')];
                case 5:
                    result = _a.sent();
                    if (result)
                        return [2 /*return*/, true];
                    return [3 /*break*/, 7];
                case 6:
                    err_6 = _a.sent();
                    console.log(err_6);
                    return [2 /*return*/, false];
                case 7: return [3 /*break*/, 9];
                case 8:
                    log(chalk.red('daily follow reached skiping follow...'));
                    return [2 /*return*/, false];
                case 9: return [3 /*break*/, 11];
                case 10:
                    log(chalk.red('hour follow reached skiping follow...'));
                    return [2 /*return*/, false];
                case 11: return [3 /*break*/, 13];
                case 12:
                    log(chalk.red('skiping...'));
                    return [2 /*return*/, false];
                case 13: return [2 /*return*/];
            }
        });
    });
}
function unfollow() {
    return __awaiter(this, void 0, void 0, function () {
        var unfollowData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUnfollowData()];
                case 1:
                    unfollowData = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getUnfollowData() {
    return __awaiter(this, void 0, void 0, function () {
        var timeList, time, r, currentTime, file, dataList, i, mediaId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeList = unfollow_all.split(":");
                    time = parseInt(timeList[0]) * 60 * 60 * 1000 + parseInt(timeList[1]) * 60 * 1000 + parseInt(timeList[2]) * 1000;
                    r = (parseInt(timeList[0]) - 2) * 60 * 60 * 1000 + (Math.random() * 240 * 60 * 1000 + 1);
                    currentTime = new Date().getTime();
                    return [4 /*yield*/, readFileAsync("config/" + username + "/follower.txt", 'utf-8')];
                case 1:
                    file = _a.sent();
                    dataList = file.split("\n");
                    if (dataList.length < 5) {
                        return [2 /*return*/, false];
                    }
                    for (i = 0; i < dataList.length; i++) {
                        if (parseInt(dataList[i].split('=>')[1]) + r >= new Date().getTime()) {
                            mediaId = dataList[i].split('=>')[0];
                            log("unfollowing " + mediaId);
                            // ig.friendship.destroy(mediaId);
                        }
                        else {
                            log("remaining ");
                            log(parseInt(dataList[i].split('=>')[1]) + r - new Date().getTime());
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getHourData(types) {
    return __awaiter(this, void 0, void 0, function () {
        var count, file, dataList, i, file, dataList, i, file, dataList, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    count = 0;
                    if (!(types == 'follow')) return [3 /*break*/, 2];
                    return [4 /*yield*/, readFileAsync("config/" + username + "/follower.txt", 'utf-8')];
                case 1:
                    file = _a.sent();
                    dataList = file.split("\n");
                    if (dataList.length < 5) {
                        return [2 /*return*/, dataList.length];
                    }
                    for (i = 0; i < dataList.length; i++) {
                        if (parseInt(dataList[i].split('=>')[1]) + 60 * 60 * 1000 >= new Date().getTime()) {
                            count++;
                        }
                    }
                    _a.label = 2;
                case 2:
                    if (!(types == 'like')) return [3 /*break*/, 4];
                    return [4 /*yield*/, readFileAsync("config/" + username + "/like.txt", 'utf-8')];
                case 3:
                    file = _a.sent();
                    dataList = file.split("\n");
                    if (dataList.length < 5) {
                        return [2 /*return*/, dataList.length];
                    }
                    for (i = 0; i < dataList.length; i++) {
                        if (parseInt(dataList[i].split('=>')[1]) + 60 * 60 * 1000 >= new Date().getTime()) {
                            count++;
                        }
                    }
                    _a.label = 4;
                case 4:
                    if (!(types == 'comment')) return [3 /*break*/, 6];
                    return [4 /*yield*/, readFileAsync("config/" + username + "/comment.txt", 'utf-8')];
                case 5:
                    file = _a.sent();
                    dataList = file.split("\n");
                    if (dataList.length < 5) {
                        return [2 /*return*/, dataList.length];
                    }
                    for (i = 0; i < dataList.length; i++) {
                        if (parseInt(dataList[i].split('=>')[1]) + 60 * 60 * 1000 >= new Date().getTime()) {
                            count++;
                        }
                    }
                    _a.label = 6;
                case 6: return [2 /*return*/, count];
            }
        });
    });
}
function getDailyData(types) {
    return __awaiter(this, void 0, void 0, function () {
        var count, file, dataList, i, file, dataList, i, file, dataList, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    count = 0;
                    if (!(types == 'follow')) return [3 /*break*/, 2];
                    return [4 /*yield*/, readFileAsync("config/" + username + "/follower.txt", 'utf-8')];
                case 1:
                    file = _a.sent();
                    dataList = file.split("\n");
                    if (dataList.length < 5) {
                        return [2 /*return*/, dataList.length];
                    }
                    for (i = 0; i < dataList.length; i++) {
                        if (parseInt(dataList[i].split('=>')[1]) + 24 * 60 * 60 * 1000 >= new Date().getTime()) {
                            count++;
                        }
                    }
                    _a.label = 2;
                case 2:
                    if (!(types == 'like')) return [3 /*break*/, 4];
                    return [4 /*yield*/, readFileAsync("config/" + username + "/like.txt", 'utf-8')];
                case 3:
                    file = _a.sent();
                    dataList = file.split("\n");
                    if (dataList.length < 5) {
                        return [2 /*return*/, dataList.length];
                    }
                    for (i = 0; i < dataList.length; i++) {
                        if (parseInt(dataList[i].split('=>')[1]) + 24 * 60 * 60 * 1000 >= new Date().getTime()) {
                            count++;
                        }
                    }
                    _a.label = 4;
                case 4:
                    if (!(types == 'comment')) return [3 /*break*/, 6];
                    return [4 /*yield*/, readFileAsync("config/" + username + "/comment.txt", 'utf-8')];
                case 5:
                    file = _a.sent();
                    dataList = file.split("\n");
                    if (dataList.length < 5) {
                        return [2 /*return*/, dataList.length];
                    }
                    for (i = 0; i < dataList.length; i++) {
                        if (parseInt(dataList[i].split('=>')[1]) + 24 * 60 * 60 * 1000 >= new Date().getTime()) {
                            count++;
                        }
                    }
                    _a.label = 6;
                case 6: return [2 /*return*/, count];
            }
        });
    });
}
function postHandler(post) {
    return __awaiter(this, void 0, void 0, function () {
        var fullUser, userFeed, wait, err_7, userPosts, userFirstPost, relevantPostsCount, userRR, mediaId, userId, likeR, waitTime, waitTimeF, commentR, followR, unfollowR, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ig.user.info(post.user.pk)];
                case 1:
                    fullUser = _a.sent();
                    userFeed = ig.feed.user(post.user.pk);
                    wait = rand(20000, 13000);
                    return [3 /*break*/, 3];
                case 2:
                    err_7 = _a.sent();
                    log(err_7);
                    return [3 /*break*/, 3];
                case 3: return [4 /*yield*/, delay(wait)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, userFeed.items()];
                case 5:
                    userPosts = _a.sent();
                    userFirstPost = null;
                    relevantPostsCount = 0;
                    userPosts.forEach(function (userPost) {
                        relevantPostsCount += 1;
                        if (userFirstPost == null) {
                            userFirstPost = userPost;
                        }
                    });
                    userRR = Math.round(fullUser.following_count / fullUser.follower_count * 100) / 100;
                    console.log("username => " + fullUser.username + " | follower => " + fullUser.follower_count + " | following =>" + fullUser.following_count + " | relationship ratio => " + userRR);
                    if (!(fullUser.follower_count < max_follower && fullUser.follower_count > min_follower)) return [3 /*break*/, 15];
                    if (!(userRR >= relationship_ratio)) return [3 /*break*/, 13];
                    console.log('Performing Action');
                    mediaId = userFirstPost.pk;
                    userId = fullUser.pk;
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 11, , 12]);
                    likeR = void 0;
                    waitTime = false;
                    waitTimeF = false;
                    return [4 /*yield*/, like(mediaId)];
                case 7:
                    likeR = _a.sent();
                    if (likeR)
                        console.log(chalk.green('like done'));
                    commentR = void 0;
                    return [4 /*yield*/, comment(mediaId)];
                case 8:
                    commentR = _a.sent();
                    if (commentR) {
                        saveUser(fullUser.username, 'comment');
                        console.log(chalk.green('comment done'));
                    }
                    else {
                        console.log(chalk.red("comment"));
                    }
                    followR = void 0;
                    return [4 /*yield*/, follow(userId)];
                case 9:
                    followR = _a.sent();
                    unfollowR = void 0;
                    return [4 /*yield*/, unfollow()];
                case 10:
                    unfollowR = _a.sent();
                    if (followR) {
                        saveUser(userId, 'follow');
                        console.log(chalk.green('follow done'));
                    }
                    else {
                        console.log(chalk.red("follow"));
                    }
                    return [3 /*break*/, 12];
                case 11:
                    err_8 = _a.sent();
                    console.log(err_8);
                    return [3 /*break*/, 12];
                case 12: return [3 /*break*/, 14];
                case 13:
                    log("relation ratio is " + userRR + chalk.yellow(' skiping...'));
                    _a.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    log('follower or followig is higher than max ' + chalk.yellow(' skiping...'));
                    _a.label = 16;
                case 16:
                    if (image_path.length > 1) {
                        if (timeForUploadPhoto()) {
                            log('timeForUploadPhoto');
                            uploadPhoto();
                        }
                        if (timeForUploadStory()) {
                            log('timeForUploadstory');
                            uploadStory();
                        }
                    }
                    if (video_path.length > 1) {
                        if (timeForUploadVideo()) {
                            log('timeForUploadvideo');
                            uploadVideo();
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
;
function foo() {
    return __awaiter(this, void 0, void 0, function () {
        var j, hashtagFeed, posts, total, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, delay(rand(2000, 10000))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ig.feed.news().items()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, delay(rand(2000, 10000))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, ig.feed.discover()];
                case 4:
                    _a.sent();
                    j = 0;
                    _a.label = 5;
                case 5:
                    if (!(j < hashtags.length)) return [3 /*break*/, 11];
                    hashtagFeed = ig.feed.tags(hashtags[j], 'recent');
                    return [4 /*yield*/, hashtagFeed.items()];
                case 6:
                    posts = _a.sent();
                    total = rand(hashtags_quantity - 10, hashtags_quantity + 10);
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i < total)) return [3 /*break*/, 10];
                    console.log('current hashtags [ ' + chalk.cyan(hashtags[j] + " => " + (j + 1) + "/" + (hashtags.length) + " ] " + i + "/" + total));
                    if (!posts[i])
                        return [3 /*break*/, 9];
                    // eslint-disable-next-line no-await-in-loop
                    return [4 /*yield*/, postHandler(posts[i])];
                case 8:
                    // eslint-disable-next-line no-await-in-loop
                    _a.sent();
                    ;
                    _a.label = 9;
                case 9:
                    i += 1;
                    return [3 /*break*/, 7];
                case 10:
                    j++;
                    return [3 /*break*/, 5];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function delay(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function get_setting() {
    return __awaiter(this, void 0, void 0, function () {
        var file, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fs.readFileSync('setting.txt', "utf-8")];
                case 1:
                    file = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'username')];
                case 2:
                    username = _b.sent();
                    log('username ' + username);
                    return [4 /*yield*/, getProperty(file, 'password')];
                case 3:
                    password = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'like_in_hour')];
                case 4:
                    like_in_hour = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'comment_in_hour')];
                case 5:
                    comment_in_hour = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'follow_in_hour')];
                case 6:
                    follow_in_hour = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'like_in_days')];
                case 7:
                    like_in_days = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'comment_in_days')];
                case 8:
                    comment_in_days = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'follow_in_days')];
                case 9:
                    follow_in_days = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'like_prob')];
                case 10:
                    like_prob = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'follow_prob')];
                case 11:
                    follow_prob = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'comment_prob')];
                case 12:
                    comment_prob = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'hashtags')];
                case 13:
                    hashtags = (_b.sent()).split(',');
                    hashtags = shuffle(hashtags);
                    return [4 /*yield*/, getProperty(file, 'comments')];
                case 14:
                    comments = (_b.sent()).split(',');
                    return [4 /*yield*/, getProperty(file, 'dont_unfollow')];
                case 15:
                    dont_unfollow = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'dont_like_contain_hashtags')];
                case 16:
                    dont_like_contain_hashtags = _b.sent();
                    _a = parseInt;
                    return [4 /*yield*/, getProperty(file, 'hashtags_quantity')];
                case 17:
                    hashtags_quantity = _a.apply(void 0, [_b.sent()]);
                    return [4 /*yield*/, getProperty(file, 'randomize')];
                case 18:
                    randomize = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'min_follower')];
                case 19:
                    min_follower = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'max_follower')];
                case 20:
                    max_follower = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'min_following')];
                case 21:
                    min_following = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'max_following')];
                case 22:
                    max_following = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'min_post')];
                case 23:
                    min_post = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'relationship_ratio')];
                case 24:
                    relationship_ratio = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'unfollow_not_follow_back')];
                case 25:
                    unfollow_not_follow_back = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'unfollow_all')];
                case 26:
                    unfollow_all = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'image_path')];
                case 27:
                    image_path = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'video_path')];
                case 28:
                    video_path = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'igtv_path')];
                case 29:
                    igtv_path = _b.sent();
                    return [4 /*yield*/, getProperty(file, 'caption')];
                case 30:
                    caption = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getProperty(file, property) {
    return __awaiter(this, void 0, void 0, function () {
        var indexProperty, indexStart, indexEnd, result;
        return __generator(this, function (_a) {
            indexProperty = file.indexOf(property + ":");
            if (indexProperty == -1)
                throw Error(property + ' not found in setting.txt');
            indexStart = file.indexOf('[', file.indexOf(property));
            indexEnd = file.indexOf("];", indexStart);
            result = file.substring(indexStart + 1, indexEnd);
            return [2 /*return*/, result];
        });
    });
}
function shuffle(li) {
    for (var i = li.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = li[i];
        li[i] = li[j];
        li[j] = temp;
    }
    return li;
}
function timeForUploadPhoto() {
    fs.stat("config/" + username + "/schedule_img.txt", function (err) {
        if (err) {
            createInitFolders();
        }
    });
    try {
        var data = fs.readFileSync("config/" + username + "/schedule_img.txt", 'utf-8');
        if (data.length > 1) {
            var scheduleTime = parseInt(data);
            var currentTime = new Date().getTime();
            if (scheduleTime < currentTime) {
                return true;
            }
            else
                return false;
        }
        else
            return true;
    }
    catch (err) {
        return true;
    }
    return false;
}
function uploadPhoto() {
    return __awaiter(this, void 0, void 0, function () {
        var path, result, _a, _b, nextschedule;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    path = choice(fs.readdirSync(image_path));
                    log(chalk.cyan('Image Uploading Started'));
                    _b = (_a = ig.publish).photo;
                    _c = {};
                    return [4 /*yield*/, readFileAsync(image_path + "/" + path)];
                case 1:
                    result = _b.apply(_a, [(_c.file = _d.sent(),
                            _c.caption = caption,
                            _c)]);
                    if (!result) return [3 /*break*/, 3];
                    nextschedule = new Date().getTime() + 90 * 60 * 1000 + Math.floor(Math.random() * 60 * 60 * 1000 + 1);
                    fs.writeFileSync("config/" + username + "/schedule_img.txt", nextschedule.toString());
                    return [4 /*yield*/, fs.rm(image_path + "/" + path, function (err) {
                            if (err) {
                                log(err);
                            }
                        })];
                case 2:
                    _d.sent();
                    return [2 /*return*/, true];
                case 3: return [2 /*return*/, false];
            }
        });
    });
}
function timeForUploadStory() {
    fs.stat("config/" + username + "/schedule_img.txt", function (err) {
        if (err) {
            createInitFolders();
        }
    });
    try {
        var data = fs.readFileSync("config/" + username + "/schedule_img.txt", 'utf-8');
        if (data.length > 1) {
            var scheduleTime = parseInt(data);
            var currentTime = new Date().getTime();
            if (scheduleTime < currentTime) {
                return true;
            }
            else
                return false;
        }
        else
            return true;
    }
    catch (err) {
        return true;
    }
    return false;
}
function uploadStory() {
    return __awaiter(this, void 0, void 0, function () {
        var path, root, imgPath, vdoPath, r, result, _a, _b, nextschedule, err_9;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    imgPath = choice(fs.readdirSync(image_path));
                    vdoPath = choice(fs.readdirSync(video_path).filter(function (path) { path.indexOf('.mp4') > -1; }));
                    r = Math.random();
                    if (r > 0.5) {
                        path = image_path + "/" + imgPath;
                        root = imgPath;
                    }
                    else {
                        path = video_path + "/" + vdoPath;
                        root = video_path;
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 5, , 6]);
                    _b = (_a = ig.publish).story;
                    _c = {};
                    return [4 /*yield*/, readFileAsync(path)];
                case 2:
                    result = _b.apply(_a, [(_c.file = _d.sent(),
                            _c)]);
                    if (!result) return [3 /*break*/, 4];
                    nextschedule = new Date().getTime() + 90 * 60 * 1000 + Math.floor(Math.random() * 60 * 60 * 1000 + 1);
                    fs.writeFileSync("config/" + username + "/schedule_img.txt", nextschedule.toString());
                    return [4 /*yield*/, fs.rm(path, function (err) {
                            if (err) {
                                log(err);
                            }
                            log("story removed");
                        })];
                case 3:
                    _d.sent();
                    return [2 /*return*/, true];
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_9 = _d.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function timeForUploadVideo() {
    fs.stat("config/" + username + "/schedule_vdo.txt", function (err) {
        if (err) {
            createInitFolders();
        }
    });
    try {
        var data = fs.readFileSync("config/" + username + "/schedule_vdo.txt", 'utf-8');
        if (data.length > 1) {
            var scheduleTime = parseInt(data);
            var currentTime = new Date().getTime();
            if (scheduleTime < currentTime) {
                return true;
            }
            else
                return false;
        }
        else
            return true;
    }
    catch (err) {
        return true;
    }
    return false;
}
function uploadVideo() {
    return __awaiter(this, void 0, void 0, function () {
        var path, coverPath, result, _a, _b, nextschedule, err_10;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    path = choice(fs.readdirSync(video_path).filter(function (path) { path.indexOf('.mp4') > -1; }));
                    if (path) {
                        coverPath = path.slice(0, path.indexOf(".mp4"));
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, , 7]);
                    _b = (_a = ig.publish).video;
                    _c = {};
                    return [4 /*yield*/, readFileAsync(video_path + "/" + path)];
                case 2:
                    _c.video = _d.sent();
                    return [4 /*yield*/, readFileAsync(video_path + "/" + coverPath)];
                case 3:
                    result = _b.apply(_a, [(_c.coverImage = _d.sent(),
                            _c.caption = caption,
                            _c)]);
                    if (!result) return [3 /*break*/, 5];
                    nextschedule = new Date().getTime() + 90 * 60 * 1000 + Math.floor(Math.random() * 60 * 60 * 1000 + 1);
                    fs.writeFileSync("config/" + username + "/schedule_vdo.txt", nextschedule.toString());
                    return [4 /*yield*/, fs.rm(video_path + "/" + path, function (err) {
                            if (err) {
                                log(err);
                            }
                            log("vodeo removed");
                        })];
                case 4:
                    _d.sent();
                    return [2 /*return*/, true];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_10 = _d.sent();
                    uploadIGTV(path, coverPath);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function uploadIGTV(path, coverPath) {
    return __awaiter(this, void 0, void 0, function () {
        var result, _a, _b, nextschedule, err_11;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, , 6]);
                    _b = (_a = ig.publish).igtvVideo;
                    _c = {};
                    return [4 /*yield*/, readFileAsync(video_path + "\n" + path)];
                case 1:
                    _c.video = _d.sent();
                    return [4 /*yield*/, readFileAsync(video_path + "\n" + path)];
                case 2:
                    result = _b.apply(_a, [(_c.coverFrame = _d.sent(),
                            _c.title = "",
                            _c)]);
                    if (!result) return [3 /*break*/, 4];
                    nextschedule = new Date().getTime() + 90 * 60 * 1000 + Math.floor(Math.random() * 60 * 60 * 1000 + 1);
                    fs.writeFileSync("config/" + username + "/schedule_vdo.txt", nextschedule.toString());
                    return [4 /*yield*/, fs.rm(video_path + "/" + path, function (err) {
                            if (err) {
                                log(err);
                            }
                            log("vodeo removed");
                        })];
                case 3:
                    _d.sent();
                    return [2 /*return*/, true];
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_11 = _d.sent();
                    return [2 /*return*/, false];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function createInitFolders() {
    log("creating files");
    var folders = [
        "config",
        "config/" + username,
    ];
    var files = [
        "config/" + username + "/follower.txt",
        "config/" + username + "/like.txt",
        "config/" + username + "/comment.txt",
        "config/" + username + "/schedule_img.txt",
        "config/" + username + "/schedule_vdo.txt",
        "config/" + username + "/schedule_igtv.txt",
        "config/" + username + "/login.pkl",
    ];
    var _loop_1 = function (i) {
        fs.stat(folders[i], function (err) {
            if (err) {
                fs.mkdir(folders[i], function (err) {
                    if (err) {
                        log(err);
                    }
                });
            }
        });
    };
    for (var i = 0; i < folders.length; i++) {
        _loop_1(i);
    }
    var _loop_2 = function (i) {
        fs.stat(files[i], function (err) {
            if (err) {
                fs.open(files[i], 'w', function (err) {
                    if (err) {
                        log(err);
                    }
                });
            }
        });
    };
    for (var i = 0; i < files.length; i++) {
        _loop_2(i);
    }
    // fs.writeFileSync(`config/${username}/schedule.txt`,"")
}
