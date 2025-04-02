import React, { useEffect } from 'react';
import Sheets from '../global/Sheet';
import { useTranslation } from 'react-i18next';
import queries from '@/api/product/qyery';
import category from '@/api/category/query';
import { defaultProductAction, IProductAction, productValidation, productValue } from '../validation/product';
import { useForm } from 'react-hook-form';
import RHFTextField from '../hook-form/RHFTextFiled';
import RHFReactSelect from '../hook-form/RHFReactSelect';
import { Button } from '../ui/button';
import { updateControlState } from '@/store/slice/control';
import { yupResolver } from '@hookform/resolvers/yup';
import { IProductForm } from '@/api/product/type';
import { toast } from 'sonner';
import { dispatch } from '@/store/store';
import { useQueryClient } from '@tanstack/react-query';
const ProductsActions: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useTranslation();
    const queryClient=useQueryClient()
    const userId = localStorage.getItem('token');
    const { data: productDetails } = queries.getProduct(id);
    const { mutate } = queries.ProductsActions(id);
    const { data: categorys, isLoading } = category.getAllCategory(userId);
    const {
        control,
        handleSubmit,
        watch,
        reset,
    } = useForm<IProductAction>({
        defaultValues: defaultProductAction,
        resolver: yupResolver(productValidation()) as unknown as Resolver<IProductAction>,
        values: productValue(productDetails as IProductForm),
    });

    const onSubmit = (data: IProductAction) => {
        
        const categoryId = watch('category.categoryId');
        const selectedCategory = categorys?.find((cat) => cat.id === categoryId);
        const body = {
            ...data,
            
            userId,
            category: {
                categoryId,
                categoryName: selectedCategory?.categoryName || '',
            },
        };
        mutate(body, {
            onSuccess: () => {
                toast.success(`${id ? t('global.update_done') : t('global.add_done')}`);
                dispatch(updateControlState({ key: 'openSheet', payload: false }));
                reset(defaultProductAction);
                queryClient.invalidateQueries({queryKey:['products']})
            },
        
        });
    };

    return (
        <Sheets title={t('products.add_product')} description={t('global.add_description')}>
            <form className="pt-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="form">
                    <RHFTextField
                        name="productName"
                        type="text"
                        control={control}
                        label={t('products.productName')}
                        isLoading={false}
                        placeholder={t('products.productName')}
                    />
                    <RHFTextField
                        name="description"
                        type="text"
                        control={control}
                        label={t('products.description')}
                        isLoading={false}
                        placeholder={t('products.description')}
                    />
                    <RHFTextField
                        name="price"
                        type="number"
                        control={control}
                        label={t('products.price')}
                        isLoading={false}
                        placeholder={t('products.price')}
                    />
                    <RHFTextField
                        name="imageUrl"
                        type="text"
                        control={control}
                        label={t('products.imageUrl')}
                        isLoading={false}
                        placeholder={t('products.imageUrl')}
                    />

                    <RHFReactSelect
                        name="category.categoryId"
                        className="w-full"
                        label={t('products.category')}
                        control={control}
                        isLoading={isLoading}
                        options={
                            categorys
                                ? categorys.map(({ categoryName, id }: { categoryName: string; id: string }) => ({
                                        label: categoryName,
                                        value: id,
                                    }))
                                : []
                        }
                    />

                    <div className="divButtonForm">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => dispatch(updateControlState({ key: 'openSheet', payload: false }))}
                        >
                            {t('global.back')}
                        </Button>
                        <Button type="submit" className="w-full buttonSubmit">
                            {id ? t('global.update') : t('global.add')}
                        </Button>
                    </div>
                </div>
            </form>
        </Sheets>
    );
};

export default ProductsActions;
