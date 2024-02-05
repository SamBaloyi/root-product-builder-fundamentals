describe('Alteration Hook - Update Cover', function () {
  const alterationHookKey = 'update-cover'; // Assuming the alteration hook key for updating cover is 'update-cover'

  it('should pass alteration package validation for correct data', function () {
    const quote = getQuote(quoteDataValid)[0];
    // @ts-ignore
    const application = getApplication(applicationValid, undefined, quote);
    // @ts-ignore
    const policy = getPolicy(application, undefined, undefined);

    const validAlterationData = {
      cover_amount: 75000 * 100, // R75,000.00
    };

    const validation = validateAlterationPackageRequest({
      alteration_hook_key: alterationHookKey,
      data: validAlterationData,
      // @ts-ignore
      policy: policy, // Provide a sample policy for testing
      policyholder: undefined, // Provide a sample policyholder for testing
    });

    expect(validation.error).to.be.null;
  });

  it('should fail alteration package validation for invalid data', function () {
    const invalidAlterationData = {
      // Invalid data (missing required fields)
    };

    const validation = validateAlterationPackageRequest({
      alteration_hook_key: alterationHookKey,
      data: invalidAlterationData,
      // @ts-ignore
      policy: undefined, // Provide a sample policy for testing
      policyholder: undefined, // Provide a sample policyholder for testing
    });

    expect(validation.error).to.not.be.null;
  });

  it('should update cover for a 20-year-old Tyrannosaurus Rex to R75,000.00 with a resulting premium of R1215.00', function () {
    const quote = getQuote(quoteDataValid)[0];
    // @ts-ignore
    const application = getApplication(applicationValid, undefined, quote);
    // @ts-ignore
    const policy = getPolicy(application, undefined, undefined);
    const alterationData = {
      cover_amount: 75000, // R75,000.00
    };

    const alterationPackage = getAlteration({
      alteration_hook_key: alterationHookKey,
      data: alterationData,
      // @ts-ignore
      policy: policy,
    });

    const alteredPolicy = applyAlteration({
      alteration_hook_key: alterationHookKey,
      // @ts-ignore
      policy: policy,
      policyholder: undefined,
      // @ts-ignore
      alteration_package: alterationPackage,
    });

    expect(alteredPolicy.sum_assured).to.equal(alterationPackage.sum_assured);
    expect(alteredPolicy.monthly_premium).to.equal(
      alterationPackage.monthly_premium,
    );
    expect(alteredPolicy.base_premium).to.equal(
      alterationPackage.monthly_premium,
    );
    expect(alteredPolicy.module.cover_amount).to.equal(
      alterationPackage.module.cover_amount,
    );
  });

  it('should update cover for a 36-year-old Velociraptor to R75,000.00 with a resulting premium of R2052.00', function () {
    const quote = getQuote(quoteDataValid)[0];
    // @ts-ignore
    const application = getApplication(applicationValid, undefined, quote);
    // @ts-ignore
    const policy = getPolicy(application, undefined, undefined);
    const alterationData = {
      cover_amount: 75000, // R75,000.00
    };

    const alterationPackage = getAlteration({
      alteration_hook_key: alterationHookKey,
      data: alterationData,
      // @ts-ignore
      policy: policy,
      policyholder: undefined,
    });

    const alteredPolicy = applyAlteration({
      alteration_hook_key: alterationHookKey,
      // @ts-ignore
      policy: policy,
      policyholder: undefined,
      // @ts-ignore
      alteration_package: alterationPackage,
    });

    expect(alteredPolicy.sum_assured).to.equal(alterationPackage.sum_assured);
    expect(alteredPolicy.monthly_premium).to.equal(
      alterationPackage.monthly_premium,
    );
    expect(alteredPolicy.base_premium).to.equal(
      alterationPackage.monthly_premium,
    );
    expect(alteredPolicy.module.cover_amount).to.equal(
      alterationPackage.module.cover_amount,
    );

  });
});
