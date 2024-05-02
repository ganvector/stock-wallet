import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
axios.defaults.validateStatus = (_status) => true;

export class HttpApiGateway {
  constructor(private readonly route: string) {}

  async post(endpoint: string = '', body?: Record<string, any>) {
    const { status, data } = await axios.post(this.route + endpoint, body);
    return {
      status,
      data,
    };
  }

  async get(
    endpoint: string = '',
    queryString?: Record<string, string | number>,
  ) {
    let qs = '';
    if (queryString) {
      qs =
        '?' +
        Object.keys(queryString)
          .map((key) => `${key}=${queryString[key]}`)
          .join('&');
    }
    const { status, data } = await axios.get(this.route + '/' + endpoint + qs);
    return {
      status,
      data,
    };
  }
}
