const getStudentDetails = (email) => {
  // Roll Number from Email
  const rollNumber = email.split("@")[0].toUpperCase();

  // Department Mapping
  const deptMap = {
    "3311": "Information Technology",
    "3310": "Computer Science & Engineering",
    "3312": "Electronics & Communication Engineering",
    "3314": "Electrical & Electronics Engineering",

    "3383": "Computer Science with Data Science",
    "3382": "Computer Science with Machine Learning",
    "3384": "Mechanical & Robotics",

    "3302": "Chemical Engineering",
    "3320": "Mechanical Engineering",
    "3308": "Civil Engineering",
  };

  // Department Code
  const deptCode = rollNumber.substring(4, 8);
  const department =
    deptMap[deptCode] || "Unknown Department";

  // Admission Batch (24 -> 2024)
  const batch = parseInt(rollNumber.substring(2, 4));

  // Current Year
  const currentYear = new Date().getFullYear();

  // Admission Year
  const admissionYear = 2000 + batch;

  // Lateral Entry Check
  const isLateral = /L\d+$/i.test(rollNumber);

  // Calculate Study Year
  let studyYear = isLateral
    ? currentYear - admissionYear + 2
    : currentYear - admissionYear + 1;

  let year = "Graduated";

  switch (studyYear) {
    case 1:
      year = "1st Year";
      break;

    case 2:
      year = "2nd Year";
      break;

    case 3:
      year = "3rd Year";
      break;

    case 4:
      year = "4th Year";
      break;

    default:
      if (studyYear <= 0) {
        year = "Not Joined Yet";
      } else {
        year = "Graduated";
      }
  }

  return {
    rollNumber,
    department,
    year,
    batch: admissionYear,
    isLateral,
  };
};

module.exports = getStudentDetails;