import axios from 'axios';

const apiUrl = process.env.REST_API_URL || 'https://api.mathjs.org/v4/';

export const calculateExpression = async (expression: string): Promise<number> => {
  try {
    const response = await axios.post(apiUrl, {
      expr: expression
    });
    return response.data.result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to evaluate expression: ${error.message}`);
    } else {
      throw new Error('Failed to evaluate expression due to an unknown error');
    }
  }
};