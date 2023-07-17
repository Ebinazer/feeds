import { logUserOperation } from "../../logsEntry";
import { Feed, FeedAccess } from "../../system/db/models";
import { sequelize } from "../../system/db/sequelize";

export const deleteFeed = async (req, res) => {
    const user = req.user
    const t = await sequelize.transaction();

    if (user.role === 'SUPER_ADMIN') {
        await Feed.destroy({
            where: {
                uuid: req.params.uuid
            }
        })
    }
    else if (user.role === 'ADMIN') {
        const feedData = await Feed.findOne({
            include: [{
                model: FeedAccess,
                where: {
                    userUUID: user.uuid,
                    feedUUID: req.params.uuid,
                    type: 'DELETE'
                }
            }]
        })
        
        if (feedData) {

            await feedData.destroy({ transaction: t })
            t.commit()
            await logUserOperation(user.name, 'Delete Feeds')
            res.json({ statusCode: 200, message: 'feed Deleted' })
        }
        else {
            res.json({ statusCode: 400, message: 'You cannot Delete this feed' });
        }
    }


}
