// 'use client';

// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { IRootState } from '@/store/rootReducers';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Button } from '@/components/ui/button';

// const PreventClosePageCarts = () => {
//   const { cartArray } = useSelector((state: IRootState) => state.cart);
//   const [open, setOpen] = useState(false);

//   const handleContinue = () => {
//     setOpen(false);

//     console.log('kkk');
//   };
//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       if (cartArray.length > 0) {
//         event.preventDefault(); 
//         setOpen(true); 
//         event.returnValue = '';
//       }
//     };
//     window.addEventListener('beforeunload', handleBeforeUnload);


//     return () => {
//     //  window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [cartArray]);

//   return (
//     <>

//       <AlertDialog open={open} onOpenChange={setOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               By leaving, you may lose the items in your cart!
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleContinue}>Proceed</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// };

// export default PreventClosePageCarts;
