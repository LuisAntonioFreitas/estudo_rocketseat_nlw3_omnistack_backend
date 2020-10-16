import { Router } from 'express';

import multer from 'multer';
import uploadConfig from './config/upload';

import OrphanagesController from './controllers/OrphanagesController';

// const classesController = new ClassesController();
// const connectionsController = new ConnectionsController();

// routes.get('/classes', classesController.index);
// routes.post('/classes', classesController.create);

// routes.get('/connections', connectionsController.index);
// routes.post('/connections', connectionsController.create);

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;