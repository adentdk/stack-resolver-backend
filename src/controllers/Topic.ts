import { Response, Request } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { doCreateCommentByTopic, doCreateTopic, doGetCommentsByTopicId, doGetTopicList, doGetTopicWithComments } from '../models/Topic'
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
      const tags = req.body.tags.split(',')
      const content = req.body.content as string
      await doCreateTopic({...req.body, tags, created_by: createdBy}, content)
      return res
      .status(OK)
      .send({message: 'topic has been created'})
    } catch (error) {
      return res
      .status(BAD_REQUEST)
      .send({message: error.message})
    }
  }

  public async detail (req: Request, res: Response): Promise<Response> {
    try {
      const topicId = req.params.id as unknown as number
      const topicWithComments = await doGetTopicWithComments(topicId, {})
      return res
      .status(OK)
      .send({data: topicWithComments})
    } catch (error) {
      return res.status(BAD_REQUEST).send({message: error.message})
    }
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

  public async commentList (req: Request, res: Response): Promise<Response> {
    try {
      const topicId = req.params.topicId as unknown as number
      const comments = await doGetCommentsByTopicId(topicId, {})
      return res
      .status(OK)
      .send({message: 'topic / detail / comments', data: comments})
    } catch (error) {
      return res
      .status(BAD_REQUEST)
      .send({message: 'topic / detail / comments', error})
    }
  }

  public async commentCreate (req: RequestWithAuth, res: Response): Promise<Response> {
    try {
      const topicId = req.params.topicId as unknown as number
      const content = req.body.content as string
      const createdBy = req.user_id as number
      const newComment = await doCreateCommentByTopic(topicId, {content, createdBy})
      return res
      .status(OK)
      .send({message: 'topic / detail / comments', data: newComment})
    } catch (error) {
      return res
      .status(BAD_REQUEST)
      .send({message: 'topic / detail / comments', error})
    }
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