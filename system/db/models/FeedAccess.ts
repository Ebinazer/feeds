import { DataTypes, Model } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
import { sequelize } from "../sequelize";

class FeedAccess extends Model {
    uuid: string
    assignedBy: string
    userUUID: string;
    feedUUID: string;
    type: string;
    createdAt?: Date;
}

FeedAccess.init(
    {
        uuid: {
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            type: DataTypes.UUID,
        },
        assignedBy: {
            type: DataTypes.UUID,
            allowNull: false
        },
        userUUID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        feedUUID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('NORMAL', 'DELETE'),
            allowNull: false
        }
    },
    makeModelOptions(sequelize, "feed_access")
);

export default FeedAccess;
