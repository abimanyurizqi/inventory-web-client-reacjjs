const styles = theme => ({
    buttonContainer: {
        margin: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-end',
    },
    buttonContainer2: {
        margin: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-start',
    },
    buttonStyle: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        margin: 4
    }
});

export default styles;