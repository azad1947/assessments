
export const async_handler = (handler) => {
    return (req, res, next) => {
        handler(req, res, next).catch(next);
    }
}

export const error_handler = (err, req, res, next) => {
    let error_obj;
    const { errors } = err;

    if (errors) {
        error_obj = Object.keys(errors).reduce((acc, key) => {
            acc[key] = errors[key].message;
            return acc;
        }, {})
    }

    const error = {
        status: err.status || 400,
        error: error_obj || err.message
    }

    if (process.env.NODE_ENV === 'dev') {
        error.stack = err.stack;
    }

    res.json({ error });
}