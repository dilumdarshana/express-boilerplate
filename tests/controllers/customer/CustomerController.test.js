import { request, expect } from '../..';
import { CustomerModel } from '../../../models';

let createdCustomer = [];

describe('CustomerController test', () => {
    before(async () => {
        createdCustomer = await CustomerModel.create({ name: 'Elon Musk', phone: '+94777610577', zip: '12345' });

        await request.post('/api/v1/login').send({ phone: createdCustomer.phone }).set('Accept', 'application/json');

        // const token = await request.post('/api/v1/verify').send({ phone: createdCustomer.phone, code: '' }).set('Accept', 'application/json');
    });

    after(async () => {
        // await CustomerModel.removeCustomer({ _id: createdCustomer._id })

    });

    beforeEach((done) => {
        // runs before each test in this block
        done();
    });

    afterEach((done) => {
        // runs after each test in this block
        done();
    });

    describe('view my reservations test --', () => {
        it('should list my reservations', (done) => {
            expect(true).to.be.equals(true);
            done();
        });
    });
});
