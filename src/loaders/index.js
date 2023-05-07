function load(router,router_v2) {
    require('./config');
    require('./database');

    return {
        routes: require('./v1/routes')(router),
        routes_v2: require('./v2/routes')(router_v2),
    };
}

module.exports = load;