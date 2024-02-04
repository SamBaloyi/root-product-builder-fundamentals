/*
 * ALTERATION HOOKS
 */

/**
 * Validates the alteration package request data.
 * @param {object} params
 * @param {string} params.alteration_hook_key The alteration hook identifier, as specified in `.root-config.json`.
 * @param {Record<string, any>} params.data The data received in the body of the
 *     <a href='https://docs.rootplatform.com/reference/create-an-alteration-package-1' target='_blank'>Create an alteration package</a> request
 *     (without the `key` property).
 * @param {PlatformPolicy} params.policy The policy to which the alteration package will be applied.
 * @param {PlatformPolicyholder} params.policyholder The policyholder linked to the policy.
 * @return {{error: any; result: any}} The <a href='https://joi.dev/api/?v=12.1.0#validatevalue-schema-options-callback' target='_blank'>validation result</a>.
 *    If there are no errors, the `value` property will contain the validated data, which is passed to `getAlteration`.
 * @see {@link https://docs.rootplatform.com/docs/alteration-hooks Alteration hooks}
 */
const validateAlterationPackageRequest = ({
  alteration_hook_key,
  data,
  policy,
  policyholder,
}) => {
  let validationResult;
  switch (alteration_hook_key) {
    case 'update-cover':
      validationResult = Joi.validate(
        data,
        Joi.object().keys({
          cover_amount: Joi.number()
            .integer()
            .min(10000)
            .max(100000)
            .required()
            .description(
              'Cover amount must be between R10,000 and R100,000 inclusive.',
            ),
        }),
        { abortEarly: false },
      );
      return validationResult;
    default:
      throw new Error(`Invalid alteration hook key "${alteration_hook_key}"`);
  }
};

/**
 * Generates an alteration package from the alteration package request data, policy and policyholder.
 * @param {object} params
 * @param {string} params.alteration_hook_key The alteration hook identifier, as specified in `.root-config.json`.
 * @param {Record<string, any>} params.data The validated data returned by `validateAlterationPackageRequest` as `result.value`.
 * @param {PlatformPolicy} params.policy The policy to which the alteration package will be applied.
 * @param {PlatformPolicyholder} params.policyholder The policyholder linked to the policy.
 * @return {AlterationPackage} Alteration package returned by the
 *     <a href='https://docs.rootplatform.com/reference/create-an-alteration-package-1' target='_blank'>Create an alteration package</a>
 *     endpoint.
 * @see {@link https://docs.rootplatform.com/docs/alteration-hooks Alteration hooks}
 */
const getAlterationPackage = ({
  alteration_hook_key,
  data,
  policy,
  policyholder,
}) => {
  let alterationPackage;
  switch (alteration_hook_key) {
    case 'update-cover':
      const updatedPolicy = applyUpdateCoverAlteration(data, policy);
      alterationPackage = new AlterationPackage({
        input_data: data,
        sum_assured: updatedPolicy.module.sum_assured,
        monthly_premium: updatedPolicy.monthly_premium,
        change_description: 'Alteration - update cover amount',
        module: updatedPolicy.module,
      });
      return alterationPackage;
    default:
      throw new Error(`Invalid alteration hook key "${alteration_hook_key}"`);
  }
};

/**
 * Applies the alteration package to the policy.
 * Triggered by the <a href='https://docs.rootplatform.com/reference/apply-alteration-package-1' target='_blank'>Apply alteration package</a> endpoint.
 * @param {object} params
 * @param {string} params.alteration_hook_key The alteration hook identifier, as specified in `.root-config.json`.
 * @param {PlatformPolicy} params.policy The policy to which the alteration package will be applied.
 * @param {PlatformPolicyholder} params.policyholder The policyholder linked to the policy.
 * @param {PlatformAlterationPackage} params.alteration_package The alteration package to be applied to the policy.
 * @return {AlteredPolicy} The altered policy. This object is **not** returned over the endpoint.
 *    Instead, the alteration package is returned with a status of `applied`.
 * @see {@link https://docs.rootplatform.com/docs/alteration-hooks Alteration hooks}
 */
const applyAlteration = ({
  alteration_hook_key,
  policy,
  policyholder,
  alteration_package,
}) => {
  let alteredPolicy;
  switch (alteration_hook_key) {
    case 'update-cover':
      alteredPolicy = new AlteredPolicy({
        package_name: policy.package_name,
        sum_assured: alteration_package.sum_assured,
        base_premium: alteration_package.monthly_premium,
        monthly_premium: alteration_package.monthly_premium,
        module: alteration_package.module,
        end_date: moment(policy.end_date),
        start_date: moment(policy.start_date),
        charges: policy.charges,
      });
      return alteredPolicy;
    default:
      throw new Error(`Invalid alteration hook key "${alteration_hook_key}"`);
  }
};
