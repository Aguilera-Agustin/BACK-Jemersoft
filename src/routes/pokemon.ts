import { Router } from "express";
import { getFeatures } from '../controllers/pokemons';

const router = Router();

router.get('/features/:Pokemon/', getFeatures)


export default router;