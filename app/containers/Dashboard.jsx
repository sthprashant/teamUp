/**
 * Created by limyandivicotrico on 9/14/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import _ from 'lodash';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import MessageList from '../components/message-list';
import MessageEntryBox from '../components/message-entry-box';
import {
    addMessage,
    updateMessage,
    sendMessage,
    fetchMessages,
    joinGroupSuccess,
    leaveGroupSuccess
} from '../actions/chat';
import {
    createGroup,
    getGroup,
    convertToGroupName,
    clearGroup,
    inviteMember,
    leaveGroup,
    managerCheck,
    removeMember,
    addManager,
    removeGroup,
    setMeetingTime,
} from '../actions/users';
import {
    getGroupData,
} from '../actions/groups';
import {
    getMeetingTime,
} from '../services/group';

import styles from '../css/components/message-list.css';
import dashboard from '../css/components/dashboard.css';

const Datetime = require('react-datetime');

const ca = classNames.bind(dashboard);
const cx = classNames.bind(styles);

class Chat extends Component {
    constructor(props) {
        super(props);
        this.renderGroupName = this.renderGroupName.bind(this);
        this.onclick = this.onclick.bind(this);
        this.handleOnlyManagerShow = this.handleOnlyManagerShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showMeeting = this.showMeeting.bind(this);
        this.state = {
            selectedGroup: '',
            date: '',
            showDatePickerForm: false,
            showMessageList: false,
            isShowingCreateGroup: false,
            isShowingInviteUser: false,
            isShowingRemoveUser: false,
            isShowingLeaveGroup: false,
            isShowingAddManager: false,
            isShowingDeleteGroup: false,
            isShowingMeetingsList: false,
            groupname: '',
            userEmail: '',
            meetingslist: [],
        };
    }

    componentWillMount() {
        const {getGroup} = this.props;
        // retrieve user groups from database.
        getGroup();
    }

    componentWillReceiveProps(nextProps) {
        const {groups} = this.props.user;
        const {convertToGroupName} = this.props;
        if (nextProps.user.groups !== groups) {
            nextProps.user.groups.forEach((groupId) => {
                if (!_.includes(groups, groupId)) {
                    convertToGroupName(groupId);
                }
            });
        }
    }

    // TODO: CLEAR USER GROUPS. (CAN BE WHEN LOGOUT AS WELL)
    componentWillUnmount() {
        const {clearGroup} = this.props;
        clearGroup();
    }

    onclick(groupid) {
        const {fetchMessages, joinGroupSuccess, leaveGroupSuccess, managerCheck, getGroupData} = this.props;
        this.setState({selectedGroup: groupid, showMessageList: true});
        leaveGroupSuccess();
        getMeetingTime(groupid).then((meetingsLists => this.setState({meetingslist: meetingsLists})));
        getGroupData(groupid);
        managerCheck(groupid);
        joinGroupSuccess(groupid);
        fetchMessages(groupid);
    }

    showMeeting() {
        if (this.state.meetingslist.length !== 0) {
            return (this.state.meetingslist.map(list => <div>{list}</div>));
        }

            return <p>You don't have any group meeting, Create one for your group!</p>;
    }

    handleChange(value) {
        this.setState({date: value});
    }

    handleClose() {
        this.setState({
            isShowingCreateGroup: false,
            isShowingInviteUser: false,
            isShowingRemoveUser: false,
            isShowingLeaveGroup: false,
            isShowingAddManager: false,
            isShowingDeleteGroup: false,
            isShowingMeetingsList: false,
            showDatePickerForm: false,
        });
    }

    handleOnlyManagerShow() {
        const {user: {isManager}, removeGroup, removeMember, addManager, setMeetingTime} = this.props;
        if (isManager) {
            return (
              <div>
                <div
                        onClick={() => this.setState({isShowingDeleteGroup: true})}
                        className={ca('button5')}
                    />
                {this.state.isShowingDeleteGroup &&
                <ModalContainer onClose={this.handleClose}>
                  <ModalDialog onClose={this.handleClose}>
                    <h4 className={ca('enter')}>Are you sure you want to delete the group? You can't undo this!</h4>
                    <input type="button" value="No" className={ca('greyButton2')} onClick={this.handleClose} />
                    <input
type="button" value="Yes"
className={ca('redButton1')}
                                   onClick={() => removeGroup(this.state.selectedGroup) && this.setState({showMessageList: false, isShowingDeleteGroup: false})} />
                  </ModalDialog>
                </ModalContainer>}
                <p className={ca('delete')}>delete</p>
                <div
                        onClick={() => this.setState({isShowingRemoveUser: true})}
                        className={ca('button6')}
                    />
                {this.state.isShowingRemoveUser &&
                <ModalContainer onClose={this.handleClose}>
                  <ModalDialog onClose={this.handleClose}>
                    <h1 className={ca('enter')}>Remove User</h1>
                    <h2 className={ca('enter')}>Enter the User Email</h2>
                    <input
type="text" placeholder="User Email"
className={ca('enteremail')}
                                   onChange={event => this.setState({userEmail: event.target.value})} />
                    <input
type="button"
 className={ca('redButton')}
                                   onClick={() => removeMember(this.state.selectedGroup, this.state.userEmail) && this.handleClose()}
                                   value="Confirm" />
                  </ModalDialog>
                </ModalContainer>}
                <p className={ca('remove')}>remove</p>
                <input
                        type="button"
                        onClick={() => this.setState({isShowingAddManager: true})}
                        className={ca('button8')}
                    />
                <p className={ca('manager')}>manager</p>
                {this.state.isShowingAddManager &&
                <ModalContainer onClose={this.handleClose}>
                  <ModalDialog onClose={this.handleClose}>
                    <h1 className={ca('enter')}>Add Manager</h1>
                    <h2 className={ca('enter')}>Enter the User Email</h2>
                    <input
type="text" placeholder="User Email"
className={ca('enteremail')}
                                   onChange={event => this.setState({userEmail: event.target.value})} />
                    <input
type="button"
className={ca('redButton')}
                                   onClick={() => addManager(this.state.selectedGroup, this.state.userEmail) && this.handleClose()}
                                   value="Confirm" />
                  </ModalDialog>
                </ModalContainer>}
                {this.state.showMessageList &&
                <div
                        onClick={() => this.setState({showDatePickerForm: true})}
                        className={ca('button4')}
                    />}
                {this.state.showDatePickerForm &&
                <ModalContainer onClose={this.handleClose}>
                  <ModalDialog onClose={this.handleClose}>
                    <h1 className={ca('setmeeting')}>Set Meeting</h1>
                    <form>
                      <Datetime onChange={this.handleChange} />
                      <input
                                    type="button"
                                    onClick={() => setMeetingTime(this.state.selectedGroup, (this.state.date).format('MMMM Do YYYY, h:mm:ss a')) && this.setState({meetingslist: [...this.state.meetingslist, (this.state.date).format('MMMM Do YYYY, h:mm:ss a')], showDatePickerForm: false})}
                                    value="Set Time"
                                    className={ca('redButton')} />
                    </form>
                  </ModalDialog>
                </ModalContainer>}
                  <p className={ca('meeting')}>meeting</p>
              </div>
            );
        }
        return <div />;
    }

    renderGroupName() {
        const {group} = this.props.groups;
        return (
            group.map(g =>
                <div
                    className={ca('group-input')} style={{backgroundColor: this.state.selectedGroup === g.groupid ? 'coral' : ''}} key={g.groupid}
                    onClick={() => this.onclick(g.groupid)}>{g.groupname}
                </div>)
        );
    }

    render() {
        const {chat: {messages, currentMessage}, user: {data: {id, firstname, lastname}}, updateMessage, sendMessage, createGroup, inviteMember, leaveGroup} = this.props;
        return (
          <div className={cx('column')}>
            <div className={ca('container-group')}>
              <div className={ca('button1')} onClick={() => this.setState({isShowingCreateGroup: true})}>
                {this.state.isShowingCreateGroup &&
                <ModalContainer onClose={this.handleClose}>
                  <ModalDialog onClose={this.handleClose}>
                    <h1 className={ca('enter')}>Enter the Group Name</h1>
                    <input
type="text" placeholder="Group Name"
                                       onChange={event => this.setState({groupname: event.target.value})} />
                    <input type="button" className={ca('redButton')} onClick={() => createGroup(this.state.groupname) && this.handleClose()} value="Confirm" />
                  </ModalDialog>
                </ModalContainer>}
              </div>
              <p className={ca('group')}>Group</p>
            </div>
            <div className={ca('container-left')}>
              {this.renderGroupName()}
            </div>
            <div className={ca('container-message')}>
              {this.state.showMessageList && <MessageList senderId={id} messages={messages} sendername={firstname} />}
            </div>
            <div className={ca('container-entrybox')}>
              {this.state.showMessageList && <MessageEntryBox
                        value={currentMessage}
                        onChange={updateMessage}
                        onSubmit={() => sendMessage(id, this.state.selectedGroup, currentMessage, firstname)}
                        senderId={id}
                    />}
            </div>

            <div>
              {this.state.showMessageList && <div className={ca('showbutton')} onClick={() => this.setState({isShowingMeetingsList: true})} />}
                {this.state.showMessageList && <p className={ca('show')}>show meeting</p>}
              {this.state.isShowingMeetingsList &&
                <ModalContainer onClose={this.handleClose}>
                  <ModalDialog onClose={this.handleClose}>
                    <h1 className={ca('enter')}>Your Upcoming GroupMeeting</h1>
                    {this.showMeeting()}
                  </ModalDialog>
                </ModalContainer>}
              <p className={ca('username')}>Name: {firstname} {lastname}</p>
              {this.state.showMessageList && <div
                        onClick={() => this.setState({isShowingInviteUser: true})}
                        className={ca('button2')}
                    />}
              {this.state.isShowingInviteUser &&
                <ModalContainer onClose={this.handleClose}>
                  <ModalDialog onClose={this.handleClose}>
                    <h1 className={ca('enter')}>Enter the User Email</h1>
                    <input
type="text" placeholder="User Email"
className={ca('enteremail')}
                                   onChange={event => this.setState({userEmail: event.target.value})} />
                    <input
type="button"
className={ca('redButton')}
                                   onClick={() => inviteMember(this.state.selectedGroup, this.state.userEmail) && this.handleClose()}
                                   value="Confirm" />
                  </ModalDialog>
                </ModalContainer>}
              {this.state.showMessageList && <p className={ca('invite')}>invite</p>}
              {this.state.showMessageList && <div
                        onClick={() => this.setState({isShowingLeaveGroup: true})}
                        className={ca('button3')}
                    />}
              {this.state.isShowingLeaveGroup &&
                <ModalContainer onClose={this.handleClose}>
                  <ModalDialog onClose={this.handleClose}>
                    <h1 className={ca('enter')}>Are you sure you want to leave the group?</h1>
                    <input className={ca('greyButton1')} type="button" value="No" onClick={this.handleClose} />
                    <input
                        className={ca('redButton1')}
type="button" value="Yes"
                                   onClick={() => leaveGroup(this.state.selectedGroup) && this.setState({showMessageList: false, isShowingLeaveGroup: false})} />
                  </ModalDialog>
                </ModalContainer>}
              {this.state.showMessageList && <p className={ca('leave')}>leave</p>}
              {this.handleOnlyManagerShow()}
            </div>


          </div>
        );
    }
}

Chat.propTypes = {
    addMessage: PropTypes.func.isRequired,
    updateMessage: PropTypes.func.isRequired,
    createGroup: PropTypes.func.isRequired,
    getGroup: PropTypes.func.isRequired,
    convertToGroupName: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
        chat: state.chat,
        groups: state.groups,
    };
}


export default connect(mapStateToProps, {
    addMessage,
    updateMessage,
    sendMessage,
    fetchMessages,
    createGroup,
    getGroup,
    convertToGroupName,
    clearGroup,
    inviteMember,
    removeMember,
    leaveGroup,
    joinGroupSuccess,
    leaveGroupSuccess,
    managerCheck,
    removeGroup,
    setMeetingTime,
    getGroupData,
    addManager,
    getMeetingTime
})(Chat);
