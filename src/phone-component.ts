import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import * as HandleBars from 'handlebars';

declare var $;

interface ICustomer {
    firstName: string;
    lastName: string;
    emails: ICellPhone[];
}

interface ICellPhone {
    countryCode: string;
    phoneNumber: string;
    isVerified: boolean;
    verifiedAt: string;
}

export class CellPhoneComponent {

    constructor() {
        this._client = new ApolloClient({
            networkInterface: createNetworkInterface({
                uri: 'http://localhost:5007/graphql',
                opts: {
                    method: 'POST'
                }
            }),
        });

        let source = document.getElementById("customer-cellphones-modal-template").innerHTML;
        this._template = HandleBars.compile(source);
    }

    getOtherCellPhonesForCustomer(id: string) {
        let response = this._client.watchQuery<{ customer: ICustomer }>({
            query: gql`
                query customerCellPhones($id: String){
                    customer(id: $id) {
                        firstName
                        lastName
                        cellPhones {
                            countryCode
                            phoneNumber
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
            next: res => this.renderCellPhonesModal(res.data),
            error: err => console.error(err)
        });
    }

    private renderCellPhonesModal(data: { customer: ICustomer }) {
        document.getElementById("customer-cellphones-modal-container").innerHTML = this._template(data);
        $("#customer-cellphones-modal").modal();
    }

    private _client: ApolloClient = null;
    private _template: HandlebarsTemplateDelegate;
}