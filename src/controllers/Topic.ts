import { Response, Request } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { doCreateTopic, doGetTopicList } from '../models/Topic'
import { RequestWithAuth } from '../types'

export type TopicListRequestQuery = {
  page: string,
  pageSize: string,
  userId: string,
  searchTitle: string,
  tags: string
}

export class Controller {
  public constructor () {
    this.index = this.index.bind(this)
  }

  public index (req: Request, res: Response): Response {
      return res
      .status(OK)
      .send({message: 'topic / index'})
  }

  public async list (req: RequestWithAuth, res: Response): Promise<Response> {
    const query = req.query as TopicListRequestQuery
    const tags = query.tags.split(',')

    try {
      const topics = await doGetTopicList({...query, tags})
      return res.status(OK).send({data: topics})
    } catch (error) {
      return res.status(BAD_REQUEST).send({message: error.message})
    }
  }

  public async create (req: RequestWithAuth, res: Response): Promise<Response> {
    try {
      const createdBy = req.user_id
      const topic = await doCreateTopic({...req.body, created_by: createdBy})
      return res
      .status(OK)
      .send({message: 'topic has been created'})
    } catch (error) {
      return res
      .status(BAD_REQUEST)
      .send({message: error.message})
    }
  }

  public detail (req: Request, res: Response): Response {
    return res
    .status(OK)
    .send({message: 'topic / detail'})
  }

  public delete (req: Request, res: Response): Response {
    return res
    .status(OK)
    .send({message: 'topic / delete'})
  }

  public edit (req: Request, res: Response): Response {
    return res
    .status(OK)
    .send({message: 'topic / edit'})
  }

  public commentList (req: Request, res: Response): Response {
    return res
    .status(OK)
    .send({message: 'topic / detail / comments'})
  }

  public commentCreate (req: Request, res: Response): Response {
    return res
    .status(OK)
    .send({message: 'topic / detail / comments'})
  }

  public commentDelete (req: Request, res: Response): Response {
    return res
    .status(OK)
    .send({message: 'topic / detail / comments / detail'})
  }

  public commentEdit (req: Request, res: Response): Response {
    return res
    .status(OK)
    .send({message: 'topic / detail / comments / detail'})
  }
}