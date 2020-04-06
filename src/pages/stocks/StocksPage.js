import React, { Component } from 'react';
import './Stocks.css';
import Page from '../../components/Page';
import Swal from 'sweetalert2';
import MUIDataTable from "mui-datatables";
import { findAll, deleteById, summary } from '../../actions/stocks';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import RefreshIcon from '@material-ui/icons/RefreshRounded';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';



class StocksPage extends Component {

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
            setOpen: false

        };
    }

    componentDidMount() {
        this.reload();
    }

    reload() {
        this.props.findAll(this.state.params);
        this.setState({ open: false })
    }

    onRowClick = (rowData) => {
        this.props.history.push(`/stocks/${rowData[0]}`);
    }



    componentDidUpdate(prevProps, prevState) {
        const { deleteData, deleteError, error, data, summaryData } = this.props;
        const { params } = this.state;

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
            this.setState({ summaryData: summaryData });
            console.log(summaryData)
        }


    }

    onAdd = () => {
        this.props.history.push(`/stocks/add`);
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
        this.props.summary();

    };

    handleClose = () => {
        this.setState({ open: false });
    };



    render() {
        const { classes, loading } = this.props;
        const { data, total, params, error, summaryData, open } = this.state;

        const column = [
            {
                name: "id",
                label: "ID",
                options: {
                    sortDirection: params.sort
                }
            },
            {
                name: "item.name",
                label: "Item Name",
                options: {
                    sort: false
                }
            },
            {
                name: "quantity",
                label: "Quantity",
                options: {
                    sort: false
                }
            },
            {
                name: "unit.name",
                label: "Unit Name",
                options: {
                    sort: false
                }
            }
        ];

        const columnSummary = [
            {
                name: "item",
                label: "item",
                options: {
                    sort: false
                }
            },
            {
                name: "quantity",
                label: "quantity",
                options: {
                    sort: false
                }
            },
            {
                name: "unit",
                label: "unit",
                options: {
                    sort: false
                }
            }
        ];


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
                    noMatch: loading ? <CircularProgress /> : "sorry, no stocks found"
                }
            }
        }

        const optionsSummary = {
            serverSide: true,
            selectableRows: false,
            textLabels: {
                body: {
                    noMatch: loading ? <CircularProgress /> : "sorry, no stocks found"
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
                                startIcon={<AddIcon />}>
                                Stock Summary
                            </Button>
                            <Button className={classes.buttonStyle} variant="contained" color="primary"
                                onClick={this.onAdd}
                                startIcon={<AddIcon />}>
                                New Stock
                            </Button>
                            <Button className={classes.buttonStyle} variant="contained" color="primary"
                                onClick={this.onReload}
                                startIcon={<RefreshIcon />}
                                disabled={loading}>
                                Reload
                            </Button>
                        </div>
                        <MUIDataTable
                            title={"Stocks List"}
                            data={!loading ? data : []}
                            columns={column}
                            options={options}
                        /> </div> :

                    <div><div className={classes.buttonContainer}>
                        <Button className={classes.buttonStyle} variant="contained" color="primary"
                            onClick={this.onReload}
                            startIcon={<RefreshIcon />}>
                            Stocks
                        </Button>
                        <Button className={classes.buttonStyle} variant="contained" color="primary"
                            onClick={this.onAdd}
                            startIcon={<AddIcon />}>
                            New Stock
                        </Button>
                    </div>
                        <MUIDataTable
                            title={"Stocks Summary List"}
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
    data: state.findStocks.data,
    loading: state.findStocks.loading || state.deleteStockById.loading || state.summaryStocks.loading,
    error: state.findStocks.error,
    deleteData: state.deleteStockById.data,
    deleteError: state.deleteStockById.error,

    summaryData: state.summaryStocks.data,
    summaryError: state.summaryStocks.error,
});

const mapDispatchToProps = {
    findAll, deleteById, summary
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(StocksPage)
);