import React from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/about.css';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('header')}>About TeamUp</h1>
      <div className={cx('description')}>
        <p>We are a new start-up aiming to create an Instant Messenger that have it all for your team!<br />
          Seriously, we love good tech. React, redux, you name it!
        </p>
      </div>
      <div className={cx('contribute')} />
    </div>
  );
};

export default About;
