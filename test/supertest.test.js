import { expect } from 'chai';
import supertest from 'supertest';

// const expect = chai.expect;
const requester = supertest('http://localhost:8080');

beforeEach(async () => {
  const userId = '6759ad18307c7e5b3b9c3b88'; // ID del usuario a eliminar
  await requester.delete(`/api/users/${userId}`); // Haz la solicitud DELETE a la API
});

describe('Testing Adoptme', () => {
  it('Debería de crear correctamente una mascota en /api/pets', async () => {
    const mockPet = {
      name: 'Luffy',
      specie: 'tuxydo',
      birthDate: '2023-03-19',
    };
    const { statusCode, ok, _body } = await requester.post('/api/pets/').send(mockPet);
    expect(statusCode).to.be.eq(200);
    expect(ok).to.be.eq(true);
    expect(_body.payload).to.have.property('_id');
  });
});

describe('Login/Register', () => {
  let cookie = {};
  it('Deberia de registrar un usuario correctamente', async () => {
    const mockUser = {
      first_name: 'Molu',
      last_name: 'saez',
      email: 'molu@gmail.com',
      password: '123',
    };
    const { statusCode, _body } = await requester.post('/api/sessions/register').send(mockUser);

    expect(statusCode).to.be.eq(200);
    expect(_body.payload).to.be.ok;
  });

  it('Deberia de loguear correctamente y ademas devolver una cookie por header', async () => {
    const mockUser = {
      email: 'molu@gmail.com',
      password: '123',
    };

    const response = await requester.post('/api/sessions/login').send(mockUser);
    const cookieResult = response.headers['set-cookie'][0];
    const { 0: nameCookie, 1: valueCookie } = cookieResult.split('=');

    cookie = {
      name: nameCookie,
      value: valueCookie,
    };

    expect(cookieResult).to.be.ok;
    expect(cookie.value).to.be.ok;
    expect(cookie.name).to.be.eql('coderCookie');
  });

  it('Debe de validar la cookie, obtener el token y devolver el usuario de dicho token', async () => {
    const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);
    expect(_body.payload.email).to.be.eql('molu@gmail.com');
  });
});
