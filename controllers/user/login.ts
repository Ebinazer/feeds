import { User } from "../../system/db/models";
import { generateSha256Password } from "../../system/helpers/password";
import { sign } from "jsonwebtoken";


export const login = async (req, res) => {

    const user: any = await User.findOne({
        where: {
            email: req.body.email,
            password: generateSha256Password(req.body.password)
        },
    });
    
    if (!user)
        res.json('User not found')

    const token = sign({
        uuid: user.uuid,
        name: user.name,
        role: user.role
    }, process.env.SHA256_PASSWORD_SALT, { expiresIn: process.env.TOKEN_LIFE });


    res.json({ statusCode: 200, token: token });
};
