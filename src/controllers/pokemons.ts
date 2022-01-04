import axios from "axios";
import { Request, Response } from "express";
import { config } from "../config";


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getFeatures = async (req: Request, res: Response) => {
    const { Pokemon } = req.params;
    const url = `${config.apiBasePath}pokemon/${Pokemon}`;
    const response = await axios.get(url);
    const { data } = response;

    res.json({
        id: data.id,
        picture: data.sprites.front_default,
        type: data.types.map((type: { type: { name: string; }; }) => type.type.name),
        weight: data.weight,
        abilities: data.abilities.map((ability: { ability: { name: string; }; }) => ability.ability.name),
    })
} 


