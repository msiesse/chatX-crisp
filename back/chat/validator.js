import Joi from 'joi';

const sendMessageSchema = Joi.object({
    roomName: Joi.string().required(),
    message: Joi.object({
        content: Joi.string().min(1).required(),
    }).required(),
});

export const validateSendMessage = (roomName, message) => {
    const params = { roomName, message };
    const { error, value } = sendMessageSchema.validate(params);

    if (error) {
        throw new Error(error.details[0].message);
    }
};