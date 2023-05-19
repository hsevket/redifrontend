import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { faker } from '@faker-js/faker';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { ThumbDownAlt } from '@mui/icons-material';
import { useState } from 'react';
import { List } from '@mui/material';
import Comment from './Comment';

export default function PostCard({post}) {
    const [openComments, setOpenComments] = useState(false);
    React.useEffect(()=> {
        console.log(post)
    }, [post])
  return (
    <Card sx={{ width: 700, marginBottom: 20}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={faker.image.url()}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><ThumbUpIcon/> <span>{post.likes}</span> </Button>
        <Button size="small"><ThumbDownAlt/>{post.disLikes}</Button>
        <Button onClick={() => setOpenComments(!openComments)} size="small">{openComments? "Close Comments" : "Open Comments"}</Button>
      </CardActions>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {openComments && 
        post.comments.map((comment) => {
            return <Comment comment ={comment}/>
        })
      }
      </List>
    </Card>
  );
}