describe('Alteration Hook - Update Cover', function () {
  it('should pass alteration package validation for correct data', function () {
    const validation = validateAlterationPackageRequest({
      alteration_hook_key: coverAlterationKey,
      data: rexAlterationData,
      policy: undefined, // Provide a sample policy for testing
      policyholder: undefined, // Provide a sample policyholder for testing
    });
    console.log(validation.error)
    expect(validation.error).to.be.null;
  });

  it('should fail alteration package validation for invalid data', function () {
    const validation = validateAlterationPackageRequest({
      alteration_hook_key: coverAlterationKey,
      data: invalidAlterationData,
      policy: undefined, // Provide a sample policy for testing
      policyholder: undefined, // Provide a sample policyholder for testing
    });

    expect(validation.error).to.not.be.null;
  });

  it('should update cover for a 20-year-old Tyrannosaurus Rex to R75,000.00 with a resulting premium of R1215.00', function () {
    const alterationPackage = getAlteration({
      alteration_hook_key: coverAlterationKey,
      data: rexAlterationData,
      // @ts-ignore
      policy: rexPolicyData,
      policyholder: undefined,
    });

    const alteredPolicy = applyAlteration({
      alteration_hook_key: coverAlterationKey,
      // @ts-ignore
      policy: rexPolicyData,
      policyholder: undefined,
      // @ts-ignore
      alteration_package: alterationPackage,
    });

    expect(alteredPolicy.module.cover_amount).to.equal(7500000);
    expect(alteredPolicy.monthly_premium).to.equal(121500);
  });

  it('should update cover for a 36-year-old Velociraptor to R75,000.00 with a resulting premium of R2052.00', function () {
    const alterationPackage = getAlteration({
      alteration_hook_key: coverAlterationKey,
      data: velociraptorAlterationData,
      // @ts-ignore
      policy: velociraptorPolicyData,
      policyholder: undefined,
    });

    const alteredPolicy = applyAlteration({
      alteration_hook_key: coverAlterationKey,
      // @ts-ignore
      policy: velociraptorPolicyData,
      policyholder: undefined,
      // @ts-ignore
      alteration_package: alterationPackage,
    });
 
    expect(alteredPolicy.module.cover_amount).to.equal(7500000);
    expect(alteredPolicy.monthly_premium).to.equal(205200);
  });
});
