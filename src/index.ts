import { CustomersComponent } from './customers-component';
import { EmailComponent } from './email-component';
import { CellPhoneComponent } from './phone-component';

let customersComponent = new CustomersComponent();
customersComponent.getCustomers();

let test = <any>window;

test.emailComponent = new EmailComponent();
test.cellPhoneComponent = new CellPhoneComponent();