const {z} = require("zod");

const signupValidationSchema = z.object({
    email : z.email(),
    password: z.string().min(8, "Password must be at leat 8 characters")
})

module.exports = signupValidationSchema;