import { Response, Request } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { comparePassword, createAuth, encodeToken, getAuthByEmail } from '../helpers/authHelpers'
import { createUser, getUserById } from '../helpers/userHelpers'
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
      const oldAuth = await getAuthByEmail(email)
      if (oldAuth) {
        throw {message: 'account already exist'}
      }

      const newUser = await createUser({display_name: name, full_name: name}) as number
      const newAuth = await createAuth({email, password, user_id: newUser})

      logger.info(`The new user is registered with id ${newAuth}`)

      return res
      .status(OK)
      .send({message: 'user registration was successful'})
    } catch (error) {
      return res
      .status(BAD_REQUEST)
      .send({error})
    }
  }

  public async login (req: LoginRequest, res: Response<LoginResponseBody>): Promise<Response> {
    const {email, password} = req.body
    try {

      const auth = await getAuthByEmail(email)

      if (auth === undefined) {
        throw {
          message: 'account not found'
        }
      }

      const isPasswordMatch = comparePassword(password, auth.password)

      if (!isPasswordMatch) {
        throw {
          message: 'password did\'nt match'
        }
      }

      await getAuthByEmail(email).update({ is_online: true })

      const token = encodeToken(auth.user_id)
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
      const user = await getUserById(req.user_id || 0)
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