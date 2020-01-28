
import * as types from '../actions/actions-types';

const initialStateChat = {
    messages: [],
    messages_updated: false,
    new_message: {},
    message_sended: false,
};

export default function chatReducer(state = initialStateChat, action) {
    switch (action.type) {
        case types.LOAD_MESSAGE_FAIL:
            return Object.assign({}, state, {
               messages_updated: false,
            });
        case types.LOAD_MESSAGE_SUCCESS:
            return Object.assign({}, state, {
                messages_updated: true,
                messages: action.data,
             });
        case types.NEW_MESSAGE_RECEIVED:
            return Object.assign({}, state, {
                messages_updated: false,                
                new_message: action.data
            });
        case types.NEW_MESSAGE_SENDED:
            return Object.assign({}, state, {
                messages_updated: false,  
                messages_sended: true,              
            });
        default:
            return state;
  }
}
