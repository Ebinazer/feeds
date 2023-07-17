import { Feed, FeedAccess, User } from "./models";

User.hasMany(FeedAccess, { foreignKey: 'userUUID', sourceKey: 'uuid' })
Feed.hasMany(FeedAccess, { foreignKey: 'feedUUID', sourceKey: 'uuid'})
