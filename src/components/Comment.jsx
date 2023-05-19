import React from 'react'
import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';
import { faker } from '@faker-js/faker';

export default function Comment({comment}) {
  return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp"  src={faker.image.avatar()}/>
        </ListItemAvatar>
        <ListItemText
          primary={comment.message}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.user.username}
              </Typography>
              
            </React.Fragment>
            
          }
        />
      </ListItem>
  )
}
