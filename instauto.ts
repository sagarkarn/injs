import { IgApiClient } from 'instagram-private-api';
import * as fs from 'fs';
import { promisify } from 'util';
import * as chalk from 'chalk';

const readFileAsync = promisify(fs.readFile);
const log = console.log;
const ig = new IgApiClient();

let username = 'toda.ydeals';
let password = 'Bunny@99050';

let like_in_hour = 25;
let comment_in_hour = 10;
let follow_in_hour = 15;
let like_in_days = 250;
let comment_in_days = 110;
let follow_in_days = 130;
let like_prob = 0.9;
let follow_prob = 0.7;
let comment_prob = 0.5;
let hashtags = [];
let comments = [];
let dont_unfollow = [];
let dont_like_contain_hashtags = [];
let hashtags_quantity = 90;
let randomize = true;
let unfollow_not_follow_back = 48;
let unfollow_all = 168;
let min_follower = 10;
let max_follower = 2500;
let min_following = 10;
let max_following = 3000;
let min_post = 1;
let relationship_ratio = 0.8;

let image_path;
let video_path;
let igtv_path;

let caption: string = "";

let loggedInUser = null;


async function cookieSave(file: object) {
  const data = JSON.stringify(file);
  fs.writeFile(`config/${username}/login.pkl`, data, function (err) {
    if (err) console.log('error found' + err);
  });
  //console.log(data);
}

async function cookieLoad() {
  return await readFileAsync(`config/${username}/login.pkl`, 'utf-8');
}

async function cookieExists() {
  let exist = true;
  await fs.stat(`config/${username}/login.pkl`, (err) => {
    if (err) {
      exist = false;
    }
  });
  return exist;
}

ig.state.generateDevice(username);


(async () => {

  const txt = chalk.bold.cyanBright("|--------------------|\n|");
  const txt1 = chalk.bold.redBright("instajs by sagarkarn");
  const txt2 = chalk.bold.cyanBright("|\n|--------------------|");

  log(txt + txt1 + txt2);
  await get_setting();
  createInitFolders();

  log(chalk.magenta('trying to login...'));

  await ig.simulate.preLoginFlow()
  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants;
    await cookieSave(serialized);
  });

  if (await cookieExists()) {
    log(chalk.cyan('Cache found login using cache'));
    try {
      let cookie = await cookieLoad();
      await ig.state.deserialize(cookie);
    }
    catch (err) {
      log(err);
    }
  }
  try {
    loggedInUser = await ig.account.currentUser();
  }
  catch (err) {
    loggedInUser = null;
  }

  if (!loggedInUser) {
    log(chalk.cyan('Error with cahce or cache not found'));
    try {
      loggedInUser = await ig.account.login(username, password);
    }
    catch (err) {
      log(chalk.bgRed('Username or Passward wrong'));
    }
  }
  if (!loggedInUser) {
    log(loggedInUser);
    log(chalk.red('Invalid Username or password login failed'));
    return;
  }

  log(chalk.green('login success, username: ') + chalk.magenta(username));
  //  await like_by_tag(['funny','meme'],90);
  await foo();



})();


async function like_by_tag(hashtag, quantity) {

  quantity = await rand(quantity, null);
  for (let i = 0; i < hashtag.length; i++) {
    console.log(hashtag[i]);
  }
}

function rand(n, m) {
  if (!m) {
    return Math.floor(Math.random() * n + 1);
  }
  else {
    const o = m - n;
    return Math.floor(Math.random() * o + n);
  }
}

function saveUser(user, types) {
  const dateObj = new Date();

  let date = dateObj.getTime();
  const data = user.toString() + "=>" + date + "\n";

  try {
    if (types == 'follow') {
      fs.appendFileSync(`config/${username}/follower.txt`, data);
    }
    if (types == 'like') {
      fs.appendFileSync(`config/${username}/like.txt`, data);
    }
    if (types == 'comment') {
      fs.appendFileSync(`config/${username}/comment.txt`, data);
    }
  }
  catch (err) {
    console.log(err)
  }

}
async function like(mediaId) {

  const wait = rand(10000, 15000);
  await delay(wait);
  if (await getHourData('like') <= like_in_hour) {
    if (await getDailyData('like') <= like_in_days) {
      try {
        const result = await ig.media.like({
          mediaId: mediaId,
          d: 1,
          moduleInfo: {
            module_name: "profile",
            user_id: loggedInUser.pk,
            username: loggedInUser.username,
          }
        });
        if (result)
          saveUser(mediaId, 'like');
        return true;
      }
      catch (err) { console.log(err); return false; }
    } else {
      log(chalk.red('daily like reached skiping like...'));
      return false;
    }
  }
  else {
    log(chalk.red('hour likes reached skiping like...'));
    return false;
  }
  return false;
}

