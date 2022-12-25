import {GET, POST, UPLOAD, PUT, DELETE} from './constants';
import Axios from 'axios';

let CancelToken = Axios.CancelToken;

var cancel = () => {};
export const cancelRequest = () => {
  return cancel;
};
function getJsonBody(params: any) {
  return params;
}
function getQueryString(params: any) {
  let esc = encodeURIComponent;
  return (
    '?' +
    Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&')
  );
}

export const fetch = (
  requestType: String,
  requestURL: String,
  parameters: any,
) => {
  var token = parameters.token;
  delete parameters.token;

  console.log(requestType, " "+requestURL)

  switch (requestType) {
    case GET:
      return new Promise((resolve, reject) => {
        var queryString = getQueryString(parameters);
  
        Axios.get('/' + requestURL + queryString, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error.response.data);
          });
      });
    case POST:
      return new Promise((resolve, reject) => {
        var jsonBody = getJsonBody(parameters);
        Axios.post('/' + requestURL, jsonBody, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        })
          .then(response => {
            console.log("berhasil")
            resolve(response.data);
          })
          .catch(error => {
            console.log("why: "+error)
            reject(error.response.data);
          });
      });
    case PUT:
      return new Promise((resolve, reject) => {
        var jsonBody = getJsonBody(parameters);
        Axios.put('/' + requestURL, jsonBody, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        })
          .then(response => {
            console.log("berhasil: ")
            resolve(response.data);
          })
          .catch(error => {
            console.log("why: "+error)
            reject(error);
          });
      });

    case DELETE:
      return new Promise((resolve, reject) => {
        var jsonBody = getJsonBody(parameters);
        Axios.delete('/' + requestURL, {
          data: jsonBody,

          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error.response.data);
          });
      });

    case UPLOAD:
      return new Promise((resolve, reject) => {
        const config = {
          headers: {
            Authorization: 'Bearer ' + token,
            'content-type': 'multipart/form-data',
            'APP-ORIGIN': 'marketplace',
          },
        };
        // var data = new FormData();
        // data.append('type', 'documents');
        // data.append('owner', parameters.owner);
        // data.append('filename', parameters.fileName);

        Axios.post('/' + requestURL, parameters.body, config)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error.response.data);
          });
      });

    default:
      break;
  }
};

