const aiSentiments = {
  1: { sentiment_json: { positive_summary: 'Employees celebrate team collaboration, flexible working arrangements, and genuine diversity initiatives as standout positives.', negative_summary: 'Dominant concerns are leadership transparency, unsustainable workload expectations, and unclear career progression paths.' } },
  2: { sentiment_json: { positive_summary: 'Strong culture of learning and mutual team support is highly valued across departments.', negative_summary: 'Leadership communication gaps and workload management remain persistent concerns.' } },
};

module.exports = (req, res) => {
  const sid = parseInt(req.query.surveyId) || 1;
  res.json(aiSentiments[sid] || aiSentiments[1]);
};
