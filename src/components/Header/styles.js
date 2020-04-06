import {DRAWER_WIDTH} from '../constants';

const styles = theme => ({
    appBar: {
        // [theme.breakpoints.up('sm')]: {
        //     width: `calc(100% - ${DRAWER_WIDTH}px)`,
        //     marginLeft: DRAWER_WIDTH,
        // },
        background: 'linear-gradient(45deg, #242322 30%, #363535 70%)',
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1,
        fontSize: 20,
        fontFamily: 'Roboto',

    },
});

export default styles;