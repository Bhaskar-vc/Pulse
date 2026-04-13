const sentiments = {
  1: { overallScore: 62, positive: 40, neutral: 15, negative: 45, positiveCount: 4, negativeCount: 5, neutralCount: 1 },
  2: { overallScore: 58, positive: 35, neutral: 20, negative: 45, positiveCount: 3, negativeCount: 4, neutralCount: 2 },
  3: { overallScore: 74, positive: 55, neutral: 25, negative: 20, positiveCount: 6, negativeCount: 2, neutralCount: 3 },
  4: { overallScore: 43, positive: 20, neutral: 15, negative: 65, positiveCount: 2, negativeCount: 7, neutralCount: 1 },
};

module.exports = (req, res) => {
  const sid = parseInt(req.query.surveyId) || 1;
  res.json({ sentiments: sentiments[sid] || sentiments[1] });
};
