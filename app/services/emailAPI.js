/**
 * Created by limyandivicotrico on 10/3/17.
 */
import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({baseUrl: apiEndpoint});
    return {
        sendEmail: data => client.request({
            method: 'POST',
            url: '/sendinvite',
            data,
        }),
        sendConfirm: data => client.request({
            method: 'POST',
            url: '/sendconfirm',
            data,
        })
    };
};
