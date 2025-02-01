export function openModal(modalId: string) {
  const modal = document.getElementById(modalId);
  if (modal) {
    (modal as HTMLDialogElement).showModal();
  }
}

export function closeModal(modalId: string) {
  const modal = document.getElementById(modalId);
  if (modal) {
    (modal as HTMLDialogElement).close();
  }
}
