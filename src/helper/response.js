export default {
    sendOK :(res, data) => {
        return res.status(200).send(data);
    },
    sendCreated :(res, data) => {
        return res.status(201).send(data);
    },

    sendBadRequest :(res, message) => {
        return res.status(400).send({
            success: false,
            message: message
        });
    },

    sendUnauthorized:(res, message) => {
        return res.status(401).send({
            success: false,
            message: message
        });
    },

    sendForbidden:(res) => {
        return res.status(403).send({
            success: false,
            message: 'You do not have rights to access this resource.'
        });
    },

    sendNotFound:(res) => {
        return res.status(404).send({
            success: false,
            message: 'Resource not found.'
        });
    },

    setHeadersForCORS:(req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept");
        next();
    }
}