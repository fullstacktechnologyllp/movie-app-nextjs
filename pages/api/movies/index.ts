import type { NextApiResponse } from 'next';
import { moviesService } from '../../../shared/services/movies';
import { ERROR_RESPONSES, SUCCESS_RESPONSES } from '../../../shared/constants';
import { s3Service } from '../../../shared/services/s3Service';
import multer from 'multer';
import { v4 } from 'uuid';
import { Request } from '../../../shared/dtos/index';
import { ErrorHandler } from '../../../lib/auth';
import { authService } from '../../../shared/services/auth';

export const config = {
    api: {
        bodyParser: false,
    },
};


/**
 * @swagger
 * /api/movies:
 *  post:
 *    description: Create new movie
 *    parameters:
 *      - in: formData
 *        name: title
 *        required: true
 *        schema:
 *         type: string
 *      - in: formData
 *        name: publishYear
 *        required: true
 *        schema:
 *         type: number
 *      - in: formData
 *        name: poster
 *        required: true
 *        schema:
 *         type: file
 *    responses:
 *       201:
 *         description: MOVIE_CREATED
 *    tags:
 *       - movies
 */
const create = async (req: any, res: any) => {
    await new Promise(resolve => {
        // you may use any other multer function
        const mw = multer().any();

        //use resolve() instead of next()
        mw(req, res, resolve);
    });

    const { title, publishYear } = req.body;
    const fileName = req?.files[0]?.originalname;
    const userId = req.user.id;

    if (!title) {
        throw new ErrorHandler(400, ERROR_RESPONSES.MOVIE_TITLE_IS_REQUIRED);
    } else if (!publishYear) {
        throw new ErrorHandler(400, ERROR_RESPONSES.MOVIE_PUBLISH_YEAR_IS_REQUIRED);
    } else if (!fileName) {
        throw new ErrorHandler(400, ERROR_RESPONSES.MOVIE_POSTER_IS_REQUIRED);
    }

    const movieId = v4();
    const ext = fileName.substring(fileName.indexOf('.') + 1);
    const s3ObjectName = `${userId}_${movieId}.${ext}`;

    await s3Service.upload({
        fileName: s3ObjectName,
        file: req.files[0].buffer,
    });

    await moviesService.create({
        id: movieId,
        title: title,
        publishYear: Number(publishYear),
        imageUrl: `https://video-prompt-reply-v2.s3.us-east-2.amazonaws.com/${s3ObjectName}`,
        userId: userId
    });

    return res.status(201).json({ id: movieId });
};


/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Get movies
 *     parameters:
 *      - in: query
 *        name: skip
 *        required: true
 *        schema:
 *         type: number
 *         minimum: 0
 *      - in: query
 *        name: take
 *        required: true
 *        schema:
 *         type: number
 *         minimum: 1
 *         maximum: 10
 *     responses:
 *       200:
 *         description: Movies
 *     tags:
 *       - movies
 */
const get = async (req: Request, res: NextApiResponse) => {
    const { skip, take } = req.query;

    if (!skip) {
        throw new ErrorHandler(400, ERROR_RESPONSES.SKIP_IS_REQUIRED);
    } else if (!take) {
        throw new ErrorHandler(400, ERROR_RESPONSES.TAKE_IS_REQUIRED);
    }

    const userId = req.user.id;

    const { count, movies } = await moviesService.find(userId, Number(skip), Number(take));

    return res.status(200).json({ items: movies, total: count });
};


const handler = async (
    req: Request,
    res: NextApiResponse
) => {
    try {
        const user = await authService.authenticate(req);

        const { method, query } = req;
        req.user = user;

        if (method === 'POST') {
            await create(req, res);
        } else if (method === 'GET' && query.skip && query.take) {
            await get(req, res);
        }
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.error(error);
        res.status(500).json({ message: ERROR_RESPONSES.PLEASE_TRY_AGAIN });
    }
};

export default handler;