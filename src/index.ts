import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://openlimo-test.mocosha.com/customer-query-api/graphql',
        opts: {
            method: 'POST'
        }
    }),
});

interface Customer {
    firstName: string;
    lastName: string;
}

let response = client.watchQuery<{ customers: Customer[] }>({
    query: gql`
        query allCustomers {
            customers {
                firstName
                lastName
            }
        }
        `,
});

response.subscribe({
    next: data => {
        console.log(data.data.customers[0].firstName)
    },
    error: err => console.error(err)
});
