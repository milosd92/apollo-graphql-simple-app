"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_client_1 = require("apollo-client");
var graphql_tag_1 = require("graphql-tag");
var client = new apollo_client_1.default({
    networkInterface: apollo_client_1.createNetworkInterface({
        uri: 'http://openlimo-test.mocosha.com/customer-query-api/graphql',
        opts: {
            method: 'POST'
        }
        // opts: {
        //     mode: 'no-cors',
        //     credentials: 'same-origin',
        // }
    }),
});
var response = client.watchQuery({
    query: (_a = ["\n        query allCustomers {\n            customers {\n                firstName\n                lastName\n            }\n        }\n        "], _a.raw = ["\n        query allCustomers {\n            customers {\n                firstName\n                lastName\n            }\n        }\n        "], graphql_tag_1.default(_a)),
});
response.subscribe({ next: function (data) {
        console.log(data.data.customers[0].firstName);
    }, error: function (err) { return console.error(err); } });
var _a;
