import Cors from 'cors';
import initMiddleware from './initmiddleware.js';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: ['https://rahatik-cozum.vercel.app'],
  })
);

export default cors;
