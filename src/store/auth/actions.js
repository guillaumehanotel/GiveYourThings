import * as GoogleSignIn from 'expo-google-sign-in';
import GLOBALS from '../../Globals';
import NavigationService from '../../utils/NavigationService';
import {postUser} from '../../utils/requests';

export const authActions = {
  LOGOUT: 'LOGOUT',
  FETCH_DATABASE_USER_SUCCESS: 'FETCH_GOOGLE_USER_SUCCESS',
  FETCH_GOOGLE_USER_FAILURE: 'FETCH_GOOGLE_USER_FAILURE',
};

/*
  MEMO
  Une action n'est qu'un simple objet qui possède au moins une propriété type
  elle sert à etre passé en paramètre de la fonction dispatch qui elle appelera le reducer
  pour éxecuter le bon bout de code selon le type de l'action.
  Mais comme c'est chiant de devoir à chaque fois écrire les actions 'à la main', on les encapsule
  dans des 'actionsCreators'. Ce sont des simples fonction qui se contentent de retourner l'action.

  On utilise encore un objet avec des propriétés pour les noms des actions -> ça permet de n'écrire
  que le nom de la fct en string 1 seule fois et d'éviter les erreurs quand on veut l'utiliser
 */

export const logout = () => ({
  type: authActions.LOGOUT,
});

/**
 * On tente de récupérer les données de l'utilisateur Google
 * Si il est connecté, on teste si il existe en BDD, si ce n'est pas le cas, on le crée
 */
export function fetchGoogleUser() {
  return async (dispatch, getState) => {
    try {
      const data = await GoogleSignIn.signInSilentlyAsync();
      if (data) {
        const photoURL = await GoogleSignIn.getPhotoAsync(256);
        const user = await GoogleSignIn.getCurrentUserAsync();
        dispatch(fetchDatabaseUser(user));
      } else {
        throw Error('Google user is not connected');
      }
    } catch (e) {
      console.log(1, e);
      dispatch(fetchGoogleUserFailure(e));
    }
  };
}

export function fetchDatabaseUser(user) {
  return async (dispatch, getState) => {
    const userUid = user.uid;
    let fetchResponse = await fetch(GLOBALS.API_HOST + 'api/users?uid=' + userUid);

    if (fetchResponse.status === 404) {

      const body = {
        uid: userUid,
        email: user.email,
        username: user.displayName,
        firstname: user.firstName,
        lastname: user.lastName,
        photoUrl: user.photoURL,
      };

      const createResponse = await postUser(body);

      if (createResponse.status === 400) {
        const error = await createResponse.json();
        console.error(error);
      } else if (createResponse.status === 201) {
        fetchResponse = await fetch(createResponse.headers.location);
      }
    }

    const databaseUser = await fetchResponse.json();
    dispatch(fetchDatabaseUserSuccess(databaseUser));
    NavigationService.navigate('AdsList');

  };
}

export const fetchDatabaseUserSuccess = user => ({
  type: authActions.FETCH_DATABASE_USER_SUCCESS,
  payload: {user},
});

export const fetchGoogleUserFailure = error => ({
  type: authActions.FETCH_GOOGLE_USER_FAILURE,
  payload: {error},
});
