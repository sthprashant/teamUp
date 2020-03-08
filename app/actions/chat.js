/**
 * Created by limyandivicotrico on 9/11/17.
 */

import {sendmessage} from '../services/chat';
import {fetchmessages} from '../services/group';
import * as types from '../types';

export const UPDATE_MESSAGE = 'update-message';
export const ADD_MESSAGE = 'add-message';
export const ADD_RESPONSE = 'add-response';
export const JOIN_GROUP_SUCCESS = 'JOIN_GROUP_SUCCESS';
export const LEAVE_GROUP_SUCCESS = 'LEAVE_GROUP_SUCCESS';
export const SET_USER_ID = 'setUserId';

export function updateMessage(message) {
    return {
        type: UPDATE_MESSAGE,
        message
    };
}

export function addResponse(message) {
    return {
        type: ADD_RESPONSE,
        message
    };
}

export function addMessage(data) {
    return {
        type: ADD_MESSAGE,
        data
    };
}

export function fetchMessageSuccess(data) {
    return {
        type: types.FETCH_MESSAGE_SUCCESS,
        data
    };
}

export function joinGroupSuccess(data) {
    return {
        type: JOIN_GROUP_SUCCESS,
        data
    };
}

export function leaveGroupSuccess() {
    return {
        type: LEAVE_GROUP_SUCCESS,
    };
}

export function setSocketUserId(socketUserId) {
    return {
        type: SET_USER_ID,
        socketUserId
    };
}

export function sendMessage(senderid, receiverid, message, sendername) {
    return (dispatch) => {
        return sendmessage(senderid, receiverid, message, sendername)
            .then((response) => {
                dispatch(addMessage(response));
            });
    };
}

export function fetchMessages(groupid) {
    return (dispatch) => {
        return fetchmessages(groupid)
            .then((response) => {
                dispatch(fetchMessageSuccess(response));
        });
    };
}
