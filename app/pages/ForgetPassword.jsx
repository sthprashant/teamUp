import React, { Component } from 'react';
import Page from '../pages/Page';
import ForgetPasswordContainer from '../components/ForgetPassword';

class ForgetPassword extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'ForgetPassword | TeamUp';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'TeamUp Forget Password Page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ForgetPasswordContainer {...this.props} />
      </Page>
    );
  }
}

export default ForgetPassword;
