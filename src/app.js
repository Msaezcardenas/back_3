import express from 'express';
import cookieParser from 'cookie-parser';

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import { connectionDB } from './mongo/connection.js';
import dotenv from 'dotenv';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();
// const connection = mongoose.connect(
//   `mongodb+srv://molusaezcardenas:tSUzZOhFjzWqQmid@ecommerce.cxnn6t9.mongodb.net/?retryWrites=true&w=majority&appName=Pets`,
// );

connectionDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Adopme api',
      description:
        'API para gestionar la adopción de mascotas, permitiendo a los usuarios explorar animales disponibles, registrarse, y gestionar solicitudes de adopción. Incluye endpoints para animales, usuarios y procesos de adopción.',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJsDoc(swaggerOptions);

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
