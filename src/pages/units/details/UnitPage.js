import React, { Component } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import Page from '../../../components/Page';
import { findById, add, edit } from '../../../actions/units';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/SaveRounded';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Swal from 'sweetalert2';


class UnitPage extends Component {

    constructor(props) {
        super(props);

        const { match } = this.props;

        this.state = {
            unit:{
                id: match.params.id,
                name: '',
                description: ''
            },
            error: false
           
        };

        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        const { unit } = this.state;
        if (unit.id) {
            this.props.findById(unit.id);
        }
    }   

    componentDidUpdate(prevProps, prevState) {
        const { data, error, addError, editError, addData, editData } = this.props;

        if (prevProps.data !== data) {
            this.setState({ unit: data });
        }else if (prevProps.addError !== addError){
            this.setState({error: addError});
            Swal.fire(
                'Ops!',
                `Adding process went wrong.`,
                'error'
            );
        }else if (prevProps.editError !== editError){
            this.setState({error: editError});
            Swal.fire(
                'Ops!',
                'Adding process went wrong.',
                'error'
            );

        }else if (prevProps.error !== error){
            this.setState({error:error});
            this.props.history.push({pathname:`/units/add`, state: {error: error}});
        } else if (addData && prevProps.addData !== addData){
            Swal.fire(
                'Added!',
                'Your file has been added.',
                'success'
            );
            this.props.history.push(`/units`);
        } else if (editData && prevProps.editData !== editData){
            Swal.fire(
                'Edited!',
                'Your file has been edited.',
                'success'
            );
            this.props.history.push(`/units`);
        }
    }

    onChange = (event) => {
        const { name, description, value } = event.target;
        const { unit } = this.state;
        this.setState({unit: {...unit,
            [name]: value,
            [description]: value
        }});
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {addError} = this.props

        if(this.state.unit.id === undefined){
            this.props.add(this.state.unit);
            console.log(addError)
            this.setState({name:''});
            this.setState({description: ''})
            
        }else{
            this.props.edit(this.state.unit);
            
        }
        
    };

    goBack(){
        this.props.history.goBack();
    }

    render() {
        const { classes, loading, addError , error, editError} = this.props;
        const { unit } = this.state;
        const errorData = addError?.data || editError?.data || {};
        return (
            <Page error={error}>
                {!loading ?
                    <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                        {unit.id &&
                            <div className={classes.formField}>
                                <TextField id="id" name="id" label="ID" value={unit.id} fullWidth InputProps={{ readOnly: true }} error={errorData.name}  />
                            </div>
                        }
                        <div className={classes.formField}>
                            <TextField id="name" name="name" label="Name" value={unit.name} fullWidth onChange={this.onChange} helperText={errorData.name?errorData.name[0]:null} />
                        </div>
                        <div className={classes.formField}>
                            <TextField id="description" name="description" label="Description" value={unit.description} fullWidth onChange={this.onChange} />
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
    data: state.findUnitById.data,
    loading: state.findUnitById.loading || state.addUnit.loading || state.editUnit.loading,
    error: state.findUnitById.error,
    addData: state.addUnit.data,
    editData: state.editUnit.data,
    addError :  state.addUnit.error,
    editError: state.editUnit.error
});

const mapDispatchToProps = {
    findById,
    add,
    edit
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(UnitPage)
);