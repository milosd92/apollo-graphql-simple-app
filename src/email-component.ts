import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import * as HandleBars from 'handlebars';

declare var $: any;

interface ICustomer {
    firstName: string;
    lastName: string;
    emails: IEmail[];
}

interface IEmail {
    email: string;
    isVerified: boolean;
    verifiedAt: string;
}

export class EmailComponent {

    constructor() {
        this._client = new ApolloClient({
            networkInterface: createNetworkInterface({
                uri: 'http://localhost:5007/graphql',
                opts: {
                    method: 'POST'
                }
            }),
        });

        let source = document.getElementById("customer-emails-modal-template").innerHTML;
        this._template = HandleBars.compile(source);
    }

    getOtherEmailsForCustomer(id: string) {
        let response = this._client.watchQuery<{ customer: ICustomer }>({
            query: gql`
                query customerEmails($id: String){
                    customer(id: $id) {
                        firstName
                        lastName
                        emails {
                            email
                            isVerified
                            verifiedAt
                        }
                    }
                }
            `,
            variables: {
                id: id
            }
        });

        response.subscribe({
            next: res => this.renderEmailsModal(res.data),
            error: err => console.error(err)
        });
    }

    private renderEmailsModal(data: { customer: ICustomer }) {
        document.getElementById("customer-emails-modal-container").innerHTML = this._template(data);
        $("#customer-emails-modal").modal();
    }

    private _client: ApolloClient = null;
    private _template: HandlebarsTemplateDelegate;
}