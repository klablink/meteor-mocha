import { fetch } from 'meteor/fetch';

export default (coverageOptions) => {
  let promise = Promise.resolve(true);

  if (coverageOptions) {
    const cLog = (...args) => {
      if (coverageOptions.verbose) {
        console.log(...args);
      }
    };

    cLog('Export code coverage');

    const importCoverageDump = () => async () => {
      cLog('- In coverage');
      return request({
        url: 'coverage/import',
        message: 'Failed to import coverage file.'
      })
    };

    const exportReport = async (fileType, reportType) => {
      cLog(`- Out ${fileType}`);

      return request({
        url: `/coverage/export/${fileType}`,
        message: `Failed to save ${fileType} ${reportType}.`
      })
    };

    const exportRemap = async () => {
      cLog('- Out remap');
      return request({
        url: '/coverage/export/remap',
        message: '`Failed to remap your coverage.'
      })
    };

    if (coverageOptions.in.coverage) {
      promise = promise.then(() => importCoverageDump());
    }

    if (coverageOptions.out.coverage) {
      promise = promise.then(() => exportReport('coverage', 'dump'));
    }

    if (coverageOptions.out.lcovonly) {
      promise = promise.then(() => exportReport('lcovonly', 'coverage'));
    }

    if (coverageOptions.out.html) {
      promise = promise.then(() => exportReport('html', 'report'));
    }

    if (coverageOptions.out.json) {
      promise = promise.then(() => exportReport('json', 'report'));
    }

    if (coverageOptions.out.text_summary) {
      promise = promise.then(() => exportReport('text-summary', 'report'));
    }

    if (coverageOptions.out.remap) {
      promise = promise.then(() => exportRemap());
    }

    if (coverageOptions.out.json_summary) {
      promise = promise.then(() => exportReport('json-summary', 'dump'));
    }

    promise = promise.catch(console.error);
  }

  return promise;
};

/**
 * Makes a standardized HTTP GET request to the server.
 * @private
 * @param url {string} relative path to the server endpoint
 * @param message {string} message to be added, in case an error is thrown
 * @return {Promise<any>}
 */
const request = async ({ url, message }) => {
  let response
  let data
  try {
    response = await fetch(Meteor.absoluteUrl(url));
    data = await response.json();
  } catch (error) {
    throw new Error(`${message} ${error.message}`);
  }


  if (response?.statusCode !== 200) {
    throw new Error(`${message} ${response?.statusCode} ${data}`);
  }

  return data
}
