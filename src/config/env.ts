import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

// Defino el modelo de mis variables de entorno
interface EnvVars {
    PORT: number;
    HOST: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_URL: string;
}

// Defino el modelo de mis variables de entorno con JOI
const envsSchema = joi.object({
    DB_PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    PORT: joi.number().required(),
    HOST: joi.string().required(),
    DB_URL: joi.string().required()
}).unknown(true);

// Valido que las variables definidas en mi archivo `.env` sigan la estructura que defini en JOI
const { error, value } = envsSchema.validate(process.env);

// Si hay un error lo muestro
if (error) throw new Error(`Cofig validation error: ${error.message}`);

// Establezco que el resultado de la validacion de JOI es del tipo de mi interfaz
const envVars: EnvVars = value;

// Creo constante que utilizare a lo largo de mi proyecto
export const envs = {
    PORT: envVars.PORT,
    HOST: envVars.HOST,
    DB_PORT: envVars.DB_PORT,
    DB_HOST: envVars.DB_HOST,
    DB_URL: envVars.DB_URL
}