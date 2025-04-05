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
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { dispatch } from '@/store/store';
import { addToCart } from '@/store/slice/cart';
import ImageWithCheck from './ImageWithCheck';


interface CardsProps {
  productName?: string;
  categoryName?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  isLoading: boolean;
  productId?: string;
  onEdit?: (id: string) => void;
  userId?: string;
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
  const handleAddToCart=()=>{
  const item={productId,productName,price,imageUrl,quantity:1,state:'pending',timeOrder}
    dispatch(addToCart(item))
  }
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5", "#FF8C33"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentProductId = searchParams.get('productId');
  const {t}=useTranslation()
  React.useEffect(() => {
    if (currentProductId === productId) {
      setIsDialogOpen(true);
    }
  }, [currentProductId, productId]);
  const timeOrder = new Date();
  const userToken = typeof window !== "undefined" ? localStorage.getItem('token') : null;
  const { theme } = useSelector((state: IRootState) => state.control);
  const handleDialogOpen = () => {
    router.push(`?productId=${productId}`, { scroll: false });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    router.push('/', { scroll: false });
    setIsDialogOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 500,background:`${theme==='dark'?'#09090B':'#ffffff'}`,border:'2px solid #FFFFFF1A'}}  >
      {isLoading ? (
        <>
            <div className="flex justify-center items-center">
              <Skeleton 
                variant="circular" 
                width="40px" 
                height="40px" 
                sx={{ 
                  margin: '5px', 
                  backgroundColor: theme === 'light' ? '#e0e0e0' : '#2c2c2c' 
                }} 
              />
              <Skeleton 
                variant="text" 
                width="80%" 
                height={23} 
                sx={{ 
                  margin: '5px', 
                  backgroundColor: theme === 'light' ? '#e0e0e0' : '#2c2c2c' 
                }} 
              />
            </div>
            <Skeleton 
              variant="rectangular" 
              width="400px" 
              height={250} 
              sx={{ 
                backgroundColor: theme === 'light' ? '#e0e0e0' : '#2c2c2c' 
              }} 
            />
            <Skeleton 
              variant="text" 
              width="80%" 
              height={23} 
              sx={{ 
                margin: '5px', 
                backgroundColor: theme === 'light' ? '#e0e0e0' : '#2c2c2c' 
              }} 
            />
            <Skeleton 
              variant="text" 
              width="100%" 
              height={16} 
              sx={{ 
                margin: '5px', 
                backgroundColor: theme === 'light' ? '#e0e0e0' : '#2c2c2c' 
              }} 
            />
            <Skeleton 
              variant="text" 
              width="50%" 
              height={16} 
              sx={{ 
                margin: '5px', 
                backgroundColor: theme === 'light' ? '#e0e0e0' : '#2c2c2c' 
              }} 
            />
          </>

      ) : (
        <>
     <CardHeader
        sx={{
          '& .MuiCardHeader-title': {
            color: theme === 'light' ? '#09090B' : '#FFFFFF', 
          },
          '& .MuiCardHeader-subheader': {
            color: theme === 'light' ? '#52525B' : '#D0D5DD', 
          },
        }}
        avatar={<Avatar sx={{ bgcolor: randomColor }}>{productName?.charAt(0)}</Avatar>}
        action={
          <>
            {userId === userToken && (
              <TooltipButton onClick={() => onEdit?.(productId!)} icon={<IconButton><Edit className='dark:text-white' size={20} /></IconButton>} title='Edit' />
            )}
            <Dialog open={isDialogOpen} onOpenChange={(open) => open ? handleDialogOpen() : handleDialogClose()}>
              
            <DialogTrigger asChild>
                <TooltipButton
                  icon={<IconButton><Eye className='dark:text-white' size={20} /></IconButton>}
                  title='Show'
                />
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

        <ImageWithCheck src={imageUrl} alt={productName} borderRadius={false} width='400px' height='200px'></ImageWithCheck>
          <CardContent>
            <Typography variant="body2" className='dark:text-white'>{categoryName}</Typography>
          </CardContent>
          <CardActions disableSpacing className='flex justify-around'>
            <TooltipButton  icon={<IconButton><FavoriteIcon  className='dark:text-white'/></IconButton>} title={t('global.add_to_favorites')} />
            <TooltipButton icon={<IconButton><ShareIcon className='dark:text-white'/></IconButton>} title={t('global.share_product')} />
            <TooltipButton icon={<IconButton><ShoppingCart onClick={()=>handleAddToCart()} className='dark:text-white'/></IconButton>} title={t('global.add_to_cart')} />
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default Cards;
