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
	IconButton,
	Button,
	} from '@mui/material';
import { IRootState } from '@/store/rootReducers';
import {  Edit } from 'lucide-react';
import { Badge } from '../ui/badge';
import TooltipButton from './tooltipButton';
import ImageWithCheck from './ImageWithCheck';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import DetailsProduct from './DetailsProduct';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import ActionButton from './actionButton';

interface CardsProps {
	productName?: string;
	categoryName?: string;
	description?: string;
	price?: number;
	imageUrl?: string[];
	isLoading: boolean;
	productId?: string;
	onEdit?: (id: string) => void;
	userId?: string;
}

const Cards: React.FC<CardsProps> = ({
	productName,
	price,
	imageUrl,
	categoryName,
	productId,
	userId,
	onEdit,
	}) => {
	const { t } = useTranslation();
	const timeOrder = new Date();
	const { theme } = useSelector((state: IRootState) => state.control);

	const router = useRouter();
	const searchParams = useSearchParams();
	const path = usePathname();
	const currentProductId = searchParams.get('productId');
	const [dialogProductId, setDialogProductId] = React.useState<string | null>(null);
	const [link,setLink]=React.useState<string | null >(null)
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
		userId,
		};
		dispatch(addToCart(item));
	};

	return (
		<Card
		sx={{
			maxWidth: 500,
			background: theme === 'dark' ? '#171717' : '#FFFFFF',
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
			avatar={<Badge >{productName?.charAt(0)}</Badge>}
			action={
			<TooltipButton
				onClick={() => onEdit?.(productId!)}
				icon={<IconButton><Edit className="dark:text-white" size={20} /></IconButton>}
				title="Edit"
			/>
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
				className="cursor-pointer !text-sm !p-0 !border-0 hover:bg-red-300 shadow-md !lowercase flex w-max"
				onClick={() => handleDialogOpen(productId!)}
			>
				<ScrollArea className="w-96 whitespace-nowrap rounded-md overflow-hidden">
				<div className="flex space-x-4 p-4">
					{imageUrl?.map((url, index) => (
					<figure key={index} className="shrink-0">
						<div className="overflow-hidden rounded-md">
						<ImageWithCheck
							src={url}
							alt={`${productName} image ${index + 1}`}
							borderRadius={false}
							width="200px"
							height="200px"
						/>
						</div>
					</figure>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</Button>
			</DialogTrigger>
			<DialogContent>
			<DetailsProduct id={productId} handleAddToCart={handleAddToCart} />
			</DialogContent>
		</Dialog>

			<Badge variant='secondary' className='w-full p-0 rounded-none '>
		<CardContent className='!py-3'>
			{categoryName}
		</CardContent>
			</Badge>

		<CardActions disableSpacing className="flex justify-around">
					<ActionButton addToCart={handleAddToCart} link={`http://localhost:3000/?productId=${productId}`}></ActionButton>
		</CardActions>
		</Card>
	);
	};

	export default Cards;
