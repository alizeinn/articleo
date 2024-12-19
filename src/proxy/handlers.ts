import { SDK_MOCK_RESPONSES } from '../lib/constants';
import { Request, Response } from 'express';

export const handlers = {
  health: (req: Request, res: Response) => {
    const response = SDK_MOCK_RESPONSES['/api/sdk/health'];
    res.json(response.content);
  },

  script: (req: Request, res: Response) => {
    const response = SDK_MOCK_RESPONSES['/api/sdk/sdk.js'];
    res.type('application/javascript').send(response.content);
  },

  version: (req: Request, res: Response) => {
    const response = SDK_MOCK_RESPONSES['/api/sdk/version'];
    res.json(response.content);
  }
};