function choice(li) {
  return li[
    Math.floor(Math.random() * li.length)
  ];
}

async function comment(mediaId: string) {

  const r = Math.random();
  let commentR;
  let text = choice(comments);

  const wait = rand(10000, 25000);
  await delay(wait);

  if (r <= comment_prob) {
    if (await getHourData('comment') <= comment_in_hour) {
      if (await getDailyData('comment') <= comment_in_days) {

        try {
          log('commenting ' + text);
          await ig.media.comment({ mediaId, text });
          return true;
        }
        catch (err) { log(err); return false; }
      }
      else {
        log(chalk.red('daily follow reached skiping follow...'));
        return false;
      }
    }
    else {
      log(chalk.red('hour follow reached skiping follow...'));
      return false;
    }
  }
  else {
    log(chalk.red('skiping...'));
    return false;
  }
}

async function follow(userId: number | string) {

  const r = Math.random();
  const wait = rand(10000, 25000);
  await delay(wait);

  if (r <= follow_prob) {
    if (await getHourData('follow') <= follow_in_hour) {
      if (await getDailyData('follow') <= follow_in_days) {
        try {
          let result = await ig.friendship.create(userId, 'profile')
          if (result)
            return true;
        }
        catch (err) { console.log(err); return false; }
      }
      else {
        log(chalk.red('daily follow reached skiping follow...'));
        return false;
      }
    }
    else {
      log(chalk.red('hour follow reached skiping follow...'));
      return false;
    }
  }
  else {
    log(chalk.red('skiping...'))
    return false;
  }
}

async function unfollow() {
  let unfollowData = await getUnfollowData();
}

async function getUnfollowData() {

  let time = (unfollow_not_follow_back - 2) * 60 * 60 * 1000 + (Math.random() * 240 * 60 * 1000 + 1)
  let currentTime = new Date().getTime();

  const file = await readFileAsync(`config/${username}/follower.txt`, 'utf-8');
  const dataList = file.split("\n");

  if (dataList.length < 1) {
    return false;
  }
  for (let i = 0; i < dataList.length; i++) {
    if (currentTime - parseInt(dataList[i].split('=>')[1]) > time) {
      let mediaId = dataList[i].split('=>')[0];
      log("unfollowing " + mediaId);
      const r = Math.random();
      const wait = rand(10000, 25000);
      await delay(wait);
      
      let result = await ig.friendship.destroy(mediaId);
      if(result){
        let user = await ig.user.accountDetails(mediaId)
        log(chalk.bgRedBright(user.username + "unfollowed"))
        dataList.splice(i,1);
        i--;
      }
    }
    else {

      // log("remaining ")
      // log((currentTime - parseInt(dataList[i].split('=>')[1]) + Math.floor(time))/1000/60)
    }
  }
  let textData = ""
  for (let i = 0; i < dataList.length; i++){
    textData += dataList[i];
    if(dataList[i] != ""){
      textData += "\n";
    }
  }
  fs.writeFileSync(`config/${username}/follower.txt`,textData)
}

async function getHourData(types) {
  let count = 0;
  if (types == 'follow') {
    const file = await readFileAsync(`config/${username}/follower.txt`, 'utf-8');
    const dataList = file.split("\n");

    if (dataList.length < 5) {
      return dataList.length;
    }

    for (let i = 0; i < dataList.length; i++) {
      if (parseInt(dataList[i].split('=>')[1]) + 60 * 60 * 1000 >= new Date().getTime()) {
        count++;
      }
    }

  }
  if (types == 'like') {
    const file = await readFileAsync(`config/${username}/like.txt`, 'utf-8');
    const dataList = file.split("\n");

    if (dataList.length < 5) {
      return dataList.length;
    }

    for (let i = 0; i < dataList.length; i++) {
      if (parseInt(dataList[i].split('=>')[1]) + 60 * 60 * 1000 >= new Date().getTime()) {
        count++;
      }
    }

  }

  if (types == 'comment') {
    const file = await readFileAsync(`config/${username}/comment.txt`, 'utf-8');
    const dataList = file.split("\n");

    if (dataList.length < 5) {
      return dataList.length;
    }

    for (let i = 0; i < dataList.length; i++) {
      if (parseInt(dataList[i].split('=>')[1]) + 60 * 60 * 1000 >= new Date().getTime()) {
        count++;
      }
    }

  }

  return count;
}

