import { logUserOperation } from "../../logsEntry";
import { User } from "../../system/db/models"
import { sequelize } from "../../system/db/sequelize";
import { generateSha256Password } from "../../system/helpers/password";

export const updateUser = async (req, res) => {
    const user = req.user
    const input = req.body
    const t = await sequelize.transaction();

    await User.update(
        {
            name: input.name,
            role: input.role,
            email: input.email,
            password: generateSha256Password(input.password)
        },
        {
            where: {
                uuid: input.uuid
            }, transaction: t
        }
    );

    t.commit()
    await logUserOperation(user.name, 'Update user')
    res.json({ statusCode: 200, message: 'Updated' });
}