'use client';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { dispatch } from '@/store/store';
import { addToCart } from '@/store/slice/cart';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Avatar,
	IconButton,
	Typography,
	Skeleton,
	Button,
} from '@mui/material';

import { Edit, ShoppingCart, Share } from 'lucide-react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { blue } from '@mui/material/colors';

import TooltipButton from './tooltipButton';
import ImageWithCheck from './ImageWithCheck';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import DetailsProduct from './DetailsProduct';
import CardSkeleton from './CardSkeleton';

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

const Cards: React.FC<CardsProps> = ({
	productName,
	description,
	price,
	imageUrl,
	categoryName,
	isLoading,
	productId,
	userId,
	onEdit,
}) => {
	const { t } = useTranslation();
	const timeOrder = new Date();
	const userToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	const { theme } = useSelector((state: IRootState) => state.control);

	const router = useRouter();
	const searchParams = useSearchParams();
	const path = usePathname();
	const currentProductId = searchParams.get('productId');
	const [dialogProductId, setDialogProductId] = React.useState<string | null>(null);

	const handleDialogOpen = (productId: string) => {
		if (dialogProductId !== productId) {
			router.push(`?productId=${productId}`, { scroll: false });
		}
	};

	const handleDialogClose = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete('productId');
		router.push(`${path}?${params.toString()}`, { scroll: false });
	};

	React.useEffect(() => {
		if (currentProductId) {
			setDialogProductId(currentProductId);
		} else {
			setDialogProductId(null);
		}
	}, [currentProductId]);

	const handleAddToCart = () => {
		const item = {
			productId,
			productName,
			price,
			imageUrl,
			quantity: 1,
			state: 'pending',
			timeOrder,
		};
		dispatch(addToCart(item));
	};

	return (
		<>
		<Card
			sx={{
				maxWidth: 500,
				background: `${theme === 'dark' ? '#09090B' : '#ffffff'}`,
				border: '2px solid #FFFFFF1A',
			}}
		>


		
					<CardHeader
						sx={{
							'& .MuiCardHeader-title': {
								color: theme === 'light' ? '#09090B' : '#FFFFFF',
							},
							'& .MuiCardHeader-subheader': {
								color: theme === 'light' ? '#52525B' : '#D0D5DD',
							},
						}}
						avatar={<Avatar sx={{ bgcolor: blue }}>{productName?.charAt(0)}</Avatar>}
						action={
							userId === userToken && (
								<TooltipButton
									onClick={() => onEdit?.(productId!)}
									icon={<IconButton><Edit className="dark:text-white" size={20} /></IconButton>}
									title="Edit"
								/>
							)
						}
						title={productName}
						subheader={price}
					/>

					<Dialog
						open={dialogProductId === productId}
						onOpenChange={(open) => {
							if (!open) handleDialogClose();
						}}
					>
						<DialogTrigger asChild>
							<Button
								variant="outlined"
								className="cursor-pointer !text-sm !p-0 !border-0 hover:bg-red-300 shadow-md !lowercase overflow-hidden"
								onClick={() => handleDialogOpen(productId)}
							>
								<ImageWithCheck
									src={imageUrl}
									alt={productName}
									borderRadius={false}
									width="400px"
									height="200px"
								/>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DetailsProduct id={productId} />
						</DialogContent>
					</Dialog>

					<CardContent>
						<Typography variant="body2" className="dark:text-white">
							{categoryName}
						</Typography>
					</CardContent>

					<CardActions disableSpacing className="flex justify-around">
						<TooltipButton
							icon={<IconButton><FavoriteIcon className="dark:text-white" /></IconButton>}
							title={t('global.add_to_favorites')}
						/>
						<TooltipButton
							icon={<IconButton><Share className="dark:text-white" /></IconButton>}
							title={t('global.share_product')}
						/>
						<TooltipButton
							icon={
								<IconButton onClick={handleAddToCart}>
									<ShoppingCart className="dark:text-white" />
								</IconButton>
							}
							title={t('global.add_to_cart')}
						/>
					</CardActions>
				
			
		</Card>
		
		</>
	);
};

export default Cards;
