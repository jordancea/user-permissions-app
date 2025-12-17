import type { ReactNode } from 'react';
import { create } from 'zustand';


type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

interface DialogState {
  isOpen: boolean;
  content: ReactNode | null;
  size?: DialogSize;
  title?: string | ReactNode;
  dialogActions?: ReactNode;
  openDialog: (options: {
    content: ReactNode;
    title?: string | ReactNode;
    dialogActions?: ReactNode;
    size?: DialogSize;
  }) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  content: null,
  title: undefined,
  dialogActions: undefined,
  size: 'sm',
  openDialog: ({ content, title, dialogActions, size }) =>
    set({
      isOpen: true,
      content,
      title,
      dialogActions,
      size: size ?? 'sm',
    }),
  closeDialog: () =>
    set({
      isOpen: false,
      content: null,
      title: undefined,
      dialogActions: undefined,
      size: 'sm',
    }),
}));
