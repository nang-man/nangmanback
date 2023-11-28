import sha256 from "sha256";

export const hashedPassword = (password) => sha256(password);
