import { petsService, usersService } from '../services/index.js';
import { generateUsers, generatePets } from '../utils/index.js';

const getUserMocking = (req, res) => {
  const { count } = req.query;
  if (!count || !Number(count)) {
    return res.status(404).send({ message: 'Error al recibir una cantidad' });
  }
  const users = generateUsers(count);
  res.send({ message: 'done', payload: users });
};

const generatePetsMocking = async (req, res) => {
  const { count } = req.query;

  if (!count || !Number(count)) {
    return res.status(404).send({ message: 'Error al recibir una cantidad' });
  }
  const pets = generatePets(count);
  res.send({ message: 'done', payload: pets });
};

const generateData = async (req, res) => {
  const { countUsers, countPets } = req.body;

  if (!countUsers || !Number(countUsers) || !countPets || !Number(countPets)) {
    return res.status(404).send({ message: 'Error al recibir una cantidad' });
  }
  const users = generateUsers(countUsers);
  const pets = generatePets(countPets);
  try {
    for (const user of users) {
      await usersService.create(user);
    }

    for (const pet of pets) {
      await petsService.create(pet);
    }
  } catch (error) {
    return res.status(404).send({ message: 'Error al mometno de crear un usuario' });
  }

  res.status(200).send({ message: 'Usuarios creados', payload: { users, pets } });
};

export default {
  getUserMocking,
  generateData,
  generatePetsMocking,
};
