import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import ThreeDotsMenu from '../three-dots-menu';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
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

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="./assets/images/backgrounds/engineering-bg.jpg"
                    title="Contemplative Reptile"
                >
                    <div className={classes.overlay}> </div>
                    <CardContent className={classnames(classes.reposition, 'flex justify-between items-center')}>
                        <ThreeDotsMenu />
                        <Typography
                            noWrap
                            variant="h3"
                            component="h2"
                            align="right"
                            className="!font-medium w-3/5 !text-4xl text-white"
                        >
                            Information Security
                        </Typography>
                    </CardContent>

                </CardMedia>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
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