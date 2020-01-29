import * as types from './actions-types';
import {backend} from '../../api/backend';

export function loginSuccess(nickname:any){
    return { type: types.USER_AUTH_SUCCESS, nickname};
}


export function loginFail(nickname:any){
    return {type: types.USER_AUTH_FAIL, nickname};
}

export function signSuccess(nickname:any){
    return { type: types.USER_SIGN_SUCCESS, nickname};
}

export function signFail(nickname:any){
    return { type: types.USER_SIGN_FAIL, nickname};
}


export function try_login(nickname:string){
    return function(dispatch:any){
        return backend.validate_user(nickname).then(result => {
            if(result.status === 200){
                dispatch(loginSuccess(nickname));
            }else{
                dispatch(loginFail(nickname));
            }
        }).catch( err => {
            console.log(err);            
            dispatch(loginFail(nickname));
        });
    };
}

export function try_signup(nickname:string){
    return function(dispatch:any){
        return backend.create_user(nickname).then(result => {
            if(result.status === 201){
                dispatch(signSuccess(nickname));
                dispatch(loginSuccess(nickname));
            }else{
                dispatch(signFail(nickname));
                dispatch(loginFail(nickname));
            }
        }).catch( err => {
            console.log(err);  
            dispatch(signFail(nickname));          
            dispatch(loginFail(nickname));
        });
    };
}
