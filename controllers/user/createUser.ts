import { logUserOperation } from "../../logsEntry";
import { User } from "../../system/db/models";
import { sequelize } from "../../system/db/sequelize";
import { generateSha256Password } from "../../system/helpers/password";


export const adduser = async (req, res) => {
    const user = req.user
    const input = req.body
    const t = await sequelize.transaction();

    if (user.role === "Basic") {
        res.json({   });
    }

    if (user.role === 'ADMIN' && input.role === 'SUPER_ADMIN') {
        res.json({ statusCode: 400, message: "Admin can't create super admin" })
    }

    if (user.role === 'ADMIN' && input.role === "ADMIN") {
        res.json({ statusCode: 400, message: "Admin can't create admin" })
    }

    const emailCheck = await User.findOne({
        where: {
            email: input.email
        }
    })

    if (emailCheck) {
        res.json({ statusCode: 400, message: 'Email already exist' })
    }
    else {
        await User.create({
            name: input.name,
            role: input.role,
            email: input.email,
            password: generateSha256Password(input.password)
        }, { transaction: t })

        t.commit()
        await logUserOperation(user.name, 'Create user')
        res.json({ statusCode: 200, message: 'Created' });
    }


}

