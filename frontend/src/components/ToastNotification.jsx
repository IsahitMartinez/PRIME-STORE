import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

function ToastNotification({ message, isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-6 right-6 z-[70] flex items-center gap-3 bg-black text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-gray-800"
        >
          <AlertCircle size={20} className="text-white" />
          <span className="text-sm font-semibold tracking-wide">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ToastNotification;