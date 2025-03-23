import i18n from "@/lib/i18n";
import { stringValidation,passwordValidation } from "./valdation";
import { object } from "yup";
export type ISignUpAction={
    userName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password?: string;
}
export const defaultSignUpAction={
    userName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: ""
}
export const signUpValidation=()=>
    object().shape({
        userName: stringValidation(),
        firstName: stringValidation(),
        lastName: stringValidation(),
        phoneNumber: stringValidation(),
        password: stringValidation(),
    })