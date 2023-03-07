import Joi from 'joi';

export const sendMessageSchema = Joi.object({
    roomName: Joi.string().required(),
    message: Joi.object({
        id: Joi.number().required(),
        content: Joi.string().min(1).required(),
        username: Joi.string().required()
    }).required(),
});

export const joinRoomSchema = Joi.object({
    roomName: Joi.string().required(),
})

export const validate = (schema, params) => {
    const {error} = schema.validate(params);

    if (error) {
        throw new Error(error.details[0].message);
    }
}