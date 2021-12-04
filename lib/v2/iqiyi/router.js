module.exports = function (router) {
    router.get('/list/tvdrama/new/:area?', require('./list-tvdrama-new'));
};
