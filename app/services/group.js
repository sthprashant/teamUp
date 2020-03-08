/**
 * Created by limyandivicotrico on 9/18/17.
 */
import _ from 'lodash';
import {firebaseAuth, ref} from '../firebase/firebaseconfig';

// Handle database when user create the GROUP

// Handle retrieve children from database
export const snapshotToObject = (snapshot) => {
    let returnArr = {};

    snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const item = childSnapshot.val();
        returnArr = {...returnArr, [key]: item};
    });
    return returnArr;
};

export function getgroupdata(groupid) {
    return ref.child(`groups/${groupid}`).once('value').then((data) => {
        return data.val();
    });
}

// Save the group created as one of the group in user groups array in database.
function saveGroupToUser(groupid) {
    ref.child(`users/${firebaseAuth().currentUser.uid}/groups`).once('value', (snapshot) => {
        const groups = snapshotToObject(snapshot);
        const newGroups = {...groups, [groupid]: groupid};
        return ref.child(`users/${firebaseAuth().currentUser.uid}`).update(
            {groups: newGroups}
        );
    });
}

// Function for user to create a Group.
export function creategroup(groupname) {
    const groupid = ref.push().key;
    const date = new Date();
    const users = {[firebaseAuth().currentUser.uid]: firebaseAuth().currentUser.uid};
    const managers = {[firebaseAuth().currentUser.uid]: firebaseAuth().currentUser.uid};
    // TO put the userid that create the group to the group member list.
    return ref.child(`groups/${groupid}`)
        .set({
            id: groupid,
            users,
            numOfMember: 1,
            name: groupname,
            dateformed: date.toString(),
            meetings: [],
            managers,
        })
        .then(saveGroupToUser(groupid))
        .then(() => groupid); // I WILL USE THIS TO SEND IT TO USER MODEL.
}

export function getgroup() {
    return ref.child(`users/${firebaseAuth().currentUser.uid}/groups`).once('value').then((snapshot) => {
        const groupslist = snapshotToObject(snapshot);
        return _.values(groupslist);
    });
}

export function getgroupname(groupid) {
    return ref.child(`groups/${groupid}/name`).once('value').then((snapshot) => {
        const groupname = snapshot.val();
        return {groupid, groupname};
    });
}

export function fetchmessages(groupid) {
    const messagesRef = ref.child('messages');
    return messagesRef.orderByChild('receiverid').equalTo(groupid).once('value')
        .then((snapshot) => {
            const thisgroupmessage = [];
            snapshot.forEach((childSnapshot) => {
                thisgroupmessage.push({message: childSnapshot.val().message, senderid: childSnapshot.val().senderid, receiverid: childSnapshot.val().receiverid, sendername: childSnapshot.val().sendername});
            });
            return thisgroupmessage;
    });
}

function removeGroupFromUser(groupid, userid) {
    ref.child(`users/${userid}/groups`).child(groupid).remove();
}

function removeGroupData(groupid) {
    ref.child('groups').child(groupid).remove();
}

function removeGroupDataFromUser(groupid) {
    const userRef = ref.child(`groups/${groupid}/users`);

    userRef.orderByValue().on('value', (snapshot) => {
        let users = [],
            i = 0;
        snapshot.forEach((data) => {
            users[i] = data.val();
            console.log(groupid, users[i]);
            removeGroupFromUser(groupid, users[i]);
            // console.log(users);
            i++;
        });
        removeGroupData(groupid);
    });
}

export function removegroup(groupid) {
    // const userRef = ref.child(`groups/${groupid}/users`);
    const usersRef = ref.child('groups');
    // let users = [],
    // i = 0;
    return usersRef.orderByChild('id').equalTo(groupid).once('value')
        .then(removeGroupDataFromUser(groupid))
        .then(() => groupid);
}

export function createMeeting(groupid, meetingtime) {
    const groupRef = ref.child(`groups/${groupid}`);
    return groupRef.child('meetings').push(meetingtime);
}

export function addmanager(groupid, userEmail) {
    const userRef = ref.child('users');
    return userRef.orderByChild('email').equalTo(userEmail).once('value')
        .then((snapshot) => {
            let userid = null;
            snapshot.forEach((childSnapshot) => {
                userid = childSnapshot.val().id;
            });
            return userid;
        })
        .then(userid => ref.child(`groups/${groupid}/managers`).update({[userid]: userid}));
}


export function getMeetingTime(groupid) {
    const groupRef = ref.child(`groups/${groupid}`);
    const meetingslist = [];
    return groupRef.child('meetings').once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                meetingslist.push(childSnapshot.val());
            });
            return meetingslist;
        });
}
