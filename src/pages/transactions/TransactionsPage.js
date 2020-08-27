import React, { Component } from 'react';
import './Transactions.css';
import Page from '../../components/Page';
import Swal from 'sweetalert2';
import MUIDataTable from "mui-datatables";
import { findAll, deleteById, summary } from '../../actions/transactions';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import RefreshIcon from '@material-ui/icons/RefreshRounded';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import KeyboardReturnRoundedIcon from '@material-ui/icons/KeyboardReturnRounded';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const months = [
    { name: "JANUARY", month: 1 },
    { name: "FEBRUARY", month: 2 },
    { name: "MARCH", month: 3 },
    { name: "APRIL", month: 4 },
    { name: "MEI", month: 5 },
    { name: "JUNE", month: 6 },
    { name: "JULY", month: 7 },
    { name: "AUGUST", month: 8 },
    { name: "SEPTEMBER", month: 9 },
    { name: "OCTOBER", month: 10 },
    { name: "NOVEMBER", month: 11 },
    { name: "DECEMBER", month: 12 },

];

class TransactionsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {
                search: { name: '' },
                sort: 'asc',
                size: 10,
                page: 0
            },
            error: null,
            open: false,
            summaryParams: {
                year: new Date().getFullYear(),
                month: new Date().getMonth()+1,
                date: null
            },
            selectMonth: false

        };
        this.handleCheck = this.handleCheck.bind(this);

    }

    componentDidMount() {
        this.reload();
    }

    reload() {
        this.props.findAll(this.state.params);
        console.log(this.state.params)
    }

    onRowClick = (rowData) => {
        this.props.history.push(`/transactions/${rowData[0]}`);
    }



    componentDidUpdate(prevProps, prevState) {
        const { deleteData, deleteError, error, data, summaryData } = this.props;
        const { params, summaryParams } = this.state;

        if (prevProps.data !== data) {
            this.setState({ data: data.list, total: data.total });
        } else if (prevState.params !== params ||
            prevProps.deleteData !== deleteData) {
            this.reload();
        } else if (deleteError && prevProps.deleteError !== deleteError) {
            this.setState({ error: deleteError });
        } else if (error && prevProps.error !== error) {
            this.setState({ error: error });
        } else if (prevProps.summaryData !== summaryData) {
            this.setState({ summaryData: summaryData })
        }
    }

    onAdd = () => {
        this.props.history.push(`/transactions/add`);
    }

    onReload = () => {
        this.reload();
    }

    onRowsDelete = (rowsDeleted) => {
        const { list } = this.props.data;
        const e = list[rowsDeleted.data[0].index];
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.props.deleteById(e.id);
            }
        })

    }

    onChangePage = (currentPage) => {
        const { params } = this.state;
        this.setState({ params: { ...params, page: currentPage } });
    }

    onSearchChange = (searchText) => {
        const { params } = this.state;
        this.setState({ params: { ...params, search: { name: searchText } } });
    }

    onColumnSortChange = (changedColumn, direction) => {
        const { params } = this.state;
        const sort = direction === 'descending' ? 'desc' : 'asc';
        this.setState({ params: { ...params, sort } });
    }

    onChangeRowsPerPage = (numberOfRows) => {
        const { params } = this.state;
        this.setState({ params: { ...params, size: numberOfRows } });
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.state.summaryParams.month == null ? this.props.summary(this.state.summaryParams) : this.props.summary({year: this.state.summaryParams.year, month: null, date: null})
    };

    handleClose = () => {
        this.setState({ open: false });
        this.reload()
    };

    onSubmit = (event) => {
        const { summaryParams, selectMonth } = this.state
        event.preventDefault();
        
        if(!selectMonth){
            this.props.summary({year: summaryParams.year, month: null, date: null});
            console.log(this.state.selectMonth)
        }else{
            this.props.summary(summaryParams)
            console.log(this.state.selectMonth)
        }
        
    }

    onMonthChange = (event, value) => {
        const { summaryParams, selectMonth } = this.state;
        this.setState({ summaryParams: { ...summaryParams, month:  value?.month || null }})
    }

    onYearChange = (event) => {
        const { value } = event.target;
        const { summaryParams } = this.state;
        this.setState({ summaryParams: { ...summaryParams, year: value } })
    }

    handleCheck = (event) => {
        const isActive = event.target.checked;
        this.setState({ selectMonth: isActive });
    
    }


    render() {
        const { classes, loading } = this.props;
        const { data, total, params, error, open, summaryData, selectMonth, summaryParams } = this.state;

        const column = [
            {
                name: "id",
                label: "ID",
                options: {
                    sortDirection: params.sort
                }
            },
            {
                name: "typeTransaction",
                label: "Type",
                options: {
                    sort: false
                }
            },
            {
                name: "amount",
                label: "Amount(Rp)",
                options: {
                    sort: false
                }
            },
            {
                name: "description",
                label: "Description",
                options: {
                    sort: false
                }
            }
        ];




        const columnSummary = [
            {
                name: "type",
                label: "Type"
            },
            {
                name: "amount",
                label: "Amount(Rp)"
            },
            {
                name: "jumlah",
                label: "Jumlah"
            }
        ];

        const optionsSummary = {
            serverSide: true,
            selectableRows: false,
            textLabels: {
                body: {
                    noMatch: loading ? <CircularProgress /> : "sorry, no stocks found"
                }
            }
        }


        const options = {
            searchText: params.search.name,
            serverSide: true,
            selectableRows: 'single',
            page: params.page,
            search: false,
            count: total,
            rowsPerPage: params.size,
            rowsPerPageOptions: [2, 5, 10, 15, 100],
            filter: false,
            onRowClick: this.onRowClick,
            onChangePage: this.onChangePage,
            onChangeRowsPerPage: this.onChangeRowsPerPage,
            onSearchChange: this.onSearchChange,
            onColumnSortChange: this.onColumnSortChange,
            onRowsDelete: this.onRowsDelete,
            textLabels: {
                body: {
                    noMatch: loading ? <CircularProgress /> : "sorry, no transaction found"
                }
            }
        }

        return (
            <Page error={error} >
                {!open ?
                    <div>
                        <div className={classes.buttonContainer}>
                            <Button className={classes.buttonStyle} variant="contained" color="primary"
                                onClick={this.handleOpen}
                                startIcon={<TimelineRoundedIcon />}>
                                Summary
                            </Button>
                            <Button className={classes.buttonStyle} variant="contained" color="primary"
                                onClick={this.onAdd}
                                startIcon={<AddIcon />}>
                                New Transaction
                    </Button>
                            <Button className={classes.buttonStyle} variant="contained" color="primary"
                                onClick={this.onReload}
                                startIcon={<RefreshIcon />}
                                disabled={loading}>
                                Reload
                    </Button>
                        </div>
                        <MUIDataTable
                            title={"Transactions List"}
                            data={!loading ? data : []}
                            columns={column}
                            options={options}
                        />
                    </div> :
                    <div>
                        <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                           
                                <div className={classes.buttonContainer2}>
                                <TextField id="yearParam" style={{ width: 120, paddingRight: 15 }} value={summaryParams.year} name="yearParam" onChange={this.onYearChange} label="Year" variant="standard" fullWidth />
                                <Autocomplete
                                    disabled={!selectMonth ? true : false}
                                    id="monthParam"
                                    options={months}
                                    defaultValue={months[summaryParams.month-1]}
                                    onChange={this.onMonthChange}
                                    getOptionLabel={(option) => option.name}
                                    getOptionSelected={(option) => option.month}
                                    style={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} style={{ width: 170 }} label="Month" variant="standard" />}
                                />
                                
                                <FormControlLabel
                                    control={<Checkbox onChange={(event) => this.handleCheck(event)} color="primary" />}
                                    label="Enable Month"
                                    labelPlacement="month" />
                                <Button className={classes.buttonStyle} variant="contained" onClick={this.onSubmit} color="primary" >
                                    submit
                                </Button>
                            </div>
                          
                        </form>
                        <div className={classes.buttonContainer}>
                            <Button className={classes.buttonStyle} variant="contained" color="primary"
                                onClick={this.handleClose}
                                startIcon={<KeyboardReturnRoundedIcon />}>
                                Back
                            </Button>
                            <Button className={classes.buttonStyle} variant="contained" color="primary"
                                onClick={this.onReload}
                                startIcon={<RefreshIcon />}
                                disabled={loading}>
                                Reload
                            </Button>
                        </div>
                        <MUIDataTable
                            title={"Transactions Summary List"}
                            data={!loading ? summaryData : []}
                            columns={columnSummary}
                            options={optionsSummary}
                        />
                    </div>
                }


            </Page>

        );
    }
}

const mapStateToProps = state => ({
    data: state.findTransactions.data,
    loading: state.findTransactions.loading || state.deleteTransactionById.loading || state.summaryTransactions.loading,
    error: state.findTransactions.error,
    deleteData: state.deleteTransactionById.data,
    deleteError: state.deleteTransactionById.error,

    summaryData: state.summaryTransactions.data,
    summaryError: state.summaryTransactions.error

});

const mapDispatchToProps = {
    findAll, deleteById, summary
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(TransactionsPage)
);