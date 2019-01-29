import {
    CustomerAuthController,
    CustomerController,
    AdminAuthController,
    AdminController,
} from './controllers';

export default (app) => {
    // customer controllers
    app.use(new CustomerAuthController().router);
    app.use(new CustomerController().router);

    // admin controllers
    app.use(new AdminAuthController().router);
    app.use(new AdminController().router);
};
