import { logUserOperation } from "../../logsEntry";
import { Feed } from "../../system/db/models";
import { sequelize } from "../../system/db/sequelize";

export const updateFeed = async (req, res) => {
    const user = req.user
    const input = req.body
    const t = await sequelize.transaction();

    if (user.role != 'SUPER_ADMIN') {
        res.json({ statusCode: 400, message: 'Feeds Can be update By super Admin' })
    }
    else {
        await Feed.update({
            name: input.name,
            url: input.url,
            description: input.description
        }, {
            where: {
                uuid: input.uuid
            }, transaction: t
        })

        t.commit()
        await logUserOperation(user.name, 'update Feeds')
        res.json({ statusCode: 200, message: 'Created' });
    }
}