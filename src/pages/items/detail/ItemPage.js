import React, { Component } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import Page from '../../../components/Page';
import { findById, add, edit, findImage, uploadImage, deleteImage } from '../../../actions/items';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/SaveRounded';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Swal from 'sweetalert2';
import noImage from '../../../img/no-image.jpg'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


class ItemPage extends Component {

    constructor(props) {
        super(props);

        const { match } = this.props;

        this.state = {
            item: {
                id: match.params.id,
                name: ''
            },
            error: null,
            imageURL: noImage,
            open: false,
            selectedImage: null

        };

        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.reload();
    }

    reload() {
        const { item } = this.state;
        if (item.id) {
            this.props.findById(item.id);
            this.props.findImage(item.id);
        } else {
            this.setState({ imageURL: noImage })
        }
    }


    componentDidUpdate(prevProps, prevState) {
        const { data, error, addError, editError, addData, editData, imageData, imageUpload, imageDelete, imageDeleteError, imageUploadError } = this.props;

        if (prevProps.data !== data) {
            this.setState({ item: data });
        } else if (addData && prevProps.addData !== addData) {
            Swal.fire(
                'Added!',
                'Your file has been added.',
                'success'
            );
            this.props.history.push(`/items`);
        } else if (editData && prevProps.editData !== editData) {
            Swal.fire(
                'Edited!',
                'Your file has been edited.',
                'success'
            );
            this.props.history.push(`/items`);
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
                'Adding process went wrong.',
                'error'
            );

        } else if (prevProps.error !== error) {
            this.setState({ error: error });
            this.props.history.push({ pathname: `/items/add` });
        }
        
        if (prevProps.imageData !== imageData) {
            this.setState({ imageURL: imageData?.url || noImage })
        } else if (prevProps.imageDeleteError !== imageDeleteError) {
            this.setState({ error: imageDeleteError })
            this.handleClose();
            Swal.fire(
                'Ops!',
                'Deleting process went wrong.',
                'error'
            );

        }else if (prevProps.imageUploadError !== imageUploadError) {
            this.setState({ error: imageUploadError })
            Swal.fire(
                'Ops!',
                'Uploading process went wrong.',
                'error'
            );

        } else if (prevProps.imageUpload !== imageUpload){
            Swal.fire(
                'yeay!',
                'Your Image has been uploaded',
                'success'
            );
            this.reload();
            this.handleClose();
        }
        else if (prevProps.imageDelete !== imageDelete){
            Swal.fire(
                'Deleted!',
                'Your Image has been deleted',
                'success'
            );
            this.reload()
            this.handleClose();
        }
    }

    onChange = (event) => {
        const { name, value } = event.target;
        const { item } = this.state;
        this.setState({
            item: {
                ...item,
                [name]: value
            }
        });
    }

    handleOpen = () => {
        this.setState({ open: true });

    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.item.id === undefined) {
            this.props.add(this.state.item);
        } else {
            this.props.edit(this.state.item);
        }

    };

    onDeleteImage = () => {
        const { item } = this.state
        const { imageData } = this.props
        this.props.deleteImage(item.id, imageData)

    }

    fileSelectedHandler = (event) => {
        const files = event.target.files;
        this.setState({ selectedImage: files });


    }

    fileUploadHandler = () => {
        this.props.uploadImage(this.state.item.id, this.state.selectedImage);
        
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        const { classes, loading, addError, editError, imageData, imageUploadLoading } = this.props;
        const { item, imageURL } = this.state;
        const errorData = addError?.data || editError?.data || {}
        return (
            <Page>
                {!loading ?
                    <div>
                        <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                            {item.id &&
                                <div>
                                    <div className={classes.formField}>
                                        <img src={imageURL} />
                                        <br></br>
                                        <Button className={classes.buttonStyle} variant="contained" color="primary" onClick={this.handleOpen}>
                                            edit image
                                        </Button><br></br>
                                        <TextField id="id" name="id" label="ID" value={item.id} fullWidth InputProps={{ readOnly: true }} />
                                    </div>

                                </div>
                            }
                            <div className={classes.formField}>
                                <TextField id="name" name="name" label="Name" value={item.name} fullWidth onChange={this.onChange} error={errorData.name} helperText={errorData.name ? errorData.name[0] : null} />
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
                        </form>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={this.state.open}
                            onClose={this.handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={this.state.open}>
                                <div className={classes.paper}>
                                    {!imageData ?
                                        <div>
                                            <h2 id="transition-modal-title">Upload Image</h2>
                                            {!loading ? <div>
                                                <input type="file" onChange={this.fileSelectedHandler} />
                                                <Button className={classes.buttonStyle} variant="contained" onClick={this.fileUploadHandler} color="primary" >
                                                    upload
                                            </Button>
                                            </div> : <CircularProgress />}
                                        </div> :
                                        <div>
                                            <h2 id="transition-modal-title">Delete Image</h2>
                                            <Button className={classes.buttonStyle} variant="contained" onClick={this.onDeleteImage} color="primary" >
                                                Delete
                                            </Button>
                                        </div>
                                    }

                                </div>
                            </Fade>
                        </Modal>
                    </div>
                    : <CircularProgress className={classes.loadingStyle} />
                }

            </Page>

        );
    }
}

const mapStateToProps = state => ({
    data: state.findItemById.data,
    loading: state.findItemById.loading || state.addItem.loading || state.editItem.loading || state.findItemImage.loading || state.deleteItemImage.loading || state.uploadItemImage.loading,
    error: state.findItemById.error,

    addData: state.addItem.data,
    addError: state.addItem.error,

    editData: state.editItem.data,
    editError: state.editItem.error,

    imageData: state.findItemImage.data,
    imageError: state.findItemImage.error,

    imageUpload: state.uploadItemImage.data,
    imageUploadError: state.uploadItemImage.error,

    imageDelete: state.deleteItemImage.data,
    imageDeleteError: state.deleteItemImage.error

});

const mapDispatchToProps = {
    findById,
    add,
    edit,
    findImage,
    uploadImage,
    deleteImage
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(ItemPage)
);