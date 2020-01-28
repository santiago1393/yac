import * as types from './actions-types';
import {backend} from '../../api/backend';

export function loginSuccess(nickname:any){
    return { type: types.USER_AUTH_SUCCESS, nickname};
}


export function loginFail(nickname:any){
    return {type: types.USER_AUTH_FAIL, nickname};
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
