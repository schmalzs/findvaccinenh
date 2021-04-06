const mapDose1Date = (dose1Date) => `${dose1Date}T12:00:00.000Z`;

const mapDoseType = (doseType) => {
  if (doseType === 'dose-1') return 'Dose-1';
  if (doseType === 'dose-2') return 'Dose-2';
  return '';
};

const mapVaccineType = (vaccineType) => {
  if (vaccineType === 'all')
    return 'Pfizer-BioNTech;Moderna;Johnson & Johnson;All';
  if (vaccineType === 'pfizer') return 'Pfizer-BioNTech';
  if (vaccineType === 'moderna') return 'Moderna';
  if (vaccineType === 'johnson-and-johnson') return 'Johnson & Johnson';
  return '';
};

module.exports = { mapDose1Date, mapDoseType, mapVaccineType };
