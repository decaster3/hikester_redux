import UIkit from 'uikit';
export function notification_success(message){
  UIkit.notification({
    message: message,
    status: 'primary',
    pos: 'top-left',
    timeout: 4000
  });
}

export function notification_error(message){
  UIkit.notification({
    message: message,
    status: 'error',
    pos: 'top-left',
    timeout: 4000
  });
}
