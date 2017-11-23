//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let Company = require('../models/company');


chai.use(chaiHttp);
//Our parent block
describe('Comapny', () => {
    beforeEach((done) => { //Before each test we empty the database
        Company.remove({}, (err) => {
            done();
        });
    });

    /*
      * Test the /GET route
      */



    describe('/api/company company', () => {
        it('it should add the company', (done) => {
            let Company = {
                name: 'ABC Corp Mumbai',
                address: {
                    addressLine1: '47 Village Court',
                    addressLine2: 'Hazlet',
                    postalCode: 07730,
                    postalName: 'Hazlet',
                    countryCode: 'US',
                },
                size: 750,
                website: 'www.abccorp.com',
                Industry: 'IT'
            }
            chai.request(server)
                .post('/api/company')
                .send(Company)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Created');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('company').eql(true);
                    res.body.data.should.have.property('companyData');
                    res.body.data.companyData.should.be.a('object');
                    done();
                });
        });

    });

    describe('/PUT/:id book', () => {
        it('it should update the website', (done) => {
            let company = new Company({
                name: 'ABC Corp Mumbai',
                address: {
                    addressLine1: '47 Village Court',
                    addressLine2: 'Hazlet',
                    postalCode: 07730,
                    postalName: 'Hazlet',
                    countryCode: 'US',
                },
                size: 750,
                website: 'www.abccorp.com',
                Industry: 'IT'
            });

            company.save((err, book) => {
                chai.request(server)
                    .put('/api/company/' + book._id)
                    .send({ website: 'www.test.com' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Updated Successfully');
                        done();
                    });
            });
        });
    });

    describe('/delete/:id company', () => {
        it('it should Delete the company', (done) => {
            let company = new Company({
                name: 'ABC Corp Mumbai',
                address: {
                    addressLine1: '47 Village Court',
                    addressLine2: 'Hazlet',
                    postalCode: 07730,
                    postalName: 'Hazlet',
                    countryCode: 'US',
                },
                size: 750,
                website: 'www.abccorp.com',
                Industry: 'IT'
            });

            company.save((err, book) => {
                chai.request(server)
                    .delete('/api/company/' + book._id)
                    .send({ website: 'www.test.com' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Company Deleted successfully');
                        done();
                    });
            });
        });
    });

    describe('/GET company', () => {
        it('it should GET all the companies', (done) => {
            chai.request(server)
                .get('/api/company')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('company');
                    res.body.data.should.have.property('companyList');
                    res.body.data.companyList.should.be.a('array');
                    done();
                });
        });
    })
});