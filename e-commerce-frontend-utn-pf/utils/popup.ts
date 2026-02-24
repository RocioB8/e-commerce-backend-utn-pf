import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

const CONFIRM_COLOR = '#ffcad4'; 
const CANCEL_COLOR = '#95afc0';  
const TEXT_COLOR = '#4a4a4a';    


const defaultTitles: Record<string, string> = {
  success: "¡Logrado!",
  error: "Ups, hubo un problema",
  warning: "Atención",
  info: "Información",
  question: "¿Estás seguro?"
};

interface PopupOptions {
  textTitle?: string;
  textContent?: string;
  icon?: SweetAlertIcon;
  showCancelButton?: boolean;
  btnTextConfirm?: string;
}

const generatePopup = ({
  textTitle,
  textContent = "Los datos se procesaron correctamente",
  icon = "success",
  showCancelButton = false,
  btnTextConfirm = "Aceptar"
}: PopupOptions = {}): Promise<SweetAlertResult> => {

  const finalTitle = textTitle || defaultTitles[icon] || "Mensaje";

  return Swal.fire({
    title: `<span style="color: ${TEXT_COLOR}; font-family: sans-serif;">${finalTitle}</span>`,
    html: `<span style="color: ${TEXT_COLOR}; opacity: 0.8;">${textContent}</span>`,
    icon,
    showCancelButton,
    confirmButtonText: btnTextConfirm,
    cancelButtonText: "Cancelar",
    confirmButtonColor: CONFIRM_COLOR,
    cancelButtonColor: CANCEL_COLOR,
    
    customClass: {
      popup: 'retro-popup-border'
    }
  });
};

export { generatePopup };