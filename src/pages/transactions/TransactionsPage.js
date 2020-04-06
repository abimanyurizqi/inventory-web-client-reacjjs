import React, { Component } from 'react';
import './Transactions.css';
import { Typography } from '@material-ui/core';
import Page from '../../components/Page';

class Transactions extends Component {

    render() {
        return (

            <Page>
                <Typography paragraph>This is Transaction Page.</Typography>
            </Page>



        );
    }
}

export default Transactions;