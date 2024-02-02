describe('getQuote', function () {
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

  const calculateAndExpect = (data, expectedPremium) => {
    const quotePackage = getQuote(data)[0];
    expect(quotePackage.suggested_premium).to.equal(expectedPremium);
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
    calculateAndExpect(quoteDataValid, 1458);
  });

  it('should calculate a premium of R1368.00 for a 36-year-old Velociraptor with R50,000.00 cover amount', function () {
    calculateAndExpect(quoteDataVelociraptor, 1368);
  });

  it('should calculate a premium of R1372.80 for a 16-year-old Brachiosaurus with R65,000.00 cover amount', function () {
    calculateAndExpect(quoteDataBrachiosaurus, 1372.8);
  });
});
