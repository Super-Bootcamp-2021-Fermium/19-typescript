import { client } from '../lib/http-client';

import { SERVICE_BASEURL } from  './config';

export function summary(): Promise<any> {
  return client.get(`${SERVICE_BASEURL}/summary`);
}

