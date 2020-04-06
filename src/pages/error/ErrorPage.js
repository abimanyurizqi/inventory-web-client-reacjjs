import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/Page';

class Error extends Component {
    render() {
        return (
            <Page>
                <h1>Error {this.props.code}</h1>
            </Page>
        );
    }
}

Error.propTypes = {
    code: PropTypes.number.isRequired
};

export default Error;