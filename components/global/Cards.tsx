'use client'
import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TooltipButton from './tooltipButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Skeleton } from '@mui/material';
import { Edit, Eye, ShoppingCart } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import DetailsProduct from './DetailsProduct';

const ExpandMore = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface CardsProps {
  productName?: string;
  categoryName?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  isLoading: boolean;
  productId?: string;
  onEdit?: (id: string) => void;
  userId: string;
}

const Cards: React.FunctionComponent<CardsProps> = ({
  productName,
  description,
  price,
  imageUrl,
  categoryName,
  isLoading,
  productId,
  userId,
  onEdit
}) => {
  const [expandedProductId, setExpandedProductId] = React.useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentProductId = searchParams.get('productId');

  React.useEffect(() => {
    if (currentProductId === productId) {
      setIsDialogOpen(true);
    }
  }, [currentProductId, productId]);

  const handleExpandClick = (id: string | undefined) => {
    if (!id) return;
    setExpandedProductId(prevId => (prevId === id ? null : id));
  };

  const userToken = typeof window !== "undefined" ? localStorage.getItem('token') : null;

  const handleDialogOpen = () => {
    router.push(`?productId=${productId}`, { scroll: false });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    router.push('/', { scroll: false });
    setIsDialogOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
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
            avatar={<Avatar sx={{ bgcolor: blue[500] }}>{productName?.charAt(0)}</Avatar>}
            action={
              <>
                {userId === userToken && (
                  <TooltipButton onClick={() => onEdit?.(productId!)} icon={<IconButton><Edit size={20} /></IconButton>} title='Edit' />
                )}
                <Dialog open={isDialogOpen} onOpenChange={(open) => open ? handleDialogOpen() : handleDialogClose()}>
                  <DialogTrigger>
                    <TooltipButton icon={<IconButton><Eye size={20} /></IconButton>} title='Show' />
                  </DialogTrigger>
                  <DialogContent>
                    <DetailsProduct id={productId} />
                  </DialogContent>
                </Dialog>
              </>
            }
            title={productName}
            subheader={price}
          />
          <CardMedia component="img" className="h-[250px] !w-[400px]" image={imageUrl} alt={productName} />
          <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{categoryName}</Typography>
          </CardContent>
          <Collapse in={expandedProductId === productId} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{description}</Typography>
            </CardContent>
          </Collapse>
          <CardActions disableSpacing>
            <TooltipButton icon={<IconButton><FavoriteIcon /></IconButton>} title='Add to favorites' />
            <TooltipButton icon={<IconButton><ShareIcon /></IconButton>} title='Share Product' />
            <TooltipButton icon={<IconButton><ShoppingCart /></IconButton>} title='Add to cart' />
            <ExpandMore 
              onClick={() => handleExpandClick(productId)} 
              sx={{ transform: expandedProductId === productId ? 'rotate(180deg)' : 'rotate(0deg)' }} 
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default Cards;
