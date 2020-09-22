import { Response, Request } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { doLoginWithEmailAndPassword, doRegisterWithUser, doGetUserDetail } from '../models/Account'
import { RequestWithAuth } from '../types'
import { logger } from '../utils/logger'

type RegisterResponseBody = {
  message?: string,
  data?: any
}

type RegisterRequest = Request<
  {},
  RegisterResponseBody,
  {
    name: string
    email: string
    password: string
  }
>

type LoginResponseBody = {
  message?: string
  data?: {
    token: string
  }
}

type LoginRequest = Request<
  {},
  LoginResponseBody,
  {
    email: string
    password: string
  }
>

export class Controller {
  public constructor () {
    this.index = this.index.bind(this)
    this.register = this.register.bind(this)
  }

  public index (req: Request, res: Response): Response {
      return res
      .status(OK)
      .send({message: 'auth / index'})
  }

  public async register (req: RegisterRequest, res: Response): Promise<Response> {
    const {name, email, password} = req.body
    try {
      const account = await doRegisterWithUser({name, email, password, is_online: false, user_id: 0})
      return res
      .status(OK)
      .send({message: 'user registration was successful', data: account})
    } catch (error) {
      logger.info(error)
      return res
      .status(BAD_REQUEST)
      .send({error})
    }
  }

  public async login (req: LoginRequest, res: Response<LoginResponseBody>): Promise<Response> {
    const {email, password} = req.body
    try {

      const token = await doLoginWithEmailAndPassword(email, password)
      return res
      .status(OK)
      .send({
        data: { token }
      })
    } catch (error) {
      return res
      .status(OK)
      .send({ message: error.message })
    }
  }

  public async profile (req: RequestWithAuth, res: Response): Promise<Response> {
    try {
      const user = await doGetUserDetail(req.user_id || 0)
      return res.status(OK).send({
        data: user
      })
    } catch (error) {
      return res.status(BAD_REQUEST).send({
        message: error.message
      })
    }
  }
}