async function getDailyData(types) {
  let count = 0;
  if (types == 'follow') {
    const file = await readFileAsync(`config/${username}/follower.txt`, 'utf-8');
    const dataList = file.split("\n");

    if (dataList.length < 5) {
      return dataList.length;
    }

    for (let i = 0; i < dataList.length; i++) {
      if (parseInt(dataList[i].split('=>')[1]) + 24 * 60 * 60 * 1000 >= new Date().getTime()) {
        count++;
      }
    }

  }
  if (types == 'like') {
    const file = await readFileAsync(`config/${username}/like.txt`, 'utf-8');
    const dataList = file.split("\n");

    if (dataList.length < 5) {
      return dataList.length;
    }

    for (let i = 0; i < dataList.length; i++) {
      if (parseInt(dataList[i].split('=>')[1]) + 24 * 60 * 60 * 1000 >= new Date().getTime()) {
        count++;
      }
    }
  }

  if (types == 'comment') {
    const file = await readFileAsync(`config/${username}/comment.txt`, 'utf-8');
    const dataList = file.split("\n");

    if (dataList.length < 5) {
      return dataList.length;
    }

    for (let i = 0; i < dataList.length; i++) {
      if (parseInt(dataList[i].split('=>')[1]) + 24 * 60 * 60 * 1000 >= new Date().getTime()) {
        count++;
      }
    }
  }

  return count;

}

async function postHandler(post) {
  let fullUser, userFeed, wait;
  try {
    fullUser = await ig.user.info(post.user.pk)
    userFeed = ig.feed.user(post.user.pk)
    wait = rand(20000, 13000);
  }
  catch (err) { log(err); }
  await delay(wait);
  const userPosts = await userFeed.items();

  // console.log(fullUser);
  let userFirstPost = null;
  let relevantPostsCount = 0
  userPosts.forEach((userPost) => {
    relevantPostsCount += 1;
    if (userFirstPost == null) {
      userFirstPost = userPost;
    }
  });
  const userRR = Math.round(fullUser.following_count / fullUser.follower_count * 100) / 100;
  console.log("username => " + fullUser.username + " | follower => " + fullUser.follower_count + " | following =>" + fullUser.following_count + " | relationship ratio => " + userRR);


  if (fullUser.follower_count < max_follower && fullUser.follower_count > min_follower) {
    if (userRR >= relationship_ratio) {
      console.log('Performing Action');
      const mediaId = userFirstPost.pk;
      const userId = fullUser.pk;
      try {
        let likeR;
        let waitTime = false;
        let waitTimeF = false;

        likeR = await like(mediaId);



        if (likeR) console.log(chalk.green('like done'));

        //comment
        let commentR;

        commentR = await comment(mediaId);

        if (commentR) {
          saveUser(fullUser.username, 'comment');
          console.log(chalk.green('comment done'));
        }
        else {
          console.log(chalk.red("comment"));
        }
        //follow
        let followR;
        followR = await follow(userId);
        let unfollowR;
        // if (Math.random() < 0.2) {
        // }
        if (followR) {
          saveUser(userId, 'follow');
          console.log(chalk.green('follow done'));
        }
        else {
          console.log(chalk.red("follow"));
        }

        log("starting task unfollowing")
        unfollowR = await unfollow();

        // if (waitTimeF && waitTime) {
        //   let t = rand(10 * 60 * 1000, 20 * 60 * 1000)
        //   log(chalk.yellow("[" + new Date().getDate() + ":" + new Date().getHours() + ":" + new Date().getMinutes() + ']') + ' waiting for ' + chalk.yellow(Math.round(t / 100 / 6) / 100) + "m");
        //   await delay(t);

        // }
      }
      catch (err) {
        console.log(err);
      }

    }
    else {
      log("relation ratio is " + userRR + chalk.yellow(' skiping...'));
    }
  }
  else {
    log('follower or followig is higher than max ' + chalk.yellow(' skiping...'));
  }
  if (image_path.length > 1) {
    if (timeForUploadPhoto()) {
      log('timeForUploadPhoto')
      await uploadPhoto()
    }
    if (timeForUploadStory()) {
      log('timeForUploadstory')
      await uploadStory()
    }
  }
  if (video_path.length > 1) {
    if (timeForUploadVideo()) {
      log('timeForUploadvideo')
      await uploadVideo()
    }
  }

};

