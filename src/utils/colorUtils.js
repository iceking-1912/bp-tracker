export function getBPColor(reading, lL1, uL1, lL2, uL2) {
  if (reading >= lL1 && reading <= uL1) {
    return '#27ae60'; // Green - Normal
  } else if (reading >= lL2 && reading <= uL2) {
    return '#f39c12'; // Orange - Slightly abnormal
  } else {
    return '#e74c3c'; // Red - Critical
  }
}

export function getSystolicColor(reading, limits) {
  return getBPColor(
    reading,
    limits.systolic_low_limit_1,
    limits.systolic_high_limit_1,
    limits.systolic_low_limit_2,
    limits.systolic_high_limit_2
  );
}

export function getDiastolicColor(reading, limits) {
  return getBPColor(
    reading,
    limits.diastolic_low_limit_1,
    limits.diastolic_high_limit_1,
    limits.diastolic_low_limit_2,
    limits.diastolic_high_limit_2
  );
}