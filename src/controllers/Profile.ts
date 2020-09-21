import { Response, Request } from 'express'
import { OK } from 'http-status-codes'

export class Controller {
  public constructor () {
    this.index = this.index.bind(this)
  }

  public index (req: Request, res: Response): Response {
      return res
      .status(OK)
      .send({message: 'profile / index'})
  }
}