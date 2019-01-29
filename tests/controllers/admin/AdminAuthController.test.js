import { request, expect } from '../..';
import { CustomerModel } from '../../../models';

let createdCustomer = [];

describe('AdminAuthController test', () => {
    before((done) => {
        done();
    });

    after((done) => {
        done();
    });

    beforeEach((done) => {
        // runs before each test in this block
        done();
    });

    afterEach((done) => {
        // runs after each test in this block
        done();
    });

    describe('admin login test --', () => {
        it('should not allow login without email', (done) => {
            request
                .post('/api/v1/admin/login')
                .send({ password: '121' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(422);
                    expect(res.body.message).to.equal('"email" is required');
                    done();
                });
        });
        it('should not allow login without password', (done) => {
            request
                .post('/api/v1/admin/login')
                .send({ email: 'dilum.dar@gmail.com' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(422);
                    expect(res.body.message).to.equal('"password" is required');
                    done();
                });
        });
        it('should login success', (done) => {
            request
                .post('/api/v1/admin/login')
                .send({ email: 'dilum.dar@gmail.com', password: '123' })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.body.message).to.equal('Admin User authenticated');
                    done();
                });
        });
    });
});
