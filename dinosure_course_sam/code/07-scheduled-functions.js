/*
 * SCHEDULED FUNCTIONS
 */
/**
 * Executed on the schedule defined in `.root-config.json`.
 * @param {object} params
 * @param {PlatformPolicy} params.policy The policy for which the scheduled function is running.
 * @param {PlatformPolicyholder} params.policyholder The policyholder linked to the policy
 * @return {ProductModuleAction[] | void} The actions to be queued by the platform.
 */
const applyAnnualIncrease = ({ policy, policyholder }) => {
  const start_date = moment(policy.start_date);
  const yearAgo = moment().subtract(1, 'years');
  const today = moment();

  if (
    start_date.isSameOrBefore(yearAgo) &&
    today.date() === 1 &&
    today.month() === 0
  ) {
    const increasedCover = policy.sum_assured + 10000 * 100; // adds R10,000 to the current cover
    const policyWithUpdates = {
      ...policy,
      sum_assured: increasedCover,
    };

    const newPremium = calculatePremium(policyWithUpdates);
    return [
      {
        name: 'update_policy',
        data: {
          sumAssured: increasedCover,
          monthlyPremium: newPremium,
        },
      },
    ];
  }
};
