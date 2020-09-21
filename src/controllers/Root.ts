import { Response, Request } from 'express'
import { OK } from 'http-status-codes'
import {register} from 'prom-client'

export class Controller {
  public constructor () {
    this.index = this.index.bind(this)
    this.ping = this.ping.bind(this)
    this.metrics = this.metrics.bind(this)
  }

  public index (req: Request, res: Response): Response {
      return res
      .status(OK)
      .send({message: '/ index'})
  }

  public ping (req: Request, res: Response): Response {
      return res
      .status(OK)
      .send('pong')
  }

  public metrics (req: Request, res: Response): Response {
    res.set('Content-Type', register.contentType)
    return res
    .status(OK)
    .send(register.metrics())
  }
}
