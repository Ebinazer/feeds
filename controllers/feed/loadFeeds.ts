import { Feed, FeedAccess } from "../../system/db/models"

export const loadFeeds = async (req, res) => {
    const user = req.user
    let feedData
    
    if (user.role === 'SUPER_ADMIN') {
        feedData = await Feed.findAll()
    } else {
        feedData = await Feed.findAll({
            include: [{
                model: FeedAccess,
                where: {
                    userUUID: user.uuid
                }
            }]
        })
    }
    res.json({ statusCode: 200, feed: feedData });
}