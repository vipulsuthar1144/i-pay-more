import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import Button from "@components/ui/Button";

const OrderPlacedDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     isOpen && onClose();
  //   }, 2000);
  //   return () => clearTimeout(timeout);
  // }, [isOpen]);
  if (!isOpen) return;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 p-5 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white relative rounded-2xl shadow-xl p-6 max-w-sm w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <button onClick={onClose} className="absolute top-5 right-5">
              <X size={26} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Request Submitted</h2>
            <p className="text-gray-600 mt-2">We will reach out to you as soon as we can! Thank You. </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderPlacedDialog;
