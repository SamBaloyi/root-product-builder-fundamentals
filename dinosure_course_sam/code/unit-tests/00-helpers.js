const quoteDataValid = {
  start_date: moment().add(20, 'days').toDate(), // 20 days from now
  cover_amount: 90000 * 100, // R90,000.00
  birth_date: moment().subtract(20, 'years').toDate(), // 20 years ago
  species: 'tyrannosaurus rex',
  health_checks_updated: true,
};

const quoteDataInvalid = {
  // Invalid data (missing required fields)
};

const quoteDataVelociraptor = {
  start_date: moment().add(36, 'days'), // 36 days from now
  cover_amount: 50000 * 100, // R50,000.00
  birth_date: moment().subtract(36, 'years'), // 36 years ago
  species: 'velociraptor',
  health_checks_updated: true,
};

const quoteDataBrachiosaurus = {
  start_date: moment().add(20, 'days'), // 20 days from now
  cover_amount: 65000 * 100, // R65,000.00
  birth_date: moment().subtract(16, 'years'), // 16 years ago
  species: 'brachiosaurus',
  health_checks_updated: true,
};


const applicationValid = {
  dinosaur_name: "Sam Dino",
  dinosaur_colour: "Sea Green",
  ndrn: "100001"
}

generatePolicyNumber = () => {
  return '8CE463A4A6';
};
