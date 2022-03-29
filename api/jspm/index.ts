import fetch from "node-fetch";

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {
  const { name } = request.query;
  response.status(200).send(`Hello ${name}!`);
};