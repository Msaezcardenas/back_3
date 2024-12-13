import mongoose from 'mongoose';
import Users from '../src/dao/Users.dao.js';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_STRING, { dbName: process.env.USE_DB });

describe('User Dao', () => {
  before(function () {
    this.userDao = new Users();
  });

  it('Deberia de retornar un array de usuarios', async function () {
    const result = await this.userDao.get();
    expect(Array.isArray(result)).to.be.equal(true);
  });

  it('Deberia de retornar un usuario por mail', async function () {
    const email = 'Bradley.Hackett9@yahoo.com';
    const result = await this.userDao.getBy({ email });

    expect(result.first_name).to.be.equal('Torrey');
    expect(result.last_name).to.be.equal('Morar');
  });
});
