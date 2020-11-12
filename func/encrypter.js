import crypto from "browserify-aes";
import randomBytes from "randombytes";

export const encrypter = (data, IV, KEY) => {
  if (!data) {
    console.log("fuck off");
    return;
  }
  /*if (typeof data !== "string") {
    throw "invalid data obj";
  }*/
  const key = KEY ? KEY : "64aa7aaa8959ff23b1a6951204d3d5be"; //KEY ? KEY : randomBytes(32);
  const algorithm = "aes256";
  const iv = IV ? IV : randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const enc = cipher.update(data);

  const encrypted = Buffer.concat([enc, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export default encrypter;
