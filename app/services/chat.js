/**
 * Created by limyandivicotrico on 9/26/17.
 */

import {ref} from '../firebase/firebaseconfig';

const getTime = (date) => {
    return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
}

export function sendmessage(senderid, receiverid, message, sendername) {
    const msgid = ref.push().key;
    return ref.child(`messages/${msgid}`)
        .set({
            time: getTime(new Date(Date.now())),
            senderid,
            receiverid,
            message,
            sendername,
        })
        .then(() => ({senderid, receiverid, message, sendername}));
}


