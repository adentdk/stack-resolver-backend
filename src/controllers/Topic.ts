import { Response, Request } from 'express'
import { OK } from 'http-status-codes'

export class Controller {
  public constructor () {
    this.index = this.index.bind(this)
  }

  public index (req: Request, res: Response): Response {
      return res
      .status(OK)
      .send({message: 'topic / index'})
  }

  public list (req: Request, res: Response): Response {
    return res.status(OK).send({message: 'topic / list'})
  }

  public create (req: Request, res: Response): Response {
    return res
    .status(OK)
    .send({message: 'topic / create'})
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