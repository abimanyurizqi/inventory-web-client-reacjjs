import React, { Component } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import Page from '../../../components/Page';
import { findById, add, edit } from '../../../actions/transactions';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/SaveRounded';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Swal from 'sweetalert2';

const enums = [
    "BUYING",
    "SELLING"
];
class TransactionPage extends Component {

    constructor(props) {
        super(props);

        const { match } = this.props;

        this.state = {
            transaction: {
                id: match.params.id,
                name: '',
                typeTransaction: '',
                amount: null,
                description: ''

            },
            error: false

        };

        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        const { transaction } = this.state;
        if (transaction.id) {
            this.props.findById(transaction.id);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { data, error, addError, editError, addData, editData } = this.props;

        if (prevProps.data !== data) {
            this.setState({ transaction: data });
        } else if (prevProps.addError !== addError) {
            this.setState({ error: addError });
            Swal.fire(
                'Ops!',
                `Adding process went wrong.`,
                'error'
            );
        } else if (prevProps.editError !== editError) {
            this.setState({ error: editError });
            Swal.fire(
                'Ops!',
                'Edit process went wrong.',
                'error'
            );

        } else if (prevProps.error !== error) {
            this.setState({ error: error });
            this.props.history.push({ pathname: `/transactions/add`, state: { error: error } });
        } else if (addData && prevProps.addData !== addData) {
            Swal.fire(
                'Added!',
                'Your file has been added.',
                'success'
            );
            this.props.history.push(`/`);
        } else if (editData && prevProps.editData !== editData) {
            Swal.fire(
                'Edited!',
                'Your file has been edited.',
                'success'
            );
            this.props.history.push(`/`);
        }
    }

    onChange = (event) => {
        const { name, value } = event.target;
        const { transaction } = this.state;
        this.setState({
            transaction: {
                ...transaction,
                [name]: value
            }
        });
    }

    onSubmit = (event) => {
        event.preventDefault();


        if (this.state.transaction.id === undefined) {
            this.props.add(this.state.transaction);
        } else {
            this.props.edit(this.state.transaction);
        }

    };

    goBack() {
        this.props.history.goBack();
    }

    onTypeChange = (event, value) => {
        const { transaction } = this.state;
        this.setState({ transaction: { ...transaction, typeTransaction: value } })
    }

    render() {
        const { classes, loading, addError, error, editError } = this.props;
        const { transaction } = this.state;
        const errorData = addError?.data || editError?.data || {};
        return (
            <Page error={error}>
                {!loading ?
                    <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                        {transaction.id &&
                            <div className={classes.formField}>
                                <TextField id="id" name="id" label="ID" value={transaction.id} fullWidth InputProps={{ readOnly: true }} error={errorData.name} />
                            </div>
                        }
                        <div className={classes.formField}>
                            <Autocomplete
                                id="type"
                                style={{ width: 300 }}
                                value={transaction.typeTransaction}
                                options={enums}
                                onChange={this.onTypeChange}
                                classes={{
                                    option: classes.option,
                                }}
                                autoHighlight
                                getOptionSelected={(option, value) => option === value}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a type"
                                        error={errorData.typeTransaction}
                                        helperText={errorData.typeTransaction ? errorData.typeTransaction[0] : null}
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={classes.formField}>
                            <TextField id="amount" name="amount" label="Amount" value={transaction.amount} fullWidth onChange={this.onChange} error={errorData.amount} helperText={errorData.amount ? errorData.amount[0] : null} />
                        </div>
                        <div className={classes.formField}>
                            <TextField id="description" name="description" label="Description" value={transaction.description} fullWidth onChange={this.onChange} error={errorData.description} helperText={errorData.description ? errorData.description[0] : null} />
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
    data: state.findTransactionById.data,
    loading: state.findTransactionById.loading || state.addTransaction.loading || state.editTransaction.loading,
    error: state.findTransactionById.error,
    addData: state.addTransaction.data,
    editData: state.editTransaction.data,
    addError: state.addTransaction.error,
    editError: state.editTransaction.error
});

const mapDispatchToProps = {
    findById,
    add,
    edit
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(TransactionPage)
);