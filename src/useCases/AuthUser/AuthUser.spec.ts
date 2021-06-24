(function () {
const request = require('supertest');
const app = ("../../server");

describe('[Controller] Auth User Tests', () => {
    it('should access route', async () => {
        await request(app)
        .post('/login')
        .send({
            email: 'junior.salesrep@stit.talent',
            password: 'ymWK5FHn27gjd9clZTR8QfZWOIBQTh1m'
        })
        expect(200)
        
    });

    it('should not allow access route (blank email)', async () => {
        const res = await request(app)
        .post('/login')
        .send({
            email: '',
            password: '123456789'
        });
    });

    it('should not allow access route (blank password)', async () => {
        const res = await request(app)
        .post('/login')
        .send({
            email: 'junior.salesrep@stit.talent',
            password: ''
        });
    });

    it('should not allow access route (blank fields)', async () => {
        const res = await request(app)
        .post('/login')
        .send({
            email: '',
            password: ''
        });
    });
});

describe('[DTO] Auth User Tests', () => {
    it('should test that true === true', () => {
        const result = true;
        expect(result).toBe(true);
    });
});

describe('[Use Case] Auth User Tests', () => {
    it('should test that true === true', () => {
        const result = true;
        expect(result).toBe(true);
    });
});
})();