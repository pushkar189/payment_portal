import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod'; 

export const validate = (schema:  ZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      return next();
    } catch (error) {
    if (error instanceof ZodError) {
            return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: error.issues.map((e) => ({
                field: e.path[1], 
                message: e.message,
            })),
            });
        }
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  };