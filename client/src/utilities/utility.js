import { isEmpty, startCase } from 'lodash';

const validateInputFields = (key, value) => {
    if (isEmpty(value)) {
        return startCase(key) + " cannot be empty";
    } else {
        return null;
    }
}

function validateDataLength(key, value) {
    if (isEmpty(value)) {
        return startCase(key) + " cannot be empty";
    }
    const stringLength = value.trim().split(/\s+/).length;
    console.log('length', stringLength);
    if (stringLength < 50 || stringLength > 200) {
        return startCase(key) + " should be between 50 & 200 words"
    } else {
        return null
    }
}

export default {
    validateInputFields, validateDataLength
};