import React from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/forgetpassword.css';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const ForgetPassword = () => {
    return (
        <div className={cx('text')}>
            <p>
                The link has been sent to your email, Please check your email to reset your password.
            </p>
        </div>
    );
};

export default ForgetPassword;
