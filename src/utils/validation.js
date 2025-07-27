export function validateBPReading({ systolic, diastolic, reading_time }) {
  const errors = {};
  
  if (!reading_time) errors.reading_time = "Date & Time is required";
  if (!systolic || systolic < 0 || systolic > 140) errors.systolic = "Systolic must be between 0-140";
  if (!diastolic || diastolic < 0 || diastolic > 140) errors.diastolic = "Diastolic must be between 0-140";
  if (diastolic >= systolic) errors.diastolic = "Diastolic must be less than systolic";
  
  return errors;
}