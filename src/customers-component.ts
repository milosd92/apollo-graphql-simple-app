import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import * as HandleBars from 'handlebars';

interface Customer {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    externalLogins: string;
}

export class CustomersComponent {
    constructor() {
        this._client = new ApolloClient({
            networkInterface: createNetworkInterface({
                uri: 'http://openlimo-test.mocosha.com/customer-query-api/graphql',
                opts: {
                    method: 'POST'
                }
            }),
        });
    }

    getCustomers() {
        var response = this._client.watchQuery<{ customers: Customer[] }>({
            query: gql`
                query {
                    customers {
                        id
                        username
                        firstName
                        lastName
                        externalLogins
                    }
                }
                `
        });

        response.subscribe({
            next: res => this.renderCustomers(res.data),
            error: err => console.error(err)
        });
    }

    private renderCustomers(data: { customers: Customer[] }) {
        let source = document.getElementById("some-template").innerHTML;
        let template = HandleBars.compile(source);

        document.getElementById("customers-table-container").innerHTML = template(data);
    }

    private _client: ApolloClient = null;
}
