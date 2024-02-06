const policyYoungerThanYear = {
    package_name: 'DinoSure',
    sum_assured: 9000000, // R90,000
    base_premium: 145800,
    monthly_premium: 145800,
    start_date: moment().subtract(6, 'months').startOf('day'), // Policy started 6 months ago
    end_date: null,
    module: {
      type: 'dinosure_course_sam',
      start_date: moment().subtract(6, 'months').startOf('day'), // Policy started 6 months ago
      cover_amount: 9000000, // R90,000
      birth_date: moment().subtract(20, 'years').startOf('day'), // 20 years ago
      species: 'Tyrannosaurus Rex',
      health_checks_updated: true,
      dinosaur_name: 'Sam Dino',
      dinosaur_colour: 'Sea Green',
      ndrn: '100000',
    },
  };
  
const policyOlderThanYear = {
    package_name: 'DinoSure',
    sum_assured: 9000000, // R90,000
    base_premium: 145800,
    monthly_premium: 145800,
    start_date: moment().subtract(2, 'years').startOf('day'), // Policy started 2 years ago
    end_date: null,
    module: {
      type: 'dinosure_course_sam',
      start_date: moment().subtract(2, 'years').startOf('day'), // Policy started 2 years ago
      cover_amount: 9000000, // R90,000
      birth_date: moment().subtract(20, 'years').startOf('day'), // 20 years ago
      species: 'Tyrannosaurus Rex',
      health_checks_updated: true,
      dinosaur_name: 'Sam Dino',
      dinosaur_colour: 'Sea Green',
      ndrn: '100000',
    },
  };

const policyOlderThanYearDifferentDate = {
    package_name: 'DinoSure',
    sum_assured: 9000000, // R90,000
    base_premium: 145800,
    monthly_premium: 145800,
    start_date: moment().subtract(1, 'years').startOf('day').add(1, 'days'), // Policy started 1 year and 1 day ago
    end_date: null,
    module: {
      type: 'dinosure_course_sam',
      start_date: moment().subtract(1, 'years').startOf('day').add(1, 'days'), // Policy started 1 year and 1 day ago
      cover_amount: 9000000, // R90,000
      birth_date: moment().subtract(20, 'years').startOf('day'), // 20 years ago
      species: 'Tyrannosaurus Rex',
      health_checks_updated: true,
      dinosaur_name: 'Sam Dino',
      dinosaur_colour: 'Sea Green',
      ndrn: '100000',
    },
  };
