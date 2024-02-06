describe('Schedule Functions', () => {
  describe('applyAnnualIncrease', () => {
    it('A policy younger than a year does not increase in cover on the 1st of January', () => {
      const alterations = applyAnnualIncrease({
        policy,
        policyholder: undefined,
      });
      expect(alterations).to.deep.equal([]); // No alterations should be made
    });

    it('A policy older than a year does not increase in cover on the 1st of January', () => {
      const alterations = applyAnnualIncrease({
        policyOlderThanYear,
        policyholder: undefined,
      });
      expect(alterations).to.deep.equal([]); // No alterations should be made
    });

    it('A policy older than a year does not increase in cover on any other date except 1st of January', () => {
      const date = moment().month(4).date(15); // Random date in May
      const alterations = applyAnnualIncrease({
        policy,
        policyholder: undefined,
        date,
      });
      expect(alterations).to.deep.equal([]); // No alterations should be made
    });
  });
});
