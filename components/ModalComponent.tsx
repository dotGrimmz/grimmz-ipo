type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  content?: any;
  title?: string;
  titleStyles?: any;
  contentStyles?: any;
  modalStyles?: any;
};

export const ModalComponent = ({
  isOpen,
  closeModal,
  title,
  content,
  titleStyles,
  contentStyles,
  modalStyles,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal" open>
      <div className="modal-box" style={modalStyles}>
        <h3 className="font-bold text-lg" style={titleStyles}>
          {title}
        </h3>
        <div className="py-4" style={contentStyles}>
          {content}
        </div>
        <div className="modal-action">
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
