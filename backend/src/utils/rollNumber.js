// Builds the SBTE result-portal roll number from a student's board
// registration number and semester.
//
// Observed pattern: <semester>1 + boardRegNo
//   Semester 1 -> "11" + boardRegNo
//   Semester 2 -> "21" + boardRegNo
//   Semester 3 -> "31" + boardRegNo
//
// Example: boardRegNo "1151825007", semester 2 -> "211151825007"
function buildRollNumber(boardRegNo, semester) {
  const semCode = `${semester}1`;
  return `${semCode}${boardRegNo}`;
}

module.exports = { buildRollNumber };
