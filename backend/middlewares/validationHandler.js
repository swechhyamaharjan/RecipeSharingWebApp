import {z} from "zod";

const validationHandler = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    error = z.flattenError(error);
    res.status(400).send({error: error.fieldErrors});
  }
}
export default validationHandler;