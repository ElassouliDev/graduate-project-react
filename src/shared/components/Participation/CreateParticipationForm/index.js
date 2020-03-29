import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
    }
}));
const CreateParticipationForm =(props) => {

    const classes = useStyles();

    return (
      <>
        <Card className={classes.root} className='my-10'>
        <CardContent className='mr-5'>
              <TextField
                id="filled-full-width"
                label="Post Content"
                style={{ margin: 8 ,  }}
                placeholder="Post Content"
                helperText=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                variant="filled"
                multiline
                rows="7"
                autoFocus
              />
            </CardContent>
          <CardActionArea>

          </CardActionArea>
          <CardActions className="m-5 mt-0 float-right">
          <Button
              size="large"
              variant="contained"
              color="secondary"

            >
              Cancel
            </Button>
          <Button
              size="large"
              variant="contained"
              color="primary"
            >
              Post
            </Button>

          </CardActions>
        </Card>

      </>
    );


}

export default CreateParticipationForm;
