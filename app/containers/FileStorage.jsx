import React from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/filestorage.css';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const FileStorage = () => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('header')}>File Storage</h1>
      <div className={cx('description')}>
        <p>THIS IS A TEST OF VIEWING THIS TEXT WHEN FILE IS SELECTED IN THE NAVIGATION PAGE
        </p>
      </div>
      <div className={cx('contribute')} />
    </div>
  );
};

export default FileStorage;
