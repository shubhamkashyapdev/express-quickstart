import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
const validator =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (err: any) {
      res.status(400).send(err.errors)
    }
  }
export default validator
