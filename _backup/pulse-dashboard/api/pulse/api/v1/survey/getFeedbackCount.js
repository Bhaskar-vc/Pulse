const counts = { 1: 10, 2: 2, 3: 5, 4: 8 };

module.exports = (req, res) => {
  const sid = parseInt(req.query.surveyId) || 1;
  res.json({ count: counts[sid] || 0 });
};
