import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';
import userModel from '../src/dao/models/User.js';
import adoptionModel from '../src/dao/models/Adoption.js';
import petModel from '../src/dao/models/Pet.js';
import { users, pets } from './herlpers.js';

const api = supertest(app);

let userIds = [];
let petIds = [];

before(async function () {
  this.timeout(5000);

  await userModel.deleteMany({});
  await petModel.deleteMany({});
  await adoptionModel.deleteMany({});
  // Código de configuración

  for (const user of users) {
    const userResponse = await api.post('/api/sessions/register').send(user);
    userIds.push(userResponse.body.payload);
  }

  for (const pet of pets) {
    const petResponse = await api.post('/api/pets').send(pet);
    petIds.push(petResponse.body.payload._id);
  }
});

describe('ENDPOINT POST [/api/adoptions/uid/pid]', () => {
  it('Debería crear un registro con un uid y un pid', async () => {
    const { statusCode, _body, ok } = await api.post(`/api/adoptions/${userIds[0]}/${petIds[0]}`);
    expect(statusCode).to.be.eq(200);
    expect(ok).to.be.eq(true);
    expect(_body.status).to.be.eq('success');
  });

  it('Debería devolver un error con uid y pid invalidos', async () => {
    const fakePetId = '675c69123d3d2955ddes66e6';
    const fakeUserId = '963c69123d3d2955fkes66e6';
    const { statusCode, ok } = await api.get(`/api/adoptions/${fakeUserId}/${fakePetId}`);
    expect(statusCode).to.be.eq(404);
    expect(ok).to.be.eq(false);
  });
});

describe('ENDPOINT GET [/api/adoptions/:aid]', () => {
  it('Debería traer un registro con un aid', async () => {
    await api.post(`/api/adoptions/${userIds[1]}/${petIds[1]}`);
    const adoptionFinded = await adoptionModel.find({ owner: userIds[1] });
    const { statusCode, _body, ok } = await api.get(`/api/adoptions/${adoptionFinded[0]._id}`);
    expect(statusCode).to.be.eq(200);
    expect(ok).to.be.eq(true);
    expect(_body.status).to.be.eq('success');
  });
});

describe('ENDPOINT GET [/api/adoptions]', () => {
  it('Debería traer todas las mascotas creadas', async () => {
    const { statusCode, _body, ok } = await api.get('/api/adoptions');
    expect(statusCode).to.be.eq(200);
    expect(ok).to.be.eq(true);
    expect(Array.isArray(_body.payload)).to.be.equal(true);
  });
});

after(async () => {
  await userModel.deleteMany({});
  await petModel.deleteMany({});
});
