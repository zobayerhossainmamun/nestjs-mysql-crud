import { configDotenv } from "dotenv";

/**
 * Get server runtime type
 * @returns {string}
 */
export const getEnv = () => {
    return process.env.NODE_ENV;
};

/**
 * Return is runtime mode development or production
 */
export const IS_DEV = getEnv() === 'dev';

/**
 * Return environment variables in object
 * @returns {object}
 */
export const getConfig = () => {
    const environment = getEnv();
    const config = configDotenv({ path: `.env.${environment}` });
    return config.parsed;
};