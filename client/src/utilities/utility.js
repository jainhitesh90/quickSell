import { isEmpty, startCase } from 'lodash';

const validateInputFields = (key, value) => {
    if (isEmpty(value)) {
        return startCase(key) + " cannot be empty";
    } else {
        return null;
    }
}

export default {
    validateInputFields
};