const request = require('supertest');
import { app } from "../../app";
describe('[Controller] Auth', () => {
    it('should access route and get token as response', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'junior.salesrep@stit.talent',
                password: 'ymWK5FHn27gjd9clZTR8QfZWOIBQTh1m'
            });
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
        expect(res.body).toHaveProperty('message', 'Dados inválidos');
    });

    it('should not allow access route (blank fields)', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: '',
                password: ''
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Usuário inexistente');
    });
});

describe('[DTO] Auth', () => {
    it('should not allow access route (number fields)', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 12345,
                password: 789456
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Usuário inexistente');
    });

    it('should not allow access route (boolean fields)', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: true,
                password: false
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Usuário inexistente');
    });
});

describe('[Use Case] Auth', () => {
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
});