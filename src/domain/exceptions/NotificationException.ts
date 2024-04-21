import { Notification } from '../validation/handlers/Notification';
import { DomainException } from './DomainException';

export class NotificationException extends DomainException {
  constructor(message: string, notification: Notification) {
    super(message, notification.getErrors());
  }
}
