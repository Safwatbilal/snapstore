import { stringValidation } from './valdation';
import { object } from 'yup';
export type IOrderAction={
    address:string,
    moreinformation:string,
}
export const orderValidation=()=>
    object().shape({

        address:stringValidation(),
        moreinformation:stringValidation()
    })
