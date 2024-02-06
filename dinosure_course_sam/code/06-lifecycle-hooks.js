/*
 * LIFECYCLE HOOKS
 */

/**
 * Executed after any claims block is updated.
 * @param {object} params
 * @param {PlatformClaim} params.claim The claim object, including the updated claims blocks.
 * @param {PlatformPolicy} params.policy The policy against which the claim was opened.
 * @param {PlatformPolicyholder} params.policyholder The policyholder linked to the claim.
 * @return {ProductModuleAction[]} An array of actions to be queued by the platform.
 */
const afterClaimBlockUpdated = ({ claim, policy, policyholder }) => {
  if (
    claim.block_states.extraction_fulfillment_request.fulfillment_request_id &&
    !policy.module.extraction_has_been_claimed
  ) {
    return [
      {
        name: 'update_policy',
        data: {
          module: {
            ...policy.module,
            extraction_has_been_claimed: true,
          },
        },
      },
    ];
  } else if (
    claim.block_states.fence_repair_fulfillment_request
      .fulfillment_request_id &&
    !policy.module.fence_repair_has_been_claimed
  ) {
    return [
      {
        name: 'update_policy',
        data: {
          module: {
            ...policy.module,
            fence_repair_has_been_claimed: true,
          },
        },
      },
    ];
  }
};

/**
 * Get the reactivation options for inactive policies.
 * @param {PlatformPolicy} policy The policy to be reactivated.
 * @return {ReactivationOption[]} One of these options must be selected whenever an inactive policy is reactivated.
 */
const getReactivationOptions = (policy) => {
  const settlementAmount = policy.balance < 0 ? -policy.balance : 0;
  return [
    new ReactivationOption({
      type: 'reactivation',
      settlementAmount,
      description:
        'For a policy to be reactivated, it must either be cancelled or lapsed.',
      minimumBalanceRequired: false,
    }),
  ];
};

/**
 * Executed before a policy is reactivated.
 * Can be used to prevent reactivation if certain conditions are not met.
 * @param {object} params
 * @param {PlatformPolicy} params.policy The policy to be reactivated
 * @param {PlatformPolicyholder} params.policyholder The policyholder linked to the policy
 * @param {ReactivationOption} params.reactivationOption The reactivation option selected
 * @return {ProductModuleAction[] | void} The actions to be queued by the platform
 */
const beforePolicyReactivated = ({
  policy,
  policyholder,
  reactivationOption,
}) => {
  // Check policy status is cancelled or lapsed
  const isPolicyCancelledOrLapsed = ['lapsed', 'cancelled'].includes(
    policy.status,
  );

  if (!isPolicyCancelledOrLapsed) {
    throw new Error(
      `Policy with status ${policy.status} cannot be reactivated. Policy status must either be cancelled or lapsed.`,
    );
  }

  {
    return [
      {
        name: 'activate_policy',
      },
      {
        name: 'update_policy',
        data: {
          module: {
            ...policy.module,
            reactivation_date: moment().format(),
          },
        },
      },
    ];
  }
};
