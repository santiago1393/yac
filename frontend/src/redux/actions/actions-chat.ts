import * as types from './actions-types';
import { backend } from "../../api/backend";


export function load_messages_success(data:any){
    return { type: types.LOAD_MESSAGE_SUCCESS, data};
}

export function load_messages_fail(){
    return { type: types.LOAD_MESSAGE_FAIL};
}

export function post_message_success(mss:any){
    return { type: types.NEW_MESSAGE_SENDED, mss}
}

export function new_message_received(mss:any){
    return { type: types.NEW_MESSAGE_RECEIVED, mss}
}

export function loadMessages(){
    return function(dispatch:any){        
        return backend.get_messages().then(data => {
            dispatch(load_messages_success(data));
        }).catch(error => {
            console.log(error);
            dispatch(load_messages_fail());
        });
    };
}

export function postMessage(mss:any){
    return function(dispatch:any){        
        return backend.post_message(mss).then(result => {
            if(result.status === 200){
                dispatch(post_message_success(mss));
            } else {
                console.log(result);                
            }
        }).catch(error => {
            console.log(error);
        });
    };
}
