// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import encrypter from "../encrypter";

export default (req, res) => {
  console.log(req);
  const METHOD = req.method;
  const QUERY = req.query;
  res.statusCode = 403;

  if (QUERY.data && METHOD === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    const data = encrypter(QUERY.data);
    res.json({ data });
    return;
  }
  res.json("unauthorized");
};
