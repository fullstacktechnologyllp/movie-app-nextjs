import type { NextApiRequest, NextApiResponse } from 'next';
import { moviesService } from '../../../shared/services/movies';
import { ERROR_RESPONSES } from '../../../shared/constants';

/**
 * Movie create
 * @param req 
 * @param res 
 * @returns 
 */
const create = async (req: NextApiRequest, res: NextApiResponse) => {
    const { title, publishYear } = req.body;
    const userId = 'cbf2afbe-b0d0-4781-b8a0-d36ee34f07f4';

    const movie = await moviesService.create({
        title,
        publishYear,
        imageUrl: '',
        userId: userId
    });

    return res.status(200).json({ movie });
};

/**
 * Movie Update
 * @param req 
 * @param res 
 * @returns 
 */
const update = async (req: NextApiRequest, res: NextApiResponse) => {
    const { title, publishYear } = req.body;
    const userId = 'cbf2afbe-b0d0-4781-b8a0-d36ee34f07f4';

    const movie = await moviesService.create({
        title,
        publishYear,
        imageUrl: '',
        userId: userId
    });

    return res.status(200).json({ movie });
};

/**
 * Movie Get
 * @param req 
 * @param res 
 * @returns 
 */
const get = async (req: NextApiRequest, res: NextApiResponse) => {
    const { skip, take } = req.query;

    if (!skip) {
        return res.status(400).json({ message: ERROR_RESPONSES.SKIP_IS_REQUIRED });
    } else if (!take) {
        return res.status(400).json({ message: ERROR_RESPONSES.TAKE_IS_REQUIRED });
    }
    const userId = 'cbf2afbe-b0d0-4781-b8a0-d36ee34f07f4';

    const { count, movies } = await moviesService.find(userId, Number(skip), Number(take));

    return res.status(200).json({ items: movies, total: count });
};

/**
 * Movie Get by id
 * @param req 
 * @param res 
 * @returns 
 */
const getById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: ERROR_RESPONSES.MOVIE_ID_IS_REQUIRED });
    }

    const movie = await moviesService.findOne(`${id}`);

    if (!movie) {
        return res.status(404).json({ message: ERROR_RESPONSES.MOVIE_NOT_FOUND });
    }

    return res.status(200).json({ movie });
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const { method, query } = req;

        if (method === 'POST') {
            await create(req, res);
        } else if (method === 'PUT') {
            await update(req, res);
        } else if (method === 'GET' && query.id) {
            await getById(req, res);
        } else if (method === 'GET' && query.skip && query.take) {
            await get(req, res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: ERROR_RESPONSES.PLEASE_TRY_AGAIN });
    }
};

export default handler;