/* @flow */
import jwt from 'jsonwebtoken';
import axios from 'axios';

// Types
import type { WebsocketRequestType } from '../../models/notification-request'

export default class WebsocketCentrifugoProvider {
  id: string = 'websocket-centrifugo-provider'
  options: Object

  constructor ({ apiUrl, apiKey, apiSecret }: Object) {
    this.apiKey = apiKey
    this.apiUrl = apiUrl
    this.apiSecret = apiSecret
    this.authToken = jwt.sign("system", apiSecret);
    this.client = axios.create({
      baseURL: this.apiUrl,
    });
    this.client.interceptors.request.use((config) => {
      config.headers = {Authorization: 'Bearer ' + this.authToken};
    })
  }

  async send (request: WebsocketRequestType): Promise<string> {
    const { channel, body } = request.customize ? (await request.customize(this.id, request)) : request
      return await this.client.post('/', {
        'method': 'publish',
        'params': {
          'channel': channel,
          'data': body
        }
      });
  }
}
