const http = require('http');
const url = require('url');

const surveys = [
  { id: 1, name: 'Q1 Engagement Survey 2026', status: 'ongoing', startDate: '01 Mar 2026', endDate: '30 Jun 2026', type: 'pulse', selectedCategory: '' },
  { id: 2, name: 'Annual Culture Assessment 2025', status: 'ended', startDate: '01 Jul 2025', endDate: '31 Aug 2025', type: 'pulse', selectedCategory: '' },
  { id: 3, name: 'Onboarding Feedback Pulse', status: 'ended', startDate: '01 Apr 2026', endDate: '31 May 2026', type: 'pulse', selectedCategory: '' },
  { id: 4, name: 'Q4 Exit Interview Analysis', status: 'ended', startDate: '01 Oct 2025', endDate: '31 Dec 2025', type: 'pulse', selectedCategory: '' },
  { id: 5, name: 'Mid-Year Wellbeing Check 2026', status: 'ongoing', startDate: '01 Jun 2026', endDate: '30 Jun 2026', type: 'pulse', selectedCategory: '' },
  { id: 6, name: 'Remote Work Experience Survey', status: 'ended', startDate: '15 Jan 2026', endDate: '28 Feb 2026', type: 'pulse', selectedCategory: '' },
];

const filters = [
  { filterName: 'Department based', filterValue: 'department' },
  { filterName: 'Gender Based', filterValue: 'gender' },
  { filterName: 'Location based', filterValue: 'city' },
  { filterName: 'Business Unit', filterValue: 'business_unit' },
  { filterName: 'Grade Group', filterValue: 'grade_group' },
  { filterName: 'Employee Type', filterValue: 'employee_type' },
];

const sentiments = {
  1: { overallScore: 62, positive: 40, neutral: 15, negative: 45, positiveCount: 4, negativeCount: 5, neutralCount: 1 },
  2: { overallScore: 58, positive: 35, neutral: 20, negative: 45, positiveCount: 3, negativeCount: 4, neutralCount: 2 },
  3: { overallScore: 74, positive: 55, neutral: 25, negative: 20, positiveCount: 6, negativeCount: 2, neutralCount: 3 },
  4: { overallScore: 43, positive: 20, neutral: 15, negative: 65, positiveCount: 2, negativeCount: 7, neutralCount: 1 },
};

const aiSentiments = {
  1: { sentiment_json: { positive_summary: 'Employees celebrate team collaboration, flexible working arrangements, and genuine diversity initiatives as standout positives.', negative_summary: 'Dominant concerns are leadership transparency, unsustainable workload expectations, and unclear career progression paths.' } },
  2: { sentiment_json: { positive_summary: 'Strong culture of learning and mutual team support is highly valued across departments.', negative_summary: 'Leadership communication gaps and workload management remain persistent concerns.' } },
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

const feedbackCounts = { 1: 10, 2: 2, 3: 5, 4: 8 };

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname;
  const q = parsed.query;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // GET /api/survey/getSurveysForReport
  if (path === '/api/survey/getSurveysForReport') {
    const offset = parseInt(q.offset) || 0;
    const limit = parseInt(q.limit) || 10;
    const slice = surveys.slice(offset, offset + limit);
    return res.end(JSON.stringify({ surveys: slice, noOfSurveys: surveys.length }));
  }

  // GET /api/survey/searchSurveysForReport
  if (path === '/api/survey/searchSurveysForReport') {
    const keyword = (q.keyWord || '').toLowerCase();
    const offset = parseInt(q.offset) || 0;
    const limit = parseInt(q.limit) || 10;
    const filtered = surveys.filter(s => s.name.toLowerCase().includes(keyword));
    const slice = filtered.slice(offset, offset + limit);
    return res.end(JSON.stringify({ surveys: slice, noOfSurveys: filtered.length }));
  }

  // GET /api/survey/getFiltersForSurveyReport
  if (path === '/api/survey/getFiltersForSurveyReport') {
    return res.end(JSON.stringify({ isPremium: true, filters }));
  }

  // GET /api/survey/getSurveyReport (download — redirect)
  if (path === '/api/survey/getSurveyReport') {
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Report download not available in mock mode.');
  }

  // GET /pulse/api/v1/survey/getProcessedSentiments
  if (path === '/pulse/api/v1/survey/getProcessedSentiments') {
    const sid = parseInt(q.surveyId) || 1;
    return res.end(JSON.stringify({ sentiments: sentiments[sid] || sentiments[1] }));
  }

  // GET /pulse/api/v1/survey/getOverallSentimentBySurveyId
  if (path === '/pulse/api/v1/survey/getOverallSentimentBySurveyId') {
    const sid = parseInt(q.surveyId) || 1;
    return res.end(JSON.stringify(aiSentiments[sid] || aiSentiments[1]));
  }

  // GET /pulse/api/v1/survey/getFeedbackCount
  if (path === '/pulse/api/v1/survey/getFeedbackCount') {
    const sid = parseInt(q.surveyId) || 1;
    return res.end(JSON.stringify({ count: feedbackCounts[sid] || 0 }));
  }

  // GET /pulse/api/v2/survey/getSurveyComments
  if (path === '/pulse/api/v2/survey/getSurveyComments') {
    const sid = parseInt(q.surveyId) || 1;
    const c = comments[sid] || [];
    return res.end(JSON.stringify({ sentiments: sentiments[sid], comments: c, totalFilteredComments: c.length, readStatusValues: null }));
  }

  // 404
  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(9040, () => {
  console.log('Mock API server running on http://localhost:9040');
  console.log('Endpoints:');
  console.log('  GET /api/survey/getSurveysForReport?offset=0&limit=10');
  console.log('  GET /api/survey/searchSurveysForReport?keyWord=&offset=0&limit=10');
  console.log('  GET /api/survey/getFiltersForSurveyReport?surveyId=1');
  console.log('  GET /pulse/api/v1/survey/getProcessedSentiments?surveyId=1');
  console.log('  GET /pulse/api/v1/survey/getOverallSentimentBySurveyId?surveyId=1');
  console.log('  GET /pulse/api/v1/survey/getFeedbackCount?surveyId=1');
  console.log('  GET /pulse/api/v2/survey/getSurveyComments?surveyId=1');
});
