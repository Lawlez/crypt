import crypto from "browserify-aes";
import randomBytes from "randombytes";

export const decrypt = (data, KEY) => {
  const key = "64aa7aaa8959ff23b1a6951204d3d5be"; //KEY ? KEY : randomBytes(32);
  const algorithm = "aes256";
  if (typeof data !== "string") {
    throw "invalid data obj";
  }
  const dataParts = data.split(":");
  const iv = Buffer.from(dataParts.shift(), "hex");

  const encryptedText = Buffer.from(dataParts.join(":"), "hex");

  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

  let decrypted = decipher.update(encryptedText);

  return Buffer.concat([decrypted, decipher.final()]).toString();
};

export default decrypt;
