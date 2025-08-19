
// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  res.json({ userId: id });
}