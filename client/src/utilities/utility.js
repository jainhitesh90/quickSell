import { isEmpty, startCase } from 'lodash';
import AWS from 'aws-sdk';

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

function getS3Bucket() {
    var credentials = {
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY.toString(),
        secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY.toString()
    };
    AWS.config.update(credentials);
    AWS.config.region = process.env.REACT_APP_S3_REGION.toString();
    var bucket = new AWS.S3({
        params: {
            Bucket: process.env.REACT_APP_S3_BUCKET.toString()
        }
    });
    return bucket;
}

export default {
    validateInputFields, validateDataLength, getS3Bucket
};