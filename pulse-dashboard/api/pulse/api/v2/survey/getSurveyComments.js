const sentiments = {
  1: { overallScore: 62, positive: 40, neutral: 15, negative: 45, positiveCount: 4, negativeCount: 5, neutralCount: 1 },
};

const comments = {
  1: [
    { id: 1, comment: 'The team culture here is genuinely supportive — people help each other without being asked.', sentiment: 'positive', questionText: 'What could we do better?' },
    { id: 2, comment: 'I have had more chances to learn new skills in 6 months here than in 3 years at my previous job.', sentiment: 'positive', questionText: 'What could we do better?' },
    { id: 3, comment: 'We find out about major decisions after they are already made — it feels like we are the last to know.', sentiment: 'negative', questionText: 'What could we do better?' },
    { id: 4, comment: 'The expectation to be available evenings and weekends has become normalised, which is unsustainable.', sentiment: 'negative', questionText: 'What could we do better?' },
    { id: 5, comment: 'Flexible working hours have been a game changer for my productivity and mental health.', sentiment: 'positive', questionText: 'What could we do better?' },
    { id: 6, comment: 'There is a disconnect between what leadership says and what actually happens on the ground.', sentiment: 'negative', questionText: 'What could we do better?' },
    { id: 7, comment: 'I appreciate the diversity initiatives — they feel genuine, not performative.', sentiment: 'positive', questionText: 'What could we do better?' },
    { id: 8, comment: 'Career progression paths are unclear — I do not know what I need to do to get promoted.', sentiment: 'negative', questionText: 'What could we do better?' },
    { id: 9, comment: 'Recognition feels inconsistent — some teams celebrate wins, others barely acknowledge them.', sentiment: 'neutral', questionText: 'What could we do better?' },
    { id: 10, comment: 'Burnout is real. We need more headcount or fewer projects running in parallel.', sentiment: 'negative', questionText: 'What could we do better?' },
  ],
  2: [
    { id: 11, comment: 'The annual culture day was a highlight — great to see leadership participating.', sentiment: 'positive', questionText: 'What could we do better?' },
    { id: 12, comment: 'More transparency in promotion decisions would build trust.', sentiment: 'negative', questionText: 'What could we do better?' },
  ],
};

module.exports = (req, res) => {
  const sid = parseInt(req.query.surveyId) || 1;
  const c = comments[sid] || [];
  res.json({ sentiments: sentiments[sid] || null, comments: c, totalFilteredComments: c.length, readStatusValues: null });
};
