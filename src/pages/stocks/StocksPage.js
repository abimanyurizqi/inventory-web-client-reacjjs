import React, { Component } from 'react';
import './Stocks.css';
import { Typography } from '@material-ui/core';
import Page from '../../components/Page';


class Stocks extends Component {


    render() {
        return (
            <Page>
                <Typography paragraph>This is Stocks Page.</Typography>
            </Page>

        );
    }
}

export default Stocks;