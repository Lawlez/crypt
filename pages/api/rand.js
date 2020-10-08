// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import randomBytes from "randombytes";

export default (req, res) => {
  console.log(req);
  const METHOD = req.method;
  const QUERY = req.query;
  res.statusCode = 403;

  const randLength = QUERY && QUERY.length;
  console.log(typeof Number(randLength));
  if (randLength && METHOD === "GET") {
    if (typeof Number(randLength) === "number") {
      if (Number(randLength) >= 0 && Number(randLength) <= 4294967295) {
        const randomString = randomBytes(Number(randLength)).toString("hex");
        res.statusCode = 200;
        res.json(randomString);
        return;
      }

      res.json("length out of range");
      return;
    }
    res.json("invalid param length");
    return;
  }
  res.json("unauthorized");
};
