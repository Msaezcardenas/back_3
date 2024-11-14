import { usersService } from '../services/index.js';
import { generateUsers } from '../utils/index.js';

const getUserMocking = (req, res) => {
  const { count } = req.query;
  if (!count || !Number(count)) {
    return res.status(404).send({ message: 'Error al recibir una cantidad' });
  }
  const users = generateUsers(count);
  res.send({ message: 'done', payload: users });
};

const generateData = async (req, res) => {
  const { countUsers, countPets } = req.body;
  if (!countUsers || !Number(countUsers) || !countPets || !Number(countPets)) {
    return res.status(404).send({ message: 'Error al recibir una cantidad' });
  }
  const users = generateUsers(countUsers);
  try {
    for (const user of users) {
      await usersService.create(user);
    }
  } catch (error) {
    return res.status(404).send({ message: 'Error al mometno de crear un usuario' });
  }

  // const pets = generateUsers(conuntPets);
  res.status(200).send({ message: 'Usuarios creados', payload: users });
};

export default {
  getUserMocking,
  generateData,
};
