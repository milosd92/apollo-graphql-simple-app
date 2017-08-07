import { CustomersComponent } from './customers-component';
import { EmailComponent } from './email-component';

let customersComponent = new CustomersComponent();
customersComponent.getCustomers();

let test = <any>window;

test.emailComponent = new EmailComponent();