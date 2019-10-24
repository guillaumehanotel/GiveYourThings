import {authActions} from './actions';
import * as GoogleSignIn from 'expo-google-sign-in';

/*
Un reducer est composé d'un state et d'une fonction qui prend en paramètre le state et une action
À l'aide d'un switch qui regardera le type de l'action, on pourra éxecuter le bon bout de code selon l'action voulu
*/

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.LOGOUT:
      GoogleSignIn.signOutAsync();
      return {};
    case authActions.FETCH_DATABASE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case authActions.FETCH_GOOGLE_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
