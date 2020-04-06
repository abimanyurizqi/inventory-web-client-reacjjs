import React, { Component } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import Page from '../../../components/Page';
import { findById, add, edit } from '../../../actions/items';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/SaveRounded';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';


class ItemPage extends Component {

    constructor(props) {
        super(props);

        const { match } = this.props;

        this.state = {
            id: match.params.id,
            name: ''
        };

        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        const { id } = this.state;
        if (id) {
            this.props.findById(id);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { data } = this.props;

        if (prevProps.data !== data) {
            this.setState({ ...data });
        }
    }

    onChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.id === undefined){
            this.props.add(this.state);
            this.setState({name:''});
        }else{
            this.props.edit(this.state);
        }
        
    };

    goBack(){
        this.props.history.goBack();
    }

    render() {
        const { classes, loading } = this.props;
        const { id, name} = this.state;
        return (
            <Page>
                {!loading ?
                    <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                        {id &&
                            <div className={classes.formField}>
                                <TextField id="id" name="id" label="ID" value={id} fullWidth InputProps={{ readOnly: true }} />
                            </div>
                        }
                        <div className={classes.formField}>
                            <TextField id="name" name="name" label="Name" value={name} fullWidth onChange={this.onChange} />
                        </div>
                        <div className={classes.formButton}>
                            <Button className={classes.buttonStyle} variant="contained" color="primary"
                                onClick={this.goBack}
                                startIcon={<ArrowBackRoundedIcon />}
                                disabled={loading}>
                                Back
                            </Button>
                            <Button className={classes.buttonStyle} variant="contained" onClick={this.onSubmit} color="primary" startIcon={<SaveIcon />}>
                                Save
                            </Button>
                        </div>
                    </form> : <CircularProgress className={classes.loadingStyle} />
                }
            </Page>

        );
    }
}

const mapStateToProps = state => ({
    data: state.findItemById.data,
    loading: state.findItemById.loading || state.addItem.loading || state.editItem.loading,
    error: state.findItemById.error,
    addError :  state.addItem.error,
    editError: state.editItem.error
});

const mapDispatchToProps = {
    findById,
    add,
    edit
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(ItemPage)
);