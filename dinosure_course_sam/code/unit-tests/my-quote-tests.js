/**
 * @file This file is used by the 'rp test' command and allows you to write and run unit tests locally.
 * When running unit tests, the unit test code files are appended to the product module code files, and executed using mocha.
 * The unit test files are automatically commented out when the product module definition is pushed to Root,
 * ensuring that the unit tests are not executed in production.
 */

// describe('getQuote', function () {
//   const quoteData = {
//     cover_amount: 200000 * 100,
//     age: 30,
//     cardio_fitness_level: 'couch potato',
//     smoker: false,
//     early_warning_network_benefit: true,
//     extraction_benefit: false,
//   };

//   it('should pass quote data validation for correct data', function () {
//     const validation = validateQuoteRequest(quoteData);
//     expect(validation.error).to.equal(null);
//   });

//   it('should return a suggested premium of £73.00 (in pence)', function () {
//     const quotePackage = getQuote(quoteData)[0];

//     expect(quotePackage.suggested_premium).to.equal(7300); // pence
//   });
// });

describe('getQuote', function () {
  const quoteDataValid = {
    cover_amount: 90000 * 100, // R90,000.00
    age: 20,
    species: 'tyrannosaurus rex',
    health_checks_updated: true,
  };

  const quoteDataInvalid = {
    // Invalid data (missing required fields)
  };

  const quoteDataVelociraptor = {
    cover_amount: 50000 * 100, // R50,000.00
    age: 36,
    species: 'velociraptor',
    health_checks_updated: true,
  };

  const quoteDataBrachiosaurus = {
    cover_amount: 65000 * 100, // R65,000.00
    age: 16,
    species: 'brachiosaurus',
    health_checks_updated: true,
  };

  it('should pass quote data validation for correct data', function () {
    const validation = validateQuoteRequest(quoteDataValid);
    expect(validation.error).to.equal(null);
  });

  it('should fail quote data validation for invalid data', function () {
    const validation = validateQuoteRequest(quoteDataInvalid);
    expect(validation.error).to.not.equal(null);
  });

  it('should calculate a premium of R1458.00 for a 20-year-old Tyrannosaurus Rex with R90,000.00 cover amount', function () {
    const quotePackage = getQuote(quoteDataValid)[0];
    expect(quotePackage.suggested_premium).to.equal(145800); // R1458.00 in cents
  });

  it('should calculate a premium of R1368.00 for a 36-year-old Velociraptor with R50,000.00 cover amount', function () {
    const quotePackage = getQuote(quoteDataVelociraptor)[0];
    expect(quotePackage.suggested_premium).to.equal(136800); // R1368.00 in cents
  });

  it('should calculate a premium of R1372.80 for a 16-year-old Brachiosaurus with R65,000.00 cover amount', function () {
    const quotePackage = getQuote(quoteDataBrachiosaurus)[0];
    expect(quotePackage.suggested_premium).to.equal(137280); // R1372.80 in cents
  });
});
