import {
    CustomerAuthController,
    CustomerController,
} from './controllers';

export default (app) => {
    // customer controllers
    app.use(new CustomerAuthController().router);
    app.use(new CustomerController().router);

    // admin controllers
};
