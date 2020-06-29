import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Typography from '@material-ui/core/Typography';
import ThreeDotsMenu from '../three-dots-menu';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

const useStyles = makeStyles({
    root: {
        width: 320,
    },
    media: {
        height: 200,
        position: 'relative',
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        color: 'black',
        backgroundColor: '#C4C4C4',
        opacity: 0.5,
    },
    reposition: {
        width: '100%',
        position: 'absolute'
    },
});
function ClassCard(props) {
    const classes = useStyles();
    function Redirect() {
        props.history.push(`Room/${props.id}`)
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={Redirect}>
                <CardMedia
                    className={classes.media}
                    image={props.thumbnail}
                    title="Contemplative Reptile"
                >
                    {/* <div className={classes.overlay}> </div> */}
                    <CardContent className={classNames(classes.reposition, 'flex justify-between items-center')}>
                        <ThreeDotsMenu actions={
                            {
                                delete: () => {
                                    const result = props.store.ClassRoomStore.deleteClassRoom(props.id)
                                    console.log("delete", props.id, result)
                                },
                            }
                        } />
                        <Typography
                            noWrap
                            variant="h3"
                            component="h2"
                            align="right"
                            className="!font-medium w-3/5 !text-4xl text-white"
                        >
                            {props.title}
                        </Typography>
                    </CardContent>

                </CardMedia>
            </CardActionArea>
            <CardContent>
                <Typography variant="h6" color="textSecondary" component="p">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton size="medium" color="primary" aria-label="folder picture" component="span">
                    <FolderOpenIcon />
                </IconButton>
                <IconButton size="medium" color="primary">
                    <PersonOutlineIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
export default inject("store")(observer(withRouter(ClassCard)))