import { Router } from 'express';
const KeyRouter = Router();
import { checkKey } from '../controllers/key';

KeyRouter.route('/key').post(checkKey);

export default KeyRouter;
