/* @flow */
// Types
import type { WebsocketRequestType } from './notification-request'

export type WebsocketProviderType = {
  type: 'logger'
} | {
  type: 'custom',
  id: string,
  channel: string,
  send: (WebsocketRequestType) => Promise<string>
} | {
  type: 'centrifugo',
  api?: {
    url: string,
    key: string,
    secret: string
  },
}
