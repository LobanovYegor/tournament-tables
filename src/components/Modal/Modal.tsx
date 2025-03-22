import { FC, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  disableBackdropClose?: boolean;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  disableBackdropClose,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-blend-soft-light bg-black/40"
      onClick={disableBackdropClose ? () => {} : onClose}
    >
      <div
        className="bg-white shadow-lg relative p-1"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center bg-primary-400 p-1 mb-2">
            <h2 className="text-xl font-semibold text-white ml-1">{title}</h2>
            <span
              className="material-symbols-outlined cursor-pointer text-white hover:bg-primary-300/50 active:bg-primary-300 p-1"
              onClick={onClose}
            >
              {' '}
              close{' '}
            </span>
          </div>
        )}

        <div>{children}</div>
      </div>

      <div className="footer"></div>
    </div>,
    document.body
  );
};
