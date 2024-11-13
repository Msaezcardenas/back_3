import { generateUsers } from '../utils/index.js';

const getUserMocking = (req, res) => {
  const { count } = req.query;
  if (!count || !Number(count)) {
    return res.status(404).send({ message: 'Error al recibir una cantidad' });
  }
  const users = generateUsers(count);
  res.send({ message: 'done', payload: users });
};

export default {
  getUserMocking,
};
