/**
 * Created by limyandivicotrico on 10/11/17.
 */

import {getgroupdata} from '../services/group';
import * as types from '../types';

function getGroupDataSuccess(data) {
    return {
        type: types.GET_GROUP_DATA_SUCCESS,
        data
    };
}

export function getGroupData(groupid) {
    return (dispatch) => {
        return getgroupdata(groupid).then((response) => {
            dispatch(getGroupDataSuccess(response));
        });
    };
}
