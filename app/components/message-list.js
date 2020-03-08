/**
 * Created by limyandivicotrico on 9/14/17.
 */
import React, {Component} from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/message-list.css';

const cx = classNames.bind(styles);
class MessageList extends Component {
    render() {
        return (
          <div className={cx('mess-input')}>
            <dl className={cx('container-message')}>
              {this.props.messages.map((message, index) => {
                    const messageClass = message.senderid !== this.props.senderId ? '2' : '';
                    return (
                      <dt key={`message${index}`} className={cx('speech-bubble1 row')}>
                          <p className={cx(`name1${messageClass}`)}>{message.sendername}</p>
                        <p className={cx(`speech-bubble1${messageClass}`)}>
                          {message.message}
                        </p>
                      </dt>
                    );
                })}
            </dl>
          </div>

        );
    }
}

export default MessageList;
