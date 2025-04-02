import i18n from "@/lib/i18n";
import { array, number, object, string } from "yup";
export const stringValidation=()=>
    string().required(i18n.t('form.field_is_required'))
export const passwordValidation = (isEdit: boolean) =>
    string().test({
        message: i18n.t("form.at_least_6_char"),
        test: (value) => {
            return isEdit
            ? value
                ? value.length >= 6
                ? true
                : false
                : true
            : value && value?.length >= 6
            ? true
            : false;
        },
    });
    export const reactSelectValidation = () =>
        object()
          .shape({
            categoryName: string(),
            categoryId: string(),
          })
          .test({
            message: i18n.t("form.field_is_required"),
            test: ({ categoryId }) => {
              return !!categoryId;
            },
          });