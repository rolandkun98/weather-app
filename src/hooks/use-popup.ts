import { useState } from "react";

interface UsePopupOutput {
  open: boolean;
  title: string;
  content: React.ReactNode;
  show: (popupTitle: string, popupContent: React.ReactNode) => void;
  close: () => void;
}

export const usePopup = (): UsePopupOutput => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<React.ReactNode>("");

  const show = (popupTitle: string, popupContent: React.ReactNode) => {
    setTitle(popupTitle);
    setContent(popupContent);
    setOpen(true);
  };

  const close = () => {
    setTitle("");
    setContent("");
    setOpen(false);
  };

  return { open, title, content, show, close };
};
