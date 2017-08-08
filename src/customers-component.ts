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

        let source = document.getElementById("customers-table-template").innerHTML;
        this._template = HandleBars.compile(source);
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

    searchCustomersByUsername(username: string) {
        console.log(username);
        let response = this._client.watchQuery<{ customers: ICustomer[] }>({
            query: gql`
                query searchCustomersByUsername($username: String) {
                    customers(username: $username) {
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
                variables: {
                    username: username
                }
        });

        response.subscribe({
            next: res => this.renderCustomers(res.data),
            error: err => console.error(err)
        });
    }

    private renderCustomers(data: { customers: ICustomer[] }) {
        document.getElementById("customers-table-container").innerHTML = this._template(data);
    }

    private _client: ApolloClient = null;
    private _template;
}
