/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
class APIError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}


class ForbiddenError extends APIError {
    constructor(message) {
        super(403, message)
        this.code=403;
    }
}

const apiErrors = Object.entries({
    BadRequest: {
        statusCode: 400,
        message: 'Bad Request',
    },
    Unauthorized: {
        statusCode: 401,
        message: 'Unathorized',
    },
    AccessDeniedError: {
        statusCode: 401,
        message: 'Access denied',
    },
    Forbidden: {
        statusCode: 403,
        message: 'Forbidden',
    },
    NotFound: {
        statusCode: 404,
        message: 'Not found',
    },
    Conflict: {
        statusCode: 409,
        message: 'Conflict',
    },
    UnSupportedMediaType: {
        statusCode: 415,
        message: 'Unsupported Media Type',
    },
    UnProcessableEntity: {
        statusCode: 422,
        message: 'Unprocessable Entity',
    },
    InternalServer: {
        statusCode: 500,
        message: 'Internal Server Error',
    },
    MethodNotAllowed: {
        statusCode: 405,
        message: 'Method Not Allowed',
    },
}).reduce((map, [name, data]) => {
    map[`${name}Error`] = map[name] = class extends Error {
        constructor(message = data.message, metadata = null) {
            super(message);
            this.name = `${name}Error`;
            this.status = data.statusCode;
            if(metadata) {
              this.data = metadata;
            }
        }
    };
    return map;
}, {});
Object.keys(apiErrors).map(elt=>{
    global[elt]=apiErrors[elt];
})
global['APIError']=APIError;
global['ForbiddenError']=ForbiddenError;

module.exports = {
    ...apiErrors,
    APIError,
    ForbiddenError
};
