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
