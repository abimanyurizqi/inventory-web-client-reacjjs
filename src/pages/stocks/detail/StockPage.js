import React, { Component } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import Page from '../../../components/Page';
import { findById, add, edit } from '../../../actions/stocks';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/SaveRounded';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { findAll as findAllItems } from '../../../actions/items';
import { findAll as findAllUnits } from '../../../actions/units';
import FormControl from '@material-ui/core/FormControl';



class StockPage extends Component {



    constructor(props) {
        super(props);

        const { match } = this.props;

        this.state = {
            stock: {
                id: match.params.id,
                quantity: null,
                item: {},
                unit: {}
            },
            
            error: null,
        };

        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        const { stock } = this.state;
        if (stock.id) {
            this.props.findById(stock.id);
        }
        this.setState({error: null})
    }

    componentDidUpdate(prevProps, prevState) {
        const { data, error, addError, editError } = this.props;

        if (prevProps.data !== data) {
            this.setState({ stock: data });
        } else if (prevProps.addError !== addError) {
            this.setState({ error: addError });
        } else if (prevProps.editError !== editError) {
            this.setState({ error: editError });
        } else if (prevProps.error !== error) {
            this.setState({ error: error });
        }
    }

    onChange = (event) => {
        const { name, value } = event.target;
        const { stock } = this.state;
        this.setState({
            stock: {
                ...stock,
                [name]: value
            }
        });
    }

    onUnitChange = (event, value) => {
        const { stock } = this.state;
        this.setState({ stock: { ...stock, unit: value } })
        console.log(event);
    }

    onItemChange = (event, value) => {
        const { stock } = this.state;
        this.setState({ stock: { ...stock, item: value } })
        console.log(event);
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.stock)
        if (this.state.stock.id === undefined) {
            this.props.add(this.state.stock);
        } else {
            this.props.edit(this.state.stock);
        }


    };

    onItemTextChange = (event) => {
        const { value } = event.target;
        if (value) {
            this.props.findAllItems({ search: { name: value } });
        }
    }

    goBack() {
        this.props.history.goBack();
    }

    onUnitOpen = (event, value) => {
        this.props.findAllUnits();
    }

    render() {
        const { classes, loading, addError, itemsData, itemsLoading, unitsLoading, unitsData, editError } = this.props;
        const { stock} = this.state;

        const itemOptions = !itemsLoading && itemsData ? itemsData.list : [];
        const unitOptions = !unitsLoading && unitsData ? unitsData.list : [];
        const errorData = addError?.data || editError?.data || {};
        return (
            <Page>
                {!loading ?
                    <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                        <FormControl>

                        
                        {stock.id &&
                            <div className={classes.formField}>
                                <TextField id="id" name="id" label="ID" value={stock.id} fullWidth InputProps={{ readOnly: true }}  />
                            </div>
                        }
                        <div className={classes.formField}>
                            <Autocomplete
                                id="item"

                                style={{ width: 390 }}
                                value={stock.item}
                                options={itemOptions}
                                autoHighlight
                                onChange={this.onItemChange}
                                freeSolo
                                
                                loading={itemsLoading}
                                getOptionSelected={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={errorData.itemId}
                                        helperText={errorData.itemId ? errorData.itemId[0] : null}
                                        label="Items"
                                        variant="outlined"
                                        onChange={this.onItemTextChange}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                )}
                            />
                        </div>
                        </FormControl>
                        <div className={classes.formField}>
                            
                                <TextField style={{ width: 200 }} id="quantity" name="quantity" label="Quantity" value={stock.quantity} fullWidth onChange={this.onChange} error={errorData.quantity}
                                helperText={errorData.quantity ? errorData.quantity[0] : null} />
                            
                            
                                <Autocomplete
                                    id="unit"
                                    style={{ width: 150 , display: "inline-block", marginLeft:'2%'}}
                                    value={stock.unit}
                                    options={unitOptions}
                                    onChange={this.onUnitChange}
                                    autoHighlight
                                    onOpen={this.onUnitOpen}
                                    loading={unitsLoading}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.name}
                                    
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Units"
                                            variant="outlined"
                                            error={errorData.unitId}
                                            helperText={errorData.unitId ? errorData.unitId[0] : null}
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}

                                        />
                                    )}
                                />
                            
                        </div>
                        
                        <div className={classes.formButton} style={{marginLeft: '19%'}}>
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
    itemsData: state.findItems.data,
    itemsLoading: state.findItems.loading || state.deleteItemById.loading,
    itemsError: state.findItems.error,

    unitsData: state.findUnits.data,
    unitsLoading: state.findUnits.loading || state.deleteUnitById.loading,
    unitsError: state.findUnits.error,

    data: state.findStockById.data,
    loading: state.findStockById.loading || state.addStock.loading || state.editStock.loading,
    error: state.findStockById.error,
    addData: state.addStock.data,
    editData: state.editStock.data,
    addError: state.addStock.error,
    editError: state.editStock.error
});

const mapDispatchToProps = {
    findById,
    add,
    edit,
    findAllItems,
    findAllUnits
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(StockPage)
);