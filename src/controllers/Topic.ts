import { Response, Request } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { doCreateCommentByTopic, doCreateTopic, doGetCommentById, doGetCommentsByTopicId, doGetTopicList, doGetTopicWithComments } from '../models/Topic'
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
      const tags = req.body.tags.replace(/ /gi, '-').split(',')
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

  public async delete (req: RequestWithAuth, res: Response): Promise<Response> {
    try {

      const user_id = req.user_id as number

      const topicId = req.params.id as unknown as number
      const topic = await doGetTopicWithComments(topicId, {})

      if (topic.created_by !== user_id) {
        throw new Error('No Access')
      }

     const deleteTopic = await topic.destroy()

      return res
      .status(OK)
      .send({data: deleteTopic})
    } catch (error) {
      return res.status(BAD_REQUEST).send({message: error.message})
    }
  }

  public async edit (req: RequestWithAuth, res: Response): Promise<Response> {
    try {

      const user_id = req.user_id as number

      const topicId = req.params.id as unknown as number
      const topic = await doGetTopicWithComments(topicId, {})

      if (topic.created_by !== user_id) {
        throw new Error('No Access')
      }

      const title = req.body.title
      const tags = req.body.tags.replace(/ /gi, '-').split(',')
      const is_edited = true

      const [comment] = await topic.getComments({
        where: {
          type: 'init'
        }
      })

      const content = req.body.content
      await comment.update({content})
      await topic.update({title, tags, is_edited})

      return res
      .status(OK)
      .send({data: topic})
    } catch (error) {
      return res.status(BAD_REQUEST).send({message: error.message})
    }
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

  public async commentDelete (req: RequestWithAuth, res: Response): Promise<Response> {
    try {

      const user_id = req.user_id as number
      const commentId = req.params.commentId as unknown as number
      const comment = await doGetCommentById(commentId)

      if (comment.created_by !== user_id) {
        throw new Error('No Access')
      }

      await comment.destroy()
      return res
      .status(OK)
      .send({message: 'success'})
    } catch (error) {
      return res
      .status(BAD_REQUEST)
      .send({message: 'failed'})
    }
  }

  public async commentEdit (req: RequestWithAuth, res: Response): Promise<Response> {
    try {
      const user_id = req.user_id as number
      const commentId = req.params.commentId as unknown as number
      const comment = await doGetCommentById(commentId)
      if (comment.created_by !== user_id) {
        throw new Error('No Access')
      }

      const content = req.body.content
      await comment.update({content})
      return res
      .status(OK)
      .send({message: 'success', data: comment})
    } catch (error) {
      return res
      .status(BAD_REQUEST)
      .send({message: 'failed'})
    }
  }
}