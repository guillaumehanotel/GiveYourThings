import RNFetchBlob from 'rn-fetch-blob';
import sha1 from 'sha1'
import Config from 'react-native-config';

const API_HOST = Config.ENV === 'production' ? Config.API_HOST_PRODUCTION : Config.API_HOST_DEV;

export async function fetchUserByUid(uid) {
  let response = await fetch(API_HOST + 'api/users?uid=' + uid);
  return response;
}

export async function fetchAdsByUserId(userId) {
  const response = await fetch(API_HOST + 'api/users/' + userId + '/ads');
  const ad = await response.json();
  return ad;
}

export async function fetchAllAds() {
  const response = await fetch(API_HOST + 'api/ads');
  const ads = await response.json();
  return ads;
}

export async function fetchAdById(adId) {
  const response = await fetch(API_HOST + 'api/ads/' + adId);
  const ad = await response.json();
  return ad;
}

export async function fetchUserById(userId) {
  const response = await fetch(API_HOST + 'api/users/' + userId);
  const user = await response.json();
  return user;
}

export async function fetchAllCategories() {
  const response = await fetch(API_HOST + 'api/categories');
  const categories = await response.json();
  return categories;
}

export async function fetchCategoryById(categoryId) {
  const response = await fetch(API_HOST + 'api/categories/' + categoryId);
  const category = await response.json();
  return category;
}

export async function fetchAdsByUserIdAndState(userId, state) {
  const response = await fetch(API_HOST + 'api/users/' + userId + '/ads/' + state);
  const ads = await response.json();
  return ads;
}

export async function fetchOnlineAds() {
  const response = await fetch(API_HOST + 'api/ads/online');
  const ads = await response.json();
  return ads;
}

export async function fetchDiscussionsByUserIdAndAdId(userId, adId) {
  const response = await fetch(API_HOST + 'api/users/' + userId + '/ads/' + adId + '/discussions');
  const discussions = await response.json();
  return discussions;
}

export async function fetchDiscussionRepliesByDiscussionId(discussionId) {
  const response = await fetch(API_HOST + 'api/discussions/' + discussionId + '/discussion_replies');
  const discussionReplies = await response.json();
  return discussionReplies;
}

export async function uploadImage(photo) {
  let timestamp = (Date.now() / 1000 | 0).toString();
  let api_key = Config.CLOUDINARY_API_KEY;
  let api_secret = Config.CLOUDINARY_API_SECRET;
  let cloud = Config.CLOUDINARY_NAME;
  let hash_string = 'timestamp=' + timestamp + api_secret;
  let signature = sha1(hash_string).toString();
  let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload';

  const response = await RNFetchBlob.fetch('POST', upload_url, {
    'Content-Type': 'multipart/form-data',
  }, [
    {name: 'file', filename: photo.fileName, type: photo.type, data: RNFetchBlob.wrap(photo.uri)},
    {name: 'timestamp', data: timestamp},
    {name: 'api_key', data: api_key},
    {name: 'signature', data: signature},
  ]);

  let regex_match_img_url = /https.*\.jpg/g;
  let url = (response.data.match(regex_match_img_url))[0];

  return url
}

export async function postAd(userId, photo, body) {

  let photoUrl = await uploadImage(photo);

  body = {...body, image_url: photoUrl};

  const response = await fetch(API_HOST + 'api/users/' + userId + '/ads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
}

export async function postUser(body) {
  const response = await fetch(API_HOST + 'api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
}

export async function postDiscussion(requester_id, ad_id) {
  const response = await fetch(API_HOST + 'api/users/' + requester_id + '/ads/' + ad_id + '/discussions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return response;
}

export async function postReply(discussionId, userId, body) {
  const response = await fetch(API_HOST + 'api/discussions/' + discussionId + '/users/' + userId + '/discussion_replies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
}

export async function fetchAddressByCoordinate(latitude, longitude) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.GOOGLE_API_KEY}`);
  const localisation = await response.json();
  return localisation.results[0].formatted_address
}
