import Swal, { type SweetAlertIcon } from 'sweetalert2'

export async function globalConfirmPopup(
  title: string,
  icon: SweetAlertIcon = 'warning',
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  text?: string,
) {
  const result = await Swal.fire({
    title,

    text,

    icon,

    showCancelButton: true,

    confirmButtonColor: '#0d9488',

    cancelButtonColor: '#d33',

    confirmButtonText,

    cancelButtonText,
  })

  return result.isConfirmed
}
