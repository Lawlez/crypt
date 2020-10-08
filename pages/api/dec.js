// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import decrypt from "../decrypter";

export default (req, res) => {
  console.log(req);
  const METHOD = req.method;
  const QUERY = req.query;
  res.statusCode = 403;

  if (QUERY.data && METHOD === "GET") {
    res.statusCode = 200;
    res.json(decrypt(QUERY.data));
    return;
  }
  res.json("unauthorized");
};
