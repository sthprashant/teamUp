import {combineReducers} from 'redux';
import _ from 'lodash';
import * as types from '../types';

const isLogin = (state = true,
                 action) => {
    switch (action.type) {
        case types.TOGGLE_LOGIN_MODE:
            return !state;
        default:
            return state;
    }
};

const message = (state = '',
                 action) => {
    switch (action.type) {
        case types.TOGGLE_LOGIN_MODE:
        case types.MANUAL_LOGIN_USER:
        case types.SIGNUP_USER:
        case types.LOGOUT_USER:
        case types.LOGIN_SUCCESS_USER:
        case types.SIGNUP_SUCCESS_USER:
        case types.RESET_PASSWORD_SUCCESS:
            return '';
        case types.LOGIN_ERROR_USER:
        case types.SIGNUP_ERROR_USER:
        case types.RESET_PASSWORD_ERROR:
            return action.message;
        default:
            return state;
    }
};

const isWaiting = (state = false,
                   action) => {
    switch (action.type) {
        case types.MANUAL_LOGIN_USER:
        case types.SIGNUP_USER:
        case types.LOGOUT_USER:
        case types.RESET_PASSWORD:
            return true;
        case types.LOGIN_SUCCESS_USER:
        case types.SIGNUP_SUCCESS_USER:
        case types.LOGOUT_SUCCESS_USER:
        case types.LOGIN_ERROR_USER:
        case types.SIGNUP_ERROR_USER:
        case types.LOGOUT_ERROR_USER:
            return false;
        default:
            return state;
    }
};

const authenticated = (state = false,
                       action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS_USER:
        case types.LOGOUT_ERROR_USER:
            return true;
        case types.SIGNUP_SUCCESS_USER: // Sign UP process does not directly authenticate user
        case types.LOGIN_ERROR_USER:
        case types.SIGNUP_ERROR_USER:
        case types.LOGOUT_SUCCESS_USER:
            return false;
        default:
            return state;
    }
};


// TODO: PUSH THE CREATED GROUP TO PART OF USERS GROUP.
const groups = (state = [],
                action) => {
    switch (action.type) {
        case types.CREATE_GROUP_SUCCESS:
            return [...state, action.data];
        case types.CREATE_GROUP_ERROR:
            break;
        case types.GET_GROUP:
            return [...state, ...action.data];
        case types.CLEAR_GROUP:
            return [];
        case types.LEAVE_GROUP:
            return _.pull(state, action.data);
        case types.REMOVE_GROUP_SUCCESS:
            return _.pull(state, action.data);
        default:
            return state;
    }
    return state;
}

const data = (state = {}, action) => {
    switch (action.type) {
        case types.GET_USER_DATA_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

const isManager = (state = false, action) => {
    switch (action.type) {
        case types.CHECK_MANAGER_SUCCESS:
            return action.data;
        case types.REMOVE_GROUP_SUCCESS:
            return false;
        case types.LEAVE_GROUP:
            return false;
        default:
            return state;
    }
}

const userReducer = combineReducers({
    isManager,
    isLogin,
    isWaiting,
    authenticated,
    message,
    groups,
    data
});

export default userReducer;
