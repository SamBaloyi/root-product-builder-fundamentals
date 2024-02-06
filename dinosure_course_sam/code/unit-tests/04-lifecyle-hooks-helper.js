/**
 * Lifecycle Helper
 */

// A 20-year-old Tyrannosaurus Rex with R90,000.00 has a premium of R1458.00
const lapsedPolicy = {
  status: 'lapsed',
  package_name: 'DinoSure',
  sum_assured: 9000000, // R90,000
  base_premium: 145800,
  monthly_premium: 145800,
  start_date: '2023-12-06T09:47:52Z',
  end_date: null,
  module: {
    type: 'dinosure_course_sam',
    start_date: moment().add(2, 'days').startOf('day'),
    cover_amount: 9000000, // R90,000
    birth_date: moment().subtract(20).startOf('day'), // 20 years ago
    species: 'Tyrannosaurus Rex',
    health_checks_updated: true,
    dinosaur_name: 'Sam Dino',
    dinosaur_colour: 'Sea Green',
    ndrn: '100000',
  },
};

const cancelledPolicy = {
  status: 'cancelled',
  package_name: 'DinoSure',
  sum_assured: 9000000, // R90,000
  base_premium: 145800,
  monthly_premium: 145800,
  start_date: '2023-12-06T09:47:52Z',
  end_date: null,
  module: {
    type: 'dinosure_course_sam',
    start_date: moment().add(2, 'days').startOf('day'),
    cover_amount: 9000000, // R90,000
    birth_date: moment().subtract(20).startOf('day'), // 20 years ago
    species: 'Tyrannosaurus Rex',
    health_checks_updated: true,
    dinosaur_name: 'Sam Dino',
    dinosaur_colour: 'Sea Green',
    ndrn: '100000',
  },
};

const expiredPolicy = {
  status: 'expired',
  package_name: 'DinoSure',
  sum_assured: 9000000, // R90,000
  base_premium: 145800,
  monthly_premium: 145800,
  start_date: '2023-12-06T09:47:52Z',
  end_date: null,
  module: {
    type: 'dinosure_course_sam',
    start_date: moment().add(2, 'days').startOf('day'),
    cover_amount: 9000000, // R90,000
    birth_date: moment().subtract(20).startOf('day'), // 20 years ago
    species: 'Tyrannosaurus Rex',
    health_checks_updated: true,
    dinosaur_name: 'Sam Dino',
    dinosaur_colour: 'Sea Green',
    ndrn: '100000',
  },
};

const expectedReactivationData = {
  type: 'reactivation',
  settlementAmount: 0,
  description:
    'For a policy to be reactivated, it must either be cancelled or lapsed.',
  minimumBalanceRequired: false,
};

const expectedActionsForLapsedOrCancelled = (policy) => [
  {
    name: 'activate_policy',
  },
  {
    name: 'update_policy',
    data: {
      module: {
        ...policy.module,
        reactivation_date: moment().format(),
      },
    },
  },
];
