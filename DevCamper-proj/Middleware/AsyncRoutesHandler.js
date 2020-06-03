export const routesHandler = fn => (req, res, next) => {
    Promise.resolve( fn(req, res, next) ).catch(next);
};