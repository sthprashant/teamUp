import React, { Component } from 'react';
import Page from '../pages/Page';
import FileStorageContainer from '../containers/FileStorage';

class FileStorage extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'About | TeamUp';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'TeamUp is the best messenger' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <FileStorageContainer {...this.props} />
      </Page>
    );
  }
}

export default FileStorage;
