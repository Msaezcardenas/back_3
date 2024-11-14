import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { faker } from '@faker-js/faker';

export const createHash = async (password) => {
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};

export const passwordValidation = async (user, password) => bcrypt.compare(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateUsers = (count) => {
  const cantidad = Number(count);
  const users = [];
  for (let i = 0; i <= cantidad; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      rol: i % 3 === 0 ? 'admin' : 'user',
      password: 'coder123',
      pets: [],
    };
    users.push(user);
  }
  return users;
};

export const generatePets = (count) => {
  const cantidad = Number(count);
  const pets = [];
  for (let i = 0; i <= cantidad; i++) {
    const pet = {
      name: faker.animal.petName(),
      specie: faker.animal.type(),
      birthDate: faker.date.between({ from: '2000-01-01', to: Date.now() }),
      adopted: false,
      owner: null,
      image: faker.image.url({ width: 200, height: 200, category: 'animals' }),
    };
    pets.push(pet);
  }
  return pets;
};

export default __dirname;