async function foo() {

  await delay(rand(2000, 10000));
  await ig.feed.news().items();
  await delay(rand(2000, 10000));
  await ig.feed.discover();
  for (let j = 0; j < hashtags.length; j++) {
    let hashtagFeed = ig.feed.tags(hashtags[j], 'recent');
    let posts = await hashtagFeed.items();
    let total = rand(hashtags_quantity - 10, hashtags_quantity + 10);
    for (let i = 0; i < total; i += 1) {
      console.log('current hashtags [ ' + chalk.cyan(hashtags[j] + " => " + (j + 1) + "/" + (hashtags.length) + " ] " + i + "/" + total));
      if (!posts[i]) continue;
      // eslint-disable-next-line no-await-in-loop
      await postHandler(posts[i]);;
    }
  }
}

async function delay(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

async function get_setting() {
  const file = await fs.readFileSync('setting.txt', "utf-8");

  username = await getProperty(file, 'username');
  log('username ' + username);
  password = await getProperty(file, 'password');

  like_in_hour = await getProperty(file, 'like_in_hour');
  comment_in_hour = await getProperty(file, 'comment_in_hour');
  follow_in_hour = await getProperty(file, 'follow_in_hour');

  like_in_days = await getProperty(file, 'like_in_days');
  comment_in_days = await getProperty(file, 'comment_in_days');
  follow_in_days = await getProperty(file, 'follow_in_days');

  like_prob = await getProperty(file, 'like_prob');
  follow_prob = await getProperty(file, 'follow_prob');
  comment_prob = await getProperty(file, 'comment_prob');

  hashtags = (await getProperty(file, 'hashtags')).split(',');
  hashtags = shuffle(hashtags);
  comments = (await getProperty(file, 'comments')).split(',');
  dont_unfollow = await getProperty(file, 'dont_unfollow');
  dont_like_contain_hashtags = await getProperty(file, 'dont_like_contain_hashtags');
  hashtags_quantity = parseInt(await getProperty(file, 'hashtags_quantity'));

  randomize = await getProperty(file, 'randomize');

  min_follower = await getProperty(file, 'min_follower');
  max_follower = await getProperty(file, 'max_follower');
  min_following = await getProperty(file, 'min_following');
  max_following = await getProperty(file, 'max_following');
  min_post = await getProperty(file, 'min_post');


  relationship_ratio = await getProperty(file, 'relationship_ratio');


  unfollow_not_follow_back = parseInt(await getProperty(file, 'unfollow_not_follow_back'));
  unfollow_all = parseInt(await getProperty(file, 'unfollow_all'));
  image_path = await getProperty(file, 'image_path');
  video_path = await getProperty(file, 'video_path')
  igtv_path = await getProperty(file, 'igtv_path');

  caption = await getProperty(file, 'caption');

}
async function getProperty(file, property) {
  const indexProperty = file.indexOf(property + ":");
  if (indexProperty == -1) throw Error(property + ' not found in setting.txt');
  const indexStart = file.indexOf('[', file.indexOf(property));
  const indexEnd = file.indexOf("];", indexStart);
  const result = file.substring(indexStart + 1, indexEnd);
  return result;
}

function shuffle(li) {
  for (let i = li.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (li.length));
    let temp = li[i];
    li[i] = li[j];
    li[j] = temp;
  }
  return li;
}

function timeForUploadPhoto() {
  fs.stat("config/" + username + "/schedule_img.txt", (err) => {
    if (err) {
      createInitFolders()
    }
  });
  try {
    let data = fs.readFileSync(`config/${username}/schedule_img.txt`, 'utf-8');
    if (data.length > 1) {
      let scheduleTime = parseInt(data)
      let currentTime = new Date().getTime()
      if (scheduleTime < currentTime) {
        return true;
      }
      else return false;
    }
    else return true;
  }
  catch (err) {
    return true;
  }
  return false;
}

async function uploadPhoto() {
  let path:string = choice(fs.readdirSync(image_path));
  if(path == undefined || path == null){
    return false;
  }
  log(chalk.cyan('Image Uploading Started'));
  let result = ig.publish.photo({
    file: await readFileAsync(image_path + "/" + path),
    caption: caption
  });
  if (result) {
    let nextschedule = new Date().getTime() + 90 * 60 * 1000 + Math.floor(Math.random() * 60 * 60 * 1000 + 1)
    fs.writeFileSync(`config/${username}/schedule_img.txt`, nextschedule.toString());
    await fs.rm(image_path + "/" + path, (err) => {
      if (err) {
        log(err);
      }
    });
    return true;
  } else return false;
}

function timeForUploadStory() {
  fs.stat("config/" + username + "/schedule_img.txt", (err) => {
    if (err) {
      createInitFolders()
    }
  });
  try {
    let data = fs.readFileSync(`config/${username}/schedule_img.txt`, 'utf-8');
    if (data.length > 1) {
      let scheduleTime = parseInt(data)
      let currentTime = new Date().getTime()
      if (scheduleTime < currentTime) {
        return true;
      }
      else return false;
    }
    else return true;
  }
  catch (err) {
    return true;
  }
  return false;
}

