describe('getApplication', function () {
  it('A payload with valid data passes validateApplicationRequest', function () {
    const validation = validateApplicationRequest(applicationValid);
    expect(validation.error).to.equal(null);
  });

  it('A payload with invalid data fails validateApplicationRequest', function () {
    const validation = validateApplicationRequest({});
    expect(validation.error).to.not.equal(null);
  });
  it('A created application has all of the data from the quote and application step.', function () {
    const quote = getQuote(quoteDataValid)[0];
    const application = getApplication(applicationValid, null, quote);

    // Compare quote data with application module data
    expect(application.module.cover_amount).to.equal(quote.module.cover_amount);
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
    const application = getApplication(applicationValid, undefined, quote);
    const policy = getPolicy(application, undefined, undefined);

    // Validate policy data
    expect(policy.package_name).to.equal('DinoSure');
    expect(policy.sum_assured).to.equal(application.module.cover_amount);
    expect(policy.monthly_premium).to.equal(
      application.monthly_premium,
    );
    expect(policy.base_premium).to.equal(application.base_premium);
    expect(policy.start_date).to.equal(moment().add(1, 'day').format());
    expect(policy.end_date).to.equal(null);
    expect(policy.module).to.eql({ ...quote.module, ...application.module });
    expect(policy.policy_number).to.be.a('string'); // fixed UUID from generatePolicyNumber()
  });
});
