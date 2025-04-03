import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
interface CommentsListPropsType {
    comment: string,
    userName:string
}

const CommentsList: React.FC<CommentsListPropsType> = ({ comment,userName }) => {
    const { theme } = useSelector((state: IRootState) => state.control);
    return (
        <List sx={{ width: '100%', }}>
    
            <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt={'a'} />
                </ListItemAvatar>
                <ListItemText
                primary={userName}
                secondary={
                    <Typography component="span" variant="body2" sx={{  display: 'inline' }}>
                    {comment}
                    </Typography>
                }
                />
            </ListItem>
            </>
                <Divider variant='middle' className=   'bg-[#FFFFFF1A]'  component="li" />
        
        </List>
    );
};

export default CommentsList;
