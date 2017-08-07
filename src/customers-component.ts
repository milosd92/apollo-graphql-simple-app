import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import * as HandleBars from 'handlebars';

interface ICustomer {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    primaryEmail: {
        email: string;
    };
    primaryCellPhone: {
        phoneNumber: string;
    };
}

export class CustomersComponent {
    constructor() {
        this._client = new ApolloClient({
            networkInterface: createNetworkInterface({
                uri: 'http://localhost:5007/graphql',
                opts: {
                    method: 'POST'
                }
            }),
        });
    }

    getCustomers() {
        let response = this._client.watchQuery<{ customers: ICustomer[] }>({
            query: gql`
                query allCustomers {
                    customers {
                        id
                        username
                        firstName
                        lastName
                        primaryEmail {
                            email
                        }
                        primaryCellPhone {
                            phoneNumber
                        }
                    }
                }
                `,
                variables: {}
        });

        response.subscribe({
            next: res => this.renderCustomers(res.data),
            error: err => console.error(err)
        });
    }

    private renderCustomers(data: { customers: ICustomer[] }) {
        let source = document.getElementById("some-template").innerHTML;
        let template = HandleBars.compile(source);

        document.getElementById("customers-table-container").innerHTML = template(data);
    }

    private _client: ApolloClient = null;
}
