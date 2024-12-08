import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const REST_API_URL = process.env.REST_API_URL;

export const calculateExpression = async (expression: string): Promise<number> => {
  const response = await fetch(`${REST_API_URL}?expr=${encodeURIComponent(expression)}`);
  const result = await response.text();
  return parseFloat(result);
};