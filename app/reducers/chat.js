/**
 * Created by limyandivicotrico on 9/14/17.
 */
import {combineReducers} from 'redux';
import {UPDATE_MESSAGE, ADD_MESSAGE, ADD_RESPONSE, SET_USER_ID} from '../actions/chat';
import * as types from '../types';

const messages = (state = [], action) => {
    const chatmessages = state.map(data => Object.assign({}, data))
    switch (action.type) {
        case ADD_RESPONSE:
            chatmessages.push(Object.assign({}, action.message));
            return chatmessages;
        case ADD_MESSAGE:
            chatmessages.push(Object.assign({}, action.data));
            return chatmessages;
        case types.FETCH_MESSAGE_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

const currentMessage = (state = '', action) => {
    switch (action.type) {
        case UPDATE_MESSAGE:
            return action.message;
        case ADD_MESSAGE:
            return '';
        default:
            return state;
    }
}

const socketUserId = (state = '', action) => {
    if (action.type === SET_USER_ID) {
        return action.socketUserId;
    }
    return state;
}

const group = (state = '', action) => {
    switch (action.type) {
        case types.JOIN_GROUP_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

const data = (state = {}, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return [...state, action.data];
        case types.FETCH_MESSAGE_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

const chatReducer = combineReducers({
    messages,
    currentMessage,
    socketUserId,
    data,
    group,
});

export default chatReducer;
