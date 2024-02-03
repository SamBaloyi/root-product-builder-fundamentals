/**
 * POLICY ISSUE HOOK
 */

/**
 * Generates a policy using the application, policyholder and billing day.
 * @param {PlatformApplication} application The application from which the policy will be issued.
 * @param {PlatformPolicyholder} policyholder The policyholder that will be linked to the policy.
 * @param {number} billing_day The billing day is specified when a payment method is linked to an application or policy.
 *     If no payment method has been linked at the time of policy issue, the billing day defaults to 1.
 * @return {Policy} The policy that will be returned by the [Issue a policy](https://docs.rootplatform.com/reference/issue-a-policy-1) endpoint.
 * @see {@link https://docs.rootplatform.com/docs/policy-issue-hook Policy issue hook}
 */
const getPolicy = (application, policyholder, billing_day) => {
  const policy = new Policy({
    policy_number: generatePolicyNumber(),
    package_name: "DinoSure",
    sum_assured: application.sum_assured,
    monthly_premium: application.monthly_premium,
    base_premium: application.base_premium,
    start_date: moment().add(1, 'day').format(), // start tomorrow
    end_date: null,
    module: {
      ...application.module,
    },
  });

  return policy;
};
