/* @flow */
import NotificationCatcherProvider from '../notificationCatcherProvider'
// Types
import type { WebsocketRequestType } from '../../models/notification-request'

export default class WebsocketNotificationCatcherProvider extends NotificationCatcherProvider {
  async send (request: WebsocketRequestType): Promise<string> {
    const { channel, body } =
      request.customize ? (await request.customize(this.id, request)) : request
    return this.sendToCatcher({
      to: `${channel ? channel : ''}@websocket`,
      from: '-',
      headers: {
        'X-type': 'websocket',
        'X-to': `[websocket] ${channel ? channel : ''}`,
        'X-payload': JSON.stringify({ body })
      }
    })
  }
}
