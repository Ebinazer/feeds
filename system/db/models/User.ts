import { DataTypes, Model } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";
import { sequelize } from "../sequelize";

class User extends Model {
  uuid: string;
  name: string;
  role: string;
  email: string;
  password: string;
}

User.init(
  {
    uuid: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("SUPER_ADMIN", "ADMIN", "BASIC"),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  makeModelOptions(sequelize, "user")
);

export default User;

async function createUser() {
  try {

    const user = await User.findOne({
      where: {
        role: 'SUPER_ADMIN'
      }
    })
    if (!user) {
      // Create a new user
      const newUser = await User.create({
        name: "Ebi",
        role: "SUPER_ADMIN",
        email: "ebi@example.com",
        password: "076b8487f5866c5cd4eee676e732f124328d6e2b6dcc6f0df89652a3920dedb1",
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

createUser();
