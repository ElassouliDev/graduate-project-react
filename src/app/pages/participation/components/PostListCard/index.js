import { Card, Divider, Button, CardHeader } from "@material-ui/core";
import React, { useState, Component } from "react";
import classNames from 'classnames';
import PostCard from '../PostCard';
import { Chip } from '@material-ui/core';

import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

import { CardActionArea } from '@material-ui/core';
import { Avatar } from '@material-ui/core';


export default class  PostListCard extends Component {

    constructor(props){
        super(props);
        this.auth_user ={
          name: "Yehia Elas",
          image:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
        };
        this.posts =
        [
         {
           user: {
             name: "Yehia Elas",
             image:
               "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
           },
           id: 1,
           content:
             "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
           created_at: "September 14, 2016",
           comments :[
               {
                user: {
                    name: "Yehia com1",
                    image:
                      "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                  },
                  id: 1,
                  content:
                    "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
                  created_at: "September 14, 2016",
               }, {
                user: {
                    name: "Yehia com1",
                    image:
                      "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                  },
                  id: 1,
                  content:
                    "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
                  created_at: "September 14, 2016",
               }, {
                user: {
                    name: "Yehia com1",
                    image:
                      "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                  },
                  id: 1,
                  content:
                    "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
                  created_at: "September 14, 2016",
               }, {
                user: {
                    name: "Yehia com1",
                    image:
                      "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                  },
                  id: 1,
                  content:
                    "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
                  created_at: "September 14, 2016",
               }
           ]


         },
         {
           user: {
             name: "Yehia Elas",
             image:
               "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
           },
           id: 1,
           content:
             "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
           created_at: "September 14, 2016",
         }

       ]
   ;
    }



    render() {
        return (
            <>
            {
                this.posts.map((post) => (
                <PostCard post={post}  user={this.auth_user}/>
              ))
              }
              </>
        );
    }


}
