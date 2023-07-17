import { createHash } from "crypto";

export const generateSha256Password = (key: string, salt?: string): string => {
    const secret: string = salt || "fd72f0a9ec1c4139b34cc7f208e40f9d";
    return createHash("sha256")
      .update(key + secret)
      .digest("hex");
  };