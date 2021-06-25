const request = require('supertest');
import { app } from "../../app";
describe('[Controller] Auth User Tests', () => {
    it('should access route and get token as response', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'junior.salesrep@stit.talent',
                password: 'ymWK5FHn27gjd9clZTR8QfZWOIBQTh1m'
            })
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
    });

    it('should not allow access route (blank email)', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: '',
                password: '123456789'
            })
            
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', 'Usuário inexistente');
            
    });

    it('should not allow access route (blank password)', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'junior.salesrep@stit.talent',
                password: ''
            });

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', 'Dados inválidos')
    });

    it('should not allow access route (blank fields)', async () => {
        const res = await request(app)
        .post('/login')
        .send({
            email: '',
            password: ''
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Usuário inexistente')
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