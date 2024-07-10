import * as joi from "joi"
export const productSchema = joi.object({
    id: joi.number().required(),
  name: joi.string().required(),
  price: joi.number().required()
})
