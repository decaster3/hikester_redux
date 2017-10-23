import UIkit from 'uikit';
export function notification_success(message){
  UIkit.notification({
    message: message,
    status: 'primary',
    pos: 'top-left',
    timeout: 4000
  });
}
