import { request, expect } from '../../';
import { CustomerModel } from '../../../models';

let createdCustomer = [];
let customerPIN = null;

describe('CustomerAuthController test', () => {
    before(done => {
        done();
    });

    after(done => {
        CustomerModel.removeCustomer({ _id: createdCustomer._id })
            .then(() => {
                done();
            });
    });

    beforeEach((done) => {
        // runs before each test in this block
        done();
    });

    afterEach((done) => {
        // runs after each test in this block
        done();
    });

    describe('create customer test --', () => {
        it('should validate required field name', done => {
            request
                .post('/api/v1/signup')
                .send({ phone: '+94777610577', zip: '12345' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.body.error).to.equal('Unprocessable Entity');
                    done();
                });
        });
        it('should validate required field phone', done => {
            request
                .post('/api/v1/signup')
                .send({ name: 'Alex', zip: '12345' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.body.error).to.equal('Unprocessable Entity');
                    done();
                });
        });
        it('should create a new customer', done => {
            request
                .post('/api/v1/signup')
                .send({ name: 'Alex Domino', phone: '+94777610577', zip: '12345' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    createdCustomer = res.body;
                    done();
                });
        });
        it('should validate duplicate customers', done => {
            request
                .post('/api/v1/signup')
                .send({ name: 'Alex Domino', phone: '+94777610577', zip: '12345' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('Customer already exists');
                    done();
                });
        });
    });

    describe('customer login test --', () => {
        it('should not allow login without phone', done => {
            request
                .post('/api/v1/login')
                .send({}) // phone: createdCustomer.phone 
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('No customer found');
                    done();
                });
        });
        it('should validate phone number', done => {
            request
                .post('/api/v1/login')
                .send({ phone: '34343434343' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('No customer found');
                    done();
                });
        });
        it('should login success', done => {
            request
                .post('/api/v1/login')
                .send({ phone: '+94777610577' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('Verification code sent');
                    done();
                });
        });
        it('should validate customer login verification without phone', done => {
            request
                .post('/api/v1/verify')
                .send({ phone: '', code: '2324' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('No customer found');
                    done();
                });
        });
        it('should verify customer login PIN', done => {
            request
                .post('/api/v1/verify')
                .send({ phone: '+94777610577', code: '' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('Invalid verification code');
                    done();
                });
        });
    });
});
