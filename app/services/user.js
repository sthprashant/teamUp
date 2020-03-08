/**
 * Created by limyandivicotrico on 9/26/17.
 */
import {firebaseAuth, ref} from '../firebase/firebaseconfig';
import emailService from './emailAPI';

export const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        returnArr.push(item);
    });
    return returnArr;
};

export function getuserdata() {
    return ref.child(`users/${firebaseAuth().currentUser.uid}`).once('value').then((data) => {
        return data.val();
    });
}

// When Invite, save the group to member data as well (FIREBASE IMPLEMENTATION)
function saveGroupToMemberInvited(userid, groupid) {
    return ref.child(`users/${userid}/groups`).update({[groupid]: groupid});
}

// Send the user to group in FIREBASE.
// TODO: HANDLE EMAIL INVITED IS ALREADY IN THE GROUP.
export function invitemember(groupid, userEmail) {
    const userRef = ref.child('users');
    return userRef.orderByChild('email').equalTo(userEmail).once('value')
        .then((snapshot) => {
            let userid = null;
            snapshot.forEach((childSnapshot) => {
                userid = childSnapshot.val().id;
                // call invite by email.
            });
            if (userid === null) {
                emailService().sendEmail({receiver: userEmail});
            }
            else {
                emailService().sendConfirm({receiver: userEmail});
            }
            return userid;
        })
        .then(userid => ref.child(`groups/${groupid}/users`).update({[userid]: userid})
            .then(() => ref.child(`groups/${groupid}/numOfMember`).once('value')
                .then((snapshot) => {
                    ref.child(`groups/${groupid}`).update({numOfMember: snapshot.val() + 1});
                })
                .then(saveGroupToMemberInvited(userid, groupid))));
}

// Remove user from group when user leave.
function removeUserFromGroup(groupid, userid) {
    ref.child(`groups/${groupid}/users`).child(userid).remove()
        .then(() => ref.child(`groups/${groupid}/numOfMember`).once('value')
            .then((snapshot)=> {
                 ref.child(`groups/${groupid}`).update({numOfMember: snapshot.val() - 1});
            })
        );
}
function removeGroupFromUser(groupid, userid) {
    ref.child(`users/${userid}/groups`).child(groupid).remove();
}

export function removemember(groupid, userEmail) {
    const userRef = ref.child('users');
    let userid = null;
    return userRef.orderByChild('email').equalTo(userEmail).once('value')
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                userid = childSnapshot.val().id;
                return userid;
            })
                .done(removeUserFromGroup(groupid, userid), removeGroupFromUser(groupid, userid));
        });

}
// SERVICES FOR USER TO LEAVE A GROUP (DELETE GROUP FROM DATABASE).
export function leavegroup(groupid) {
    const userGroupsRef = ref.child(`users/${firebaseAuth().currentUser.uid}/groups`);
    // THEN RETURN ME THE CURRENT GROUP.
    return userGroupsRef.child(groupid).remove()
        .then(removeUserFromGroup(groupid, firebaseAuth().currentUser.uid))
        .then(() => groupid); // I use this to delete it from the model as well.
}

export function checkManager(groupid) {
    const groups = ref.child(`groups/${groupid}/managers`);
    return groups.child(firebaseAuth().currentUser.uid).once('value').then((snapshot) => {
        if (snapshot.val() === firebaseAuth().currentUser.uid) {
            return true;
        }
        return false;
    });
}
