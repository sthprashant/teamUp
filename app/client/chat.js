/**
 * Created by limyandivicotrico on 9/13/17.
 */
import io from 'socket.io-client';
import * as actions from '../actions/chat';

let socket = null;

export function chatMiddleware() {
    return next => (action) => {
        if (socket && action.type === actions.ADD_MESSAGE) {
            // to send the message to the server.
            socket.emit('message', action.data);
        }
        else if (socket && action.type === actions.JOIN_GROUP_SUCCESS) {
            socket.emit('join', action.data);
        }
        else if (socket && action.type === actions.LEAVE_GROUP_SUCCESS) {
            socket.emit('leave');
        }
        return next(action);
    };
}

export function socketConnect(store) {
    // TODO: connect to where?
    socket = io.connect(location.host);

    socket.on('start', (message) => {
        store.dispatch(actions.setSocketUserId(message.socketUserId));
    });

    // to listen incoming messages from the server.
    socket.on('message', (data) => {
        store.dispatch(actions.addResponse(data));
    });

    socket.on('typing', (message) => {
        store.dispatch(actions.userIsTyping(message));
    });

    socket.on('join', (message) => {
       store.dispatch(actions.joinGroupSuccess(message));
    });
}
