import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Skeleton } from '@mui/material';
import queries from '@/api/category/query';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

interface CardsProps {
  productName?: string;
  category?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  isLoading: boolean;
}

const Cards: React.FunctionComponent<CardsProps> = ({
  productName,
  description,
  price,
  imageUrl,
  category,
  isLoading,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { data } = queries.getCategory(category);
  return (
    <Card sx={{ maxWidth: 400 }}>
      {isLoading ? (
        <>
          <div className='flex justify-center items-center'>
            <Skeleton variant='circular' width="40px" height="40px" sx={{ margin: '5px' }} />
            <Skeleton variant='text' width="80%" height={23} sx={{ margin: '5px' }} />
          </div>
          <Skeleton variant="rectangular" width='400px' height={250} />
          <Skeleton variant="text" width="80%" height={23} sx={{ margin: '5px' }} />
          <Skeleton variant="text" width="100%" height={16} sx={{ margin: '5px' }} />
          <Skeleton variant="text" width="50%" height={16} sx={{ margin: '5px' }} />
        </>
      ) : (
        <>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                {productName?.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={productName}
            subheader={price}
          />
          <CardMedia component="img" className="h-[250px] !w-[400px]" image={imageUrl} alt="Paella dish" />
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {data?.categoryName}
            </Typography>
          </CardContent>
        </>
      )}
      {isLoading && (
        <Skeleton variant="text" width="40%" height={16} sx={{ margin: "5px" }} />
      )}
      {!isLoading && (
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        
      </Collapse>
    </Card>
  );
};

export default Cards;
