/**
 * Created by limyandivicotrico on 9/19/17.
 */
import _ from 'lodash';
import {combineReducers} from 'redux';
import * as types from '../types';

const group = (state = []
    , action) => {
    switch (action.type) {
        case types.GET_GROUP_NAME_SUCCESS:
            return [...state, action.data];
        case types.CLEAR_GROUP:
            return [];
        case types.INVITE_MEMBER_SUCCESS:
            return state;
        case types.LEAVE_GROUP:
            return _.remove(state, (g) => {
                return g.groupid !== action.data;
            });
        case types.REMOVE_GROUP_SUCCESS:
            return _.remove(state, (g) => {
                return g.groupid !== action.data;
            })
        default:
            return state;
    }
};

// TODO: ADD MEETING TIMES!
const data = (state = {}, action) => {
    switch (action.type) {
        case types.GET_GROUP_DATA_SUCCESS:
            return action.data;
        default:
            return state;
    }
};

const groupReducer = combineReducers({
    group,
    data,
});

export default groupReducer;
