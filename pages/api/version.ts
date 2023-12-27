import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    version: string;
};

/**
 * @swagger
 * /api/version:
 *   get:
 *     description: Returns the app version
 *     responses:
 *       200:
 *         description: { 'version': '1.0.0' }
 *     tags:
 *       - info
 */
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    res.status(200).json({ version: '1.0.0' });
}