export interface MessageModalProps {
  isOpen: boolean;
  type?: 'success' | 'error';
  title?: string;
  message?: string;
  onClose: () => void;
  autoClose?: number;
}
