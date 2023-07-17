import { Op } from "sequelize"
import { User } from "../../system/db/models"

export const loadUser = async (req, res) => {
    const user = req.user
    let userData
    if (user.role === 'SUPER_ADMIN') {
        userData = await User.findAll({
            where: {
                role: { [Op.in]: ['ADMIN', 'BASIC'] }
            }
        })
    }
    else if (user.role === 'ADMIN') {
        userData = await User.findAll({
            where: {
                role: 'BASIC'
            }
        })
    }
    else userData = []

    res.json({ statusCode: 200, user: userData });
}