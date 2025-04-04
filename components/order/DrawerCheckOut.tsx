import * as React from "react";
import RHFTextField from "../hook-form/RHFTextFiled";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IOrderAction, orderValidation } from "../validation/order";
import queries from "@/api/order/query";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { dispatch } from "@/store/store";
import { clearCart } from "@/store/slice/cart";
import { yupResolver } from "@hookform/resolvers/yup";
const DrawerCheckOut: React.FC<{ onClick: (id: boolean) => void }> = ({ onClick }) => {
  const { control, handleSubmit, reset } = useForm<IOrderAction>({
    resolver:yupResolver(orderValidation())as unknown as Resolver<IOrderAction>
  });
  const { cartArray } = useSelector((state: IRootState) => state.cart)
  const { mutate } = queries.addOrder();
  const onSubmit: SubmitHandler<IOrderAction> = (data: IOrderAction) => {
    const dataId={
      ...data,
      cartArray
    }
    mutate(dataId, {
      onSuccess: () => {
        toast.success("Order submitted successfully!");
        reset(); // Reset the form after successful submission
        onClick(false); // Close the drawer after success
        dispatch(clearCart())
      },
      onError: () => {
        toast.error("Failed to submit order. Please try again.");
      }
    });
  };

  return (
    <DrawerContent className="overflow-auto z-50">
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Checkout</DrawerTitle>
          <DrawerDescription>
            Enter your details to complete the purchase.
          </DrawerDescription>
        </DrawerHeader>

        {/* Form for checkout */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="address"
            type="text"
            control={control}
            label="Address"
            placeholder="e.g., 123 Main St, City"
            isLoading={false}
          />
          <RHFTextField
            name="moreinformation"
            type="text"
            control={control}
            label="Additional Information"
            placeholder="e.g., apartment number, special instructions"
            isLoading={false}
          />
          <DrawerFooter>
            <Button className="w-full" type="submit">
              Confirm Payment
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full" onClick={() => onClick(false)}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </div>
    </DrawerContent>
  );
};

export default DrawerCheckOut;
