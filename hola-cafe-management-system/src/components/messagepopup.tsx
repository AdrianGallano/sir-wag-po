import React, { useEffect } from "react";
import "@/index.css";

interface MessagePopupProps {
  message: string;
  onClose: () => void;
  onOpen: boolean;
}

const MessagePopup: React.FC<MessagePopupProps> = ({
  message,
  onClose,
  onOpen,
}) => {
  useEffect(() => {
    if (onOpen) {
      const timer = setTimeout(onClose, 1500);
      return () => clearTimeout(timer);
    }
  }, [onOpen, onClose]);

  if (!onOpen) {
    return null;
  }

  return (
    <div className=" rounded-md  shadow-lg absolute z-10 top-2.5 right-2.5">
      <div className="z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none ">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessagePopup;
