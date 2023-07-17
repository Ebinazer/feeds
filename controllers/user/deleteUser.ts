import { Op } from "sequelize"
import { User } from "../../system/db/models"
import { logUserOperation } from "../../logsEntry"

export const deleteUser = async (req, res) => {
    const user = req.user

    if (user.role === 'SUPER_ADMIN') {
        await User.destroy({
            where: {
                uuid: req.params.uuid
            }
        })
    } else if (user.role === 'ADMIN') {
        const userData = await User.destroy({
            where: {
                uuid: req.params.uuid,
                role: { [Op.notIn]: ["SUPER_ADMIN, ADMIN"] }
            }
        })

        if (!userData) res.json({ statusCode: 400, message: 'Your not allowed to delete this user' })
    }
    await logUserOperation(user.name, 'Delete user')
    res.json({ statusCode: 200, message: 'User Deleted' });
}