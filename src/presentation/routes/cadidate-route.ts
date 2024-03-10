import express, { Request, Response, Router } from 'express';

import { makeCandidateController } from '@src/main/factories/controllers/candidate-controller-factory';

const router: Router = express.Router();
const candidateController = makeCandidateController();

router.post('/candidade', (req: Request, res: Response) => {
  const result = candidateController.create(req.body);
  res.send(result);
});

export { router };
