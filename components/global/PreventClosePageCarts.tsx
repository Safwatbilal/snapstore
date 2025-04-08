'use client';
import { useEffect } from 'react';

const PreventClosePageCarts = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.returnValue = "Are you sure you want to leave? You have unsaved changes.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default PreventClosePageCarts;
