/* @flow */
import WebsocketCentrifugoProvider from './centrifugo'
import WebsocketLoggerProvider from '../logger'
import WebsocketNotificationCatcherProvider from './notificationCatcher'
// Types
import type { WebsocketRequestType } from '../../models/notification-request'

export interface WebsocketProviderType {
  id: string,
  send(request: WebsocketRequestType): Promise<string>
}

export default function factory ({ type, ...config }: Object): WebsocketProviderType {
  switch (type) {
    // Development
    case 'logger':
      return new WebsocketLoggerProvider(config, 'websocket')

    case 'notificationcatcher':
      return new WebsocketNotificationCatcherProvider('websocket')

    // Custom
    case 'custom':
      return config

    // Providers
    case 'centrifugo':
      return new WebsocketCentrifugoProvider(config)

    default:
      throw new Error(`Unknown websocket provider "${type}".`)
  }
}
