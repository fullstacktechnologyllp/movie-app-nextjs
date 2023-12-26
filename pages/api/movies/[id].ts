import type { NextApiRequest, NextApiResponse } from 'next';
import { moviesService } from '../../../shared/services/movies';
import { ERROR_RESPONSES, SUCCESS_RESPONSES } from '../../../shared/constants';
import { s3Service } from '../../../shared/services/s3Service';
import multer from 'multer';
import { authService } from '../../../shared/services/auth';
import { Request } from '../../../shared/dtos/index';
import { ErrorHandler } from '../../../lib/auth';

export const config = {
    api: {
        bodyParser: false,
    },
};


/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     description: Update movie by id
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *        type: string
 *      - in: formData
 *        name: title
 *        required: true
 *        schema:
 *        type: string
 *      - in: formData
 *        name: publishYear
 *        required: true
 *        schema:
 *         type: number
 *      - in: formData
 *        name: poster
 *        required: false
 *        schema:
 *         type: file
 *     responses:
 *       201:
 *         description: MOVIE_UPDATED
 */
const update = async (req: any, res: any) => {
    await new Promise(resolve => {
        // you may use any other multer function
        const mw = multer().any();

        //use resolve() instead of next()
        mw(req, res, resolve);
    });

    const { title, publishYear } = req.body;
    const userId = req.user.id;
    const fileName = req.files[0].originalname;

    const ext = fileName.substring(fileName.indexOf('.') + 1);
    const s3ObjectName = `${userId}_${title}.${ext}`;

    await s3Service.upload({
        fileName: s3ObjectName,
        file: req.files[0].buffer,
    });

    const movie = await moviesService.update(req.query.id, {
        title: title,
        publishYear: Number(publishYear),
        imageUrl: `https://movie-application.s3.us-west-2.amazonaws.com/${s3ObjectName}`,
        userId: userId
    },);

    return res.status(200).json({ message: SUCCESS_RESPONSES.MOVIE_UPDATED });
};


/**
 * @swagger 
 * /api/movies/{id}:
 *   get:
 *     description: Get movie by id
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *        type: string
 *     responses:
 *       200:
 *         description: Movie
 */
const getById = async (req: Request, res: NextApiResponse) => {
    const { id } = req.query;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({ message: ERROR_RESPONSES.MOVIE_ID_IS_REQUIRED });
    }

    const movie = await moviesService.findOne(`${id}`);

    if (!movie) {
        return res.status(404).json({ message: ERROR_RESPONSES.MOVIE_NOT_FOUND });
    } else if (userId !== movie.userId) {
        return res.status(403).json({ message: ERROR_RESPONSES.UNAUTHORIZED });
    }

    return res.status(200).json({ movie });
};

const handler = async (
    req: Request,
    res: NextApiResponse
) => {
    try {
        const user = await authService.authenticate(req);
        const { method, query } = req;

        req.user = user;

        if (method === 'PUT' && query.id) {
            await update(req, res);
        } else if (method === 'GET' && query.id) {
            await getById(req, res);
        }
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.error(error)
        res.status(500).json({ message: ERROR_RESPONSES.PLEASE_TRY_AGAIN });
    }
};

export default handler;