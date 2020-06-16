import axios from 'axios';

const getData = async function get(url) {
    return await axios.get(url)
        .then(result => { return result })
        .catch(error => { return error.response });
}

const postData = async function post(url, payload) {
    return await axios.post(url, payload)
        .then(result => { return result })
        .catch(error => { return error.response });
}

const deleteData = async function post(url) {
    return await axios.delete(url)
        .then(result => { return result })
        .catch(error => { return error.response });
}

export default {
    getData, postData, deleteData
};
