import crypto from "browserify-aes";
import randomBytes from "randombytes";

export const decrypt = (data, KEY) => {
  const key = "YELLOW SUBMARINE"; //KEY ? KEY : randomBytes(32);
  const algorithm = "aes-256-ecb";
  if (!data) {
    console.log("f off");
    return;
  }
  if (typeof data !== "string") {
    throw "invalid data obj";
  }
  const dataParts = data.split(":");
  const iv = Buffer.from(dataParts.shift(), "hex");

  const encryptedText = Buffer.from(data);

  const decipher = crypto.createDecipher(algorithm, key);

  let decrypted = decipher.update(data);

  return Buffer.concat([decrypted, decipher.final()]).toString();
};

export default decrypt;
