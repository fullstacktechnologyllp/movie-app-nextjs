import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    version: string;
};

/**
 * @swagger
 * /api/version:
 *   get:
 *     tags:
 *       - info
 *     summary: Get version info
 *     description: Get version info
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Info'
 * components:
 *  schemas:
 *   Info:
 *    type: object
 *    properties:
 *     version:
 *      type: string
 *      example: 1.0.0
 */
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    res.status(200).json({ version: '1.0.0' });
}