import GLOBALS from '../Globals';

export async function fetchAllAds() {
  const response = await fetch(GLOBALS.API_HOST + 'api/ads');
  const ads = await response.json();
  return ads;
}

export async function fetchAdById(adId) {
  const response = await fetch(GLOBALS.API_HOST + 'api/ads/' + adId);
  const ad = await response.json();
  return ad;
}

export async function fetchAdByName(adName) {
  const response = await fetch(GLOBALS.API_HOST + 'api/ads/?title=' + adName);
  if (response.status == 200) {
    const ads = await response.json();
  } else {
    const ads = []
  }
  return ad;
}

export async function fetchUserById(userId) {
  const response = await fetch(GLOBALS.API_HOST + 'api/users/' + userId);
  const user = await response.json();
  return user;
}

export async function fetchAllCategories() {
  const response = await fetch(GLOBALS.API_HOST + 'api/categories');
  const categories = await response.json();
  return categories;
}

export async function fetchCategoryById(categoryId) {
  const response = await fetch(GLOBALS.API_HOST + 'api/categories/' + categoryId);
  const category = await response.json();
  return category;
}

export async function fetchAdsByUserIdAndState(userId, state) {
  const response = await fetch(GLOBALS.API_HOST + 'api/users/' + userId + '/ads/' + state);
  const ads = await response.json();
  return ads;
}

export async function fetchDiscussionsByUserIdAndAdId(userId, adId) {
  const response = await fetch(GLOBALS.API_HOST + 'api/users/' + userId + '/ads/' + adId + '/discussions');
  const error = await response.text();
  console.log(error);
  const discussions = await response.json();
  return discussions;
}

export async function fetchDiscussionRepliesByDiscussionId(discussionId) {
  const response = await fetch(GLOBALS.API_HOST + 'api/discussions/'+ discussionId +'/discussion_replies');
  const discussionReplies = await response.json();
  return discussionReplies;

}

export async function postAd(userId, body) {
  const response = await fetch(GLOBALS.API_HOST + 'api/users/' + userId + '/ads', {
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
  const response = await fetch(GLOBALS.API_HOST + 'api/users', {
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
  const response = await fetch(GLOBALS.API_HOST + 'api/users/' + requester_id + '/ads/' + ad_id + '/discussions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
  return response;
}

export async function postReply(discussionId, userId, body) {
    const response = await fetch(GLOBALS.API_HOST + 'api/discussions/' + discussionId + '/users/' + userId + '/discussion_replies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    });
  return response;
}
