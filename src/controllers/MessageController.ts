import { Request, Response } from 'express';
import { DaoFactory, Message, Product, User } from '../daos';

export class MessageController {
  private static messageDao = DaoFactory.getDao('message');

  static async getMessages(req: Request, res: Response) {
    // const messages = await this.messageDao.getAll();

    // res.json(messages);
    res.json('messages');
  }
}
