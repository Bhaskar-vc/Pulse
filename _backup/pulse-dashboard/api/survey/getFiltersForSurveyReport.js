module.exports = (req, res) => {
  res.json({
    isPremium: true,
    filters: [
      { filterName: 'Department based', filterValue: 'department' },
      { filterName: 'Gender Based', filterValue: 'gender' },
      { filterName: 'Location based', filterValue: 'city' },
      { filterName: 'Business Unit', filterValue: 'business_unit' },
      { filterName: 'Grade Group', filterValue: 'grade_group' },
      { filterName: 'Employee Type', filterValue: 'employee_type' },
    ],
  });
};
