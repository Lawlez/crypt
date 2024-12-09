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
  const key = KEY ? KEY : "YELLOW SUBMARINE"; //KEY ? KEY : randomBytes(32);
  const algorithm = "aes-256-ecb";
  const iv = IV ? IV : randomBytes(16);

  const cipher = crypto.createCipher(algorithm, key);
  const enc = cipher.update(data, 'hex', 'utf-8');

  const encrypted = Buffer.concat([enc, cipher.final()]);

  return /**  iv.toString("hex") + ":" + **/encrypted//.toString("hex");
};

export default encrypter;
