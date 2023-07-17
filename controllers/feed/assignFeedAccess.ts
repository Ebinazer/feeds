import { logUserOperation } from "../../logsEntry";
import { FeedAccess } from "../../system/db/models";
import { sequelize } from "../../system/db/sequelize";

export const assignFeedAccess = async (req, res) => {
    const user = req.user
    const input = req.body
    const t = await sequelize.transaction();

    const feedData = input.data.map((each) => {
        return {
            assignedBy: user.uuid,
            userUUID: each.userUUID,
            feedUUID: each.feedUUID,
            type: each.type //NORMAL or With Delete Access
        }
    })

    await FeedAccess.bulkCreate(feedData, { transaction: t })

    await t.commit()

    await logUserOperation(user.name, 'Assigning Feeds')

    res.json({ statusCode: 200, message: 'Created' });
}