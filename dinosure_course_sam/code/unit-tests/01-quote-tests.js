describe('getQuote', function () {

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
    calculateAndExpect(quoteDataValid, 145800);
  });

  it('should calculate a premium of R1368.00 for a 36-year-old Velociraptor with R50,000.00 cover amount', function () {
    calculateAndExpect(quoteDataVelociraptor, 136800);
  });

  it('should calculate a premium of R1372.80 for a 16-year-old Brachiosaurus with R65,000.00 cover amount', function () {
    calculateAndExpect(quoteDataBrachiosaurus, 137280);
  });
});
