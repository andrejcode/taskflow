interface ModalProps {
  modalId: string;
  content: React.ReactNode;
  action: React.ReactNode;
}

export default function Modal({ modalId, content, action }: ModalProps) {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        {content}
        <div className="modal-action">
          {action}
          <form method="dialog">
            {/* If there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
