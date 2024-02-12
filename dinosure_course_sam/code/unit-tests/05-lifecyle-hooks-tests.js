describe('Lifecycle Hooks', () => {
  let reactivationOption;

  before(() => {
    // Get reactivation options before using beforePolicyReactivated
    // @ts-ignore
    reactivationOption = getReactivationOptions(lapsedPolicy)[0];
  });

  describe('Before reactivation', () => {
    const expectNoError = (policy) => {
      expect(() =>
        // @ts-ignore
        beforePolicyReactivated({ policy, reactivationOption }),
      ).to.not.throw();
    };

    const expectError = (policy) => {
      expect(() =>
        // @ts-ignore
        beforePolicyReactivated({ policy, reactivationOption }),
      ).to.throw();
    };

    it('should return the correct reactivation opteions', () => {
      // @ts-ignore
      expect(reactivationOption).to.deep.equal(expectedReactivationData);
    });

    it('should not reactivate a lapsed policy', () => {
      expectNoError(lapsedPolicy);
      const actions = beforePolicyReactivated({
        // @ts-ignore
        policy: lapsedPolicy,
        reactivationOption,
      });
      // @ts-ignore
      const reactivationResult =
        expectedActionsForLapsedOrCancelled(lapsedPolicy);
      expect(actions).to.deep.equal(reactivationResult);
    });

    it('should not reactivate a cancelled policy', () => {
      expectNoError(cancelledPolicy);
      const actions = beforePolicyReactivated({
        // @ts-ignore
        policy: cancelledPolicy,
        reactivationOption,
      });
      // @ts-ignore
      const reactivationResult =
        expectedActionsForLapsedOrCancelled(cancelledPolicy);
      expect(actions).to.deep.equal(reactivationResult);
    });

    it('should not reactivate an expired policy', () => {
      // expecting an error
      expectError(expiredPolicy);
    });
  });
});
