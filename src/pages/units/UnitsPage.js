import React, { Component } from 'react';
import './Units.css';
import Page from '../../components/Page';
import Swal from 'sweetalert2';
import MUIDataTable from "mui-datatables";
import styles from './styles';
import { findAll, deleteById } from '../../actions/units';
import { withStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import RefreshIcon from '@material-ui/icons/RefreshRounded';
import { connect } from 'react-redux';

class Units extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {
                search: { name: '' },
                sort: 'asc',
                size: 5,
                page: 0
            },
            error: null

        };
    }

    componentDidMount() {
        this.reload();

    }

    reload() {
        this.props.findAll(this.state.params);
    }

    onRowClick = (rowData) => {
        this.props.history.push(`/units/${rowData[0]}`);
    }

    componentDidUpdate(prevProps, prevState) {
        const { deleteData, deleteError, error, data } = this.props;
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
        }
    }

    onAdd = () => {
        this.props.history.push(`/units/add`);
    }

    onReload = () => {
        this.reload();
    }

    onRowsDelete = (rowsDeleted) => {
        const { list } = this.props.data;
        const{ params } =this.state;
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
                this.onChangePage(this.state.params.page - 1);
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

    render() {
        const { classes, loading } = this.props;
        const { data, total, params, error } = this.state;

        const column = [
            {
                name: "id",
                label: "ID",
                options: {
                    sortDirection: params.sort
                }
            },
            {
                name: "name",
                label: "Name",
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

        const options = {
            searchText: params.search.name,
            serverSide: true,
            selectableRows: 'single',
            page: params.page,
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
                    noMatch: loading ? <CircularProgress /> : "sorry, no items found"
                }
            }
        }
        return (
            <Page error={error} >
                <div className={classes.buttonContainer}>
                    <Button className={classes.buttonStyle} variant="contained" color="primary"
                        onClick={this.onAdd}
                        startIcon={<AddIcon />}>
                        New Item
                </Button>
                    <Button className={classes.buttonStyle} variant="contained" color="primary"
                        onClick={this.onReload}
                        startIcon={<RefreshIcon />}
                        disabled={loading}>
                        Reload
                </Button>
                </div>
                <MUIDataTable
                    title={"Units List"}
                    data={!loading ? data : []}
                    columns={column}
                    options={options}
                />

            </Page>


        );
    }
}

const mapStateToProps = state => ({
    data: state.findUnits.data,
    loading: state.findUnits.loading || state.deleteUnitById.loading,
    error: state.findUnits.error,
    deleteData: state.deleteUnitById.data,
    deleteError: state.deleteUnitById.error,
});

const mapDispatchToProps = {
    findAll, deleteById
};


export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(Units)
);