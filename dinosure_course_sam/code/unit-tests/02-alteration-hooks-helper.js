const coverAlterationKey = 'update-cover';

// const validAlterationData = {
//   cover_amount: 75000 * 100, // R75,000.00
// };

const invalidAlterationData = {
  // Invalid data (missing required fields)
};

const rexAlterationData = {
  cover_amount: 75000 * 100, // R75,000.00
};

const velociraptorAlterationData = {
  cover_amount: 75000 * 100, // R75,000.00
};

const rexPolicyData = {
  package_name: 'DinoSure',
  sum_assured: 90000 * 100,
  base_premium: 1458 * 100,
  suggested_premium: 1458 * 100,
  billing_frequency: 'monthly',
  module: {
    start_date: moment().add(20, 'days').toDate(), // 20 days from now
    cover_amount: 90000 * 100,
    birth_date: moment().subtract(20, 'years').toDate(), // 20 years ago
    species: 'tyrannosaurus rex',
    health_checks_updated: true,
  },
};

const velociraptorPolicyData = {
  package_name: 'DinoSure',
  sum_assured: 5000000,
  base_premium: 136800,
  suggested_premium: 136800,
  billing_frequency: 'monthly',
  module: {
    start_date: moment().add(36, 'days'), // 36 days from now
    cover_amount: 5000000,
    birth_date: moment().subtract(36, 'years'), // 36 years ago
    species: 'velociraptor',
    health_checks_updated: true
  }
}
