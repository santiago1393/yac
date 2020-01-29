
import * as types from '../actions/actions-types';

const initialStateLogin = {
  isLogged: false,
  nickname: '',
  login_fail: false,
  sign_success: false,
};

export default function loginReducer(state = initialStateLogin, action) {
    switch (action.type) {
        case types.USER_AUTH_FAIL:
            return Object.assign({}, state, {
                isLogged: false,
                nickname: '',
                login_fail: true,
            });
        case types.USER_AUTH_SUCCESS:
            return Object.assign({}, state, {
                isLogged: true,
                nickname: action.data,
                login_fail: false,
            });
        case types.USER_SIGN_SUCCESS:
            return Object.assign({}, state, {
                isLogged: true,
                nickname: action.data,
                login_fail: false,
                sign_success: true,
            });
        case types.USER_SIGN_FAIL:
            return Object.assign({}, state, {
                isLogged: false,
                nickname: action.data,
                login_fail: false,
                sign_success: false,
            });

        default:
            return state;
  }
}
