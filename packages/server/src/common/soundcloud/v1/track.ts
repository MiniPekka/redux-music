import axios from 'axios';
import * as humps from 'humps';
import { CLIENT_ID } from '@soundnode-redux/server/src/common/env';
import { BASE_V1 } from '../consts';

// TODO: CLIENT_ID should be passed in by the client
/**
 * Get track by id
 * @param {Number} trackId
 */
export function getTrackById(trackId: number) {
  return axios
    .get(`${BASE_V1}/tracks/${trackId}?client_id=${CLIENT_ID}`)
    .then(response => response.data)
    .then(data => humps.camelizeKeys(data));
}
