import { Button } from "../../ui";
import { type ModalProps } from "../../../types";
import XMarkIcon from "../../../assets/X-mark.svg?react";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Закрыть окно">
          <XMarkIcon className="icon-m" />
        </button>
        
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>
        
        <div className="modal-actions">
          {secondaryButtonText && (
            <Button variant="default" colorVariant="secondary" onClick={onSecondaryClick}>
              {secondaryButtonText}
            </Button>
          )}
          {primaryButtonText && (
            <Button variant="default" colorVariant="primary" onClick={onPrimaryClick}>
              {primaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
