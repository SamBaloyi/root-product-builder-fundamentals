let quote, application;

describe('Testing quotesPackages with data sets', function () {
  // Setup
  before(function () {
    quote = getQuote(quoteDataValid);
    // @ts-ignore
    application = getApplication({}, undefined, quote[0]);
  });

  // Quote test 1
  describe('Quote hook', function () {
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

  describe('Application', function () {
    it('A payload with valid data passes validateApplicationRequest', function () {
      const validation = validateApplicationRequest(
        applicationValid,
        undefined,
        undefined,
      );
      expect(validation.error).to.equal(null);
    });

    it('A payload with invalid data fails validateApplicationRequest', function () {
      const validation = validateApplicationRequest({}, undefined, undefined);
      expect(validation.error).to.not.equal(null);
    });
    it('A created application has all of the data from the quote and application step.', function () {
      const quote = getQuote(quoteDataValid)[0];
      // @ts-ignore
      const application = getApplication(applicationValid, undefined, quote);

      // Compare quote data with application module data
      expect(application.module.cover_amount).to.equal(
        quote.module.cover_amount,
      );
      expect(application.module.start_date).to.equal(quote.module.start_date);
      expect(application.module.birth_date).to.equal(quote.module.birth_date);
      expect(application.module.species).to.equal(quote.module.species);
      expect(application.module.health_checks_updated).to.equal(
        quote.module.health_checks_updated,
      );

      // Compare application data with application module data
      expect(application.module.dinosaur_name).to.equal(
        applicationValid.dinosaur_name,
      );
      expect(application.module.dinosaur_colour).to.equal(
        applicationValid.dinosaur_colour,
      );
      expect(application.module.ndrn).to.equal(applicationValid.ndrn);
    });

    it('A created policy has all of the data from the quote and application step.', function () {
      // Get quote, application, and policy data
      const quote = getQuote(quoteDataValid)[0];
      // @ts-ignore
      const application = getApplication(applicationValid, undefined, quote);
      // @ts-ignore
      const policy = getPolicy(application, undefined, undefined);

      // Validate policy data
      expect(policy.package_name).to.equal('DinoSure');
      expect(policy.sum_assured).to.equal(application.module.cover_amount);
      expect(policy.monthly_premium).to.equal(application.monthly_premium);
      expect(policy.base_premium).to.equal(application.base_premium);
      expect(policy.start_date).to.equal(moment().add(1, 'day').format());
      expect(policy.end_date).to.equal(null);
      expect(policy.module).to.eql({ ...quote.module, ...application.module });
      expect(policy.policy_number).to.be.a('string'); // fixed UUID from generatePolicyNumber()
    });
  });
});
