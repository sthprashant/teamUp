/**
 * Created by limyandivicotrico on 9/14/17.
 */

import React, {Component} from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/message-entry-box.css';
import dashboard from '../css/components/dashboard.css';

const ca = classNames.bind(dashboard);
const cx = classNames.bind(styles);
class MessageEntryBox extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(ev) {
        this.props.onChange(ev.target.value);
    }

    handleKeyPress(ev) {
        if (ev.which === 13) {
            const trimmedMessage = this.props.value.trim();

            if (trimmedMessage) {
                this.props.onSubmit({
                    message: trimmedMessage,
                });
            }
            ev.preventDefault();
        }
    }

    render() {
        return (
          <div>
            <textarea
                className={ca('container-entrybox')}
                    name="message"
                    placeholder="Enter a message"
                    value={this.props.value}
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
          </div>
        );
    }
}

export default MessageEntryBox;
