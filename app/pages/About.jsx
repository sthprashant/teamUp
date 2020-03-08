import React, { Component } from 'react';
import Page from '../pages/Page';
import AboutContainer from '../components/About';

class About extends Component {
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
        <AboutContainer {...this.props} />
      </Page>
    );
  }
}

export default About;
