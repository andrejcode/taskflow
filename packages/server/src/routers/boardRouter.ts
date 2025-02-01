import { Router } from 'express';
// import { authenticateToken } from '@/middlewares/authMiddleware';

const boardRouter = Router();

// boardRouter.get('/', authenticateToken, (req, res) => {});
// boardRouter.post('/', authenticateToken, (req, res) => {});

// boardRouter.get('/:boardId', authenticateToken, (req, res) => {});
// boardRouter.put('/:boardId', authenticateToken, (req, res) => {}); // or patch
// boardRouter.delete('/:boardId', authenticateToken, (req, res) => {});

export default boardRouter;
