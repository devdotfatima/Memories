import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Post from './post/Post';
import useStyles from './styles';


const Posts=( {setCurrentId})=>{
   const posts=useSelector((state)=>state.posts?.posts);
   const isLoading=useSelector((state)=>state.posts.isLoading);
   
   const classes=useStyles();

    if(!posts && !isLoading) return 'No posts';


    return(
        isLoading?<CircularProgress />:(

            <Grid className={classes.container} container alignitems="stretch" spacing={3}>
                {
                    posts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>       
                            <Post  setCurrentId={setCurrentId} post={post}/>

                            </Grid>

                    ))
                }

            </Grid>
        )

    )
}

export default Posts;