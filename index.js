var Axios = require('axios');
var _ = require('lodash');

function fetchLights(api_url, api_username) {
    const url = `${api_url}/api/${api_username}`;

    return new Promise((resolve, reject) => {
        Axios({
            method: 'get',
            url
        })
            .then((response) => {
                var newLights = [];

                _.map(response.data.lights, (light, id) => {
                    var lightObj = {
                        id: parseInt(id),
                        name: light.name,
                        on: light.state.on,
                        brightness: light.state.bri
                    }
                    newLights.push(lightObj);
                })

                resolve(newLights);
            })
            .catch((error) => {
                reject(error);
            })
    })
};

function updateLight(api_url, api_username, lightId = 0, data = {}) {
    const url = `${api_url}/api/${api_username}/lights/${lightId}/state`;

    return new Promise((resolve, reject) => {
        Axios({
            method: 'put',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

module.exports = { fetchLights, updateLight };