async function uploadStory() {
  // let path;
  // let root;
  // let imgPath = choice(fs.readdirSync(image_path));
  // let vdoPath = choice(fs.readdirSync(video_path).filter(path => { path.indexOf('.mp4') > -1 }));

  // let r = Math.random();

  // if (r > 0.5) {
  //   path = image_path + "/" + imgPath;
  //   root = imgPath;
  // }
  // else {
  //   path = video_path + "/" + vdoPath;
  //   root = video_path;
  // }

  // try {
  //   let result = ig.publish.story({
  //     file: await readFileAsync(path)
  //   });

  //   if (result) {
  //     let nextschedule = new Date().getTime() + 90 * 60 * 1000 + Math.floor(Math.random() * 60 * 60 * 1000 + 1)
  //     fs.writeFileSync(`config/${username}/schedule_img.txt`, nextschedule.toString());
  //     await fs.rm(path, (err) => {
  //       if (err) {
  //         log(err);
  //       }
  //       log("story removed");
  //     });
  //     return true;
  //   }

  // }
  // catch (err) {

  // }
}

function timeForUploadVideo() {
  fs.stat("config/" + username + "/schedule_vdo.txt", (err) => {
    if (err) {
      createInitFolders()
    }
  });
  try {
    let data = fs.readFileSync(`config/${username}/schedule_vdo.txt`, 'utf-8');
    if (data.length > 1) {
      let scheduleTime = parseInt(data)
      let currentTime = new Date().getTime()
      if (scheduleTime < currentTime) {
        return true;
      }
      else return false;
    }
    else return true;
  }
  catch (err) {
    return true;
  }
  return false;
}

async function uploadVideo() {
  let path = choice(
    fs.readdirSync(video_path).filter(path => { return path.includes('.mp4') }));
  if(path == undefined || path == null){
    log('path undefine')
    return false;
  }
  let coverPath;
  if (path) {
    coverPath = path.slice(0, path.indexOf(".mp4"));
  }
  else {
    log('path false')
    return false;
  }
  try {
    let result = ig.publish.video({
      video: await readFileAsync(video_path + "/" + path),
      coverImage: await readFileAsync(video_path + "/" + coverPath),
      caption: caption
    });
    if (result) {
      let nextschedule = new Date().getTime() + 90 * 60 * 1000 + Math.floor(Math.random() * 60 * 60 * 1000 + 1)
      fs.writeFileSync(`config/${username}/schedule_vdo.txt`, nextschedule.toString());
      await fs.rm(video_path + "/" + path, (err) => {
        if (err) {
          log(err);
        }
        log("vodeo removed");
      });
      return true;
    }
  }
  catch (err) {
    await uploadIGTV(path, coverPath);
  }
}

async function uploadIGTV(path : string, coverPath: string) {

  try {
    let result = ig.publish.igtvVideo({
      video: await readFileAsync(video_path + "\\" + path),
      coverFrame: await readFileAsync(video_path + "\\" + path),
      title: "",
    });

    if (result) {
      let nextschedule = new Date().getTime() + 90 * 60 * 1000 + Math.floor(Math.random() * 60 * 60 * 1000 + 1)
      fs.writeFileSync(`config/${username}/schedule_vdo.txt`, nextschedule.toString());
      await fs.rm(video_path + "/" + path, (err) => {
        if (err) {
          log(err);
        }
        log("vodeo removed");
      });
      return true;
    }

  }
  catch (err) {
    log(err)
    return false;
  }
}


function createInitFolders() {
  log("creating files");
  let folders = [
    "config",
    `config/${username}`,
  ];
  let files = [
    `config/${username}/follower.txt`,
    `config/${username}/like.txt`,
    `config/${username}/comment.txt`,
    `config/${username}/schedule_img.txt`,
    `config/${username}/schedule_vdo.txt`,
    `config/${username}/schedule_igtv.txt`,
    `config/${username}/login.pkl`,
  ];
  for (let i = 0; i < folders.length; i++) {
    fs.stat(folders[i], (err) => {
      if (err) {
        fs.mkdir(folders[i], (err) => {
          if (err) {
            log(err);
          }
        });
      }
    });
  }
  for (let i = 0; i < files.length; i++) {
    fs.stat(files[i], (err) => {
      if (err) {
        fs.open(files[i], 'w', (err) => {
          if (err) {
            log(err);
          }
        });
      }
    });
  }
}