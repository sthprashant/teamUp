import {push} from 'react-router-redux';
import {login, register, logout, resetpassword} from '../services/authentication';
import {creategroup, getgroupname, getgroup, addmanager, removegroup, createMeeting} from '../services/group';
import {getuserdata, invitemember, leavegroup, checkManager, removemember} from '../services/user';
import * as types from '../types';


// HELPER FUNCTION.

// Handle when login is beginning
function beginLogin() {
    return {type: types.MANUAL_LOGIN_USER};
}

// Handle successful login message
function loginSuccess(message) {
    return {
        type: types.LOGIN_SUCCESS_USER,
        message
    };
}

// Handle login error messsage
function loginError(message) {
    return {
        type: types.LOGIN_ERROR_USER,
        message
    };
}

// Handle sign up starts
function beginSignUp() {
    return {type: types.SIGNUP_USER};
}

// Handle succesful sign up message
function signUpSuccess(message) {
    return {
        type: types.SIGNUP_SUCCESS_USER,
        message
    };
}

// Handle error sign up message
function signUpError(message) {
    return {
        type: types.SIGNUP_ERROR_USER,
        message
    };
}

// Handle begin logout
function beginLogout() {
    return {type: types.LOGOUT_USER};
}

// Handle successful logout message
function logoutSuccess() {
    return {type: types.LOGOUT_SUCCESS_USER};
}

// Handle error for logout
function logoutError() {
    return {type: types.LOGOUT_ERROR_USER};
}

// Handle reset Password beginning.
function resetPassword() {
    return {type: types.RESET_PASSWORD};
}

// Handle successful reset password message
function resetPasswordSuccess(message) {
    return {
        type: types.RESET_PASSWORD_SUCCESS,
        message
    };
}

// Handle reset password error message
function resetPasswordError(message) {
    return {
        type: types.RESET_PASSWORD_ERROR,
        message
    };
}

// Handle for successful create Group message
function createGroupSuccess(data) {
    return {
        type: types.CREATE_GROUP_SUCCESS,
        data
    };
}

// Handle for error create Group message
function createGroupError(message) {
    return {
        type: types.CREATE_GROUP_ERROR,
        message
    };
}

function getGroupSuccess(data) {
    return {
        type: types.GET_GROUP,
        data
    };
}

function getGroupNameSuccess(data) {
    return {
        type: types.GET_GROUP_NAME_SUCCESS,
        data
    };
}

function getUserDataSuccess(data) {
    return {
        type: types.GET_USER_DATA_SUCCESS,
        data
    };
}

// CLEAR GROUP FROM GROUP REDUCER
function clearGroupSuccess() {
    return {
        type: types.CLEAR_GROUP,
    };
}

// INVITE MEMBER SUCCESS
function inviteMemberSuccess() {
    return {
        type: types.INVITE_MEMBER_SUCCESS,
    };
}

function addManagerSuccess() {
    return {
        type: types.ADD_MANAGER_SUCCESS,
    };
}
function removeMemberSuccess(){
    return {
        type: types.REMOVE_MEMBER_SUCCESS,
    };
}
function leaveGroupSuccess(data) {
    return {
        type: types.LEAVE_GROUP,
        data
    };
}

function managerCheckSuccess(data) {
    return {
        type: types.CHECK_MANAGER_SUCCESS,
        data
    };
}

function removeGroupSuccess(data) {
    return {
        type: types.REMOVE_GROUP_SUCCESS,
        data
    };
}

// MAIN FUNCTION STARTS HERE
export function toggleLoginMode() {
    return {type: types.TOGGLE_LOGIN_MODE};
}

export function toggleManagerPermission() {
    return {type: types.TOGGLE_MANAGER_PERMISSION};
}

export function signUpAndWaitEmailVerification(email, pw, firstname, lastname, dob) {
    return (dispatch) => {
        dispatch(beginSignUp());

        return register(email, pw, firstname, lastname, dob)
            .then((user) => {
                user.sendEmailVerification().then(
                    () => {
                       dispatch(signUpSuccess('You are one step away! Check your Email and Verify your account!'));
                    })
                    .catch((err) => {
                        dispatch(signUpError(err.message));
                    });
            })
            .catch((err) => {
                dispatch(signUpError(err.message));
                if (!pw.match(/^(?=.*[0-9])(?=.*[!@#$%^&*\?])[a-zA-Z0-9!@#$%^&*\?]{6,16}$/)) {
                    dispatch(signUpError('Password should contain at least one number and one special character'));
                }
                if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
                    dispatch(signUpError('Email address is invalid'));
                }
            });
    };
}

export function forgetPassword(email) {
    return (dispatch) => {
        dispatch(resetPassword());
        return resetpassword(email)
            .then((response) => {
                dispatch(resetPasswordSuccess('Password reset email sent to ' + email));
                dispatch(push('/forgetpassword'));
            })
            .catch((err) => {
                dispatch(resetPasswordError('No user with entered email.'));
            });
    };
}

export function logOut() {
    return (dispatch) => {
        dispatch(beginLogout());

        return logout()
            .then((response) => {
                dispatch(logoutSuccess());
            })
            .catch((err) => {
                dispatch(logoutError());
            });
    };
}

// TODO: Create a customized message handler in user reducers.
export function createGroup(groupname) {
    return (dispatch) => {
        return creategroup(groupname)
            .then((response) => {
                dispatch(createGroupSuccess(response));
            })
            .catch((err) => {
                dispatch(createGroupError('Failed in server'));
        });
    };
}

// TODO: DISPATCH ERROR
export function getGroup() {
    return (dispatch) => {
        return getgroup().then((response) => {
            dispatch(getGroupSuccess(response));
        });
    };
}

export function convertToGroupName(groupid) {
    return (dispatch) => {
        return getgroupname(groupid).then((response) => {
            dispatch(getGroupNameSuccess(response));
        });
    };
}

export function clearGroup() {
    return (dispatch) => {
        dispatch(clearGroupSuccess());
    };
}

export function getUserData(dispatch) {
        return getuserdata().then((response) => {
            dispatch(getUserDataSuccess(response));
        });
}

export function manualLogin(email, pw) {
    return (dispatch) => {
        dispatch(beginLogin());

        return login(email, pw)
            .then((user) => {
                if (user.emailVerified) {
                    dispatch(loginSuccess('You have been successfully logged in'));
                    getUserData(dispatch);
                    dispatch(push('/dashboard'));
                } else {
                    dispatch(loginError('You have not verify your email yet!'));
                }
            })
            .catch((err) => {
                dispatch(loginError('Oops! Invalid username or password'));
            });
    };
}

// TODO: ADD TO THE MODEL DIRECTLY AS WELL.
export function addManager(groupid, userid){
    return (dispatch) => {
        return addmanager(groupid, userid).then((response) => {
            dispatch(addManagerSuccess());
        });
    };
}

export function inviteMember(groupid, userid) {
    return (dispatch) => {
        return invitemember(groupid, userid).then((response) => {
            dispatch(inviteMemberSuccess());
        });
    };
}

export function removeMember(groupid, userid) {
    return (dispatch) => {
        return removemember(groupid, userid).then((response) => {
            dispatch(removeMemberSuccess());
        });
    };
}
export function leaveGroup(groupid) {
    return (dispatch) => {
        return leavegroup(groupid).then((response) => {
            dispatch(leaveGroupSuccess(response));
        });
    };
}

export function managerCheck(groupid) {
    return (dispatch) => {
        return checkManager(groupid).then((response) => {
            dispatch(managerCheckSuccess(response));
        });
    };
}

export function removeGroup(groupid) {
    return (dispatch) => {
        return removegroup(groupid).then((response) => {
            dispatch(removeGroupSuccess(response));
        });
    };
}

export function setMeetingTime(groupid, meetingtime) {
    return (dispatch) => {
        return createMeeting(groupid, meetingtime);
    };
}
