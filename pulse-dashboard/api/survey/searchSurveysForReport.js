const surveys = [
  { id: 1, name: 'Q1 Engagement Survey 2026', status: 'ongoing', startDate: '01 Mar 2026', endDate: '30 Jun 2026', type: 'pulse', selectedCategory: '' },
  { id: 2, name: 'Annual Culture Assessment 2025', status: 'ended', startDate: '01 Jul 2025', endDate: '31 Aug 2025', type: 'pulse', selectedCategory: '' },
  { id: 3, name: 'Onboarding Feedback Pulse', status: 'ended', startDate: '01 Apr 2026', endDate: '31 May 2026', type: 'pulse', selectedCategory: '' },
  { id: 4, name: 'Q4 Exit Interview Analysis', status: 'ended', startDate: '01 Oct 2025', endDate: '31 Dec 2025', type: 'pulse', selectedCategory: '' },
  { id: 5, name: 'Mid-Year Wellbeing Check 2026', status: 'ongoing', startDate: '01 Jun 2026', endDate: '30 Jun 2026', type: 'pulse', selectedCategory: '' },
  { id: 6, name: 'Remote Work Experience Survey', status: 'ended', startDate: '15 Jan 2026', endDate: '28 Feb 2026', type: 'pulse', selectedCategory: '' },
];

module.exports = (req, res) => {
  const keyword = (req.query.keyWord || '').toLowerCase();
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const filtered = surveys.filter(s => s.name.toLowerCase().includes(keyword));
  const slice = filtered.slice(offset, offset + limit);
  res.json({ surveys: slice, noOfSurveys: filtered.length });
};
