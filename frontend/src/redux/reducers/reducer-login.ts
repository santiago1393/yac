
import * as types from '../actions/actions-types';

const initialStateLogin = {
  isLogged: false,
  nickname: ''
};

export default function loginReducer(state = initialStateLogin, action) {
    switch (action.type) {
        case types.USER_AUTH_FAIL:
            return Object.assign({}, state, {
                isLogged: false,
                nickname: '',
            });
        case types.USER_AUTH_SUCCESS:
            return Object.assign({}, state, {
                isLogged: true,
                nickname: action.data,
            });        
        default:
            return state;
  }
}
