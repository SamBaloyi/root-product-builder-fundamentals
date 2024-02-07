describe('Schedule Functions', () => {
  describe('applyAnnualIncrease', () => {
    // we save the current year to always make sure that the policy is older
    const currentYear = moment().year();

    it('does not increase cover for a policy younger than a year on January 1st', () => {
      // @ts-ignore
      const result = applyAnnualIncrease({ policy: policyYoungerThanYear });
      expect(result).to.be.undefined;
    });

    it('increases cover for a policy older than a year on January 1st', () => {
      // policy was originally assured for R90,000
      // monthly premium was R1458

      const originalDateNow = Date.now;
      // 1st of January, current year
      Date.now = () => new Date().setFullYear(currentYear, 0, 1);

      // @ts-ignore
      const result = applyAnnualIncrease({ policy: policyOlderThanYear });
      expect(result).to.deep.equal([
        {
          name: 'update_policy',
          data: {
            // R10,000 was added totalling R100,000
            sumAssured: 10000000,
            // montlhy premium was recalculated
            monthlyPremium: 153900,
          },
        },
      ]);

      // Restore the original Date behavior after the test
      after(() => {
        Date.now = originalDateNow;
      });
    });

    it('does not increase cover for a policy older than a year on any other date except 1st of January', () => {
      const currentYear = moment().year();
      const originalDateNow = Date.now;

      // These are random dates that aren't January 1st
      const nonJanuaryFirstDates = [
        new Date().setFullYear(currentYear, 1, 1), // February 1st
        new Date().setFullYear(currentYear, 0, 2), // January 2nd
        new Date().setFullYear(currentYear, 11, 31), // December 31st
        new Date().setFullYear(currentYear, 6, 1), // July 1st
        new Date().setFullYear(currentYear, 11, 1), // December 1st
      ];

      nonJanuaryFirstDates.forEach((date) => {
        Date.now = () => date;
        // @ts-ignore
        const result = applyAnnualIncrease({ policy: policyOlderThanYear });
        expect(result).to.be.undefined;
      });

      const januaryFirstDate = new Date().setFullYear(currentYear, 0, 1);
      Date.now = () => januaryFirstDate;

      // @ts-ignore
      const result = applyAnnualIncrease({ policy: policyOlderThanYear });
      
      expect(result).to.not.be.undefined;
      expect(result).to.deep.equal([
        {
          name: 'update_policy',
          data: {
            // R10,000 was added totalling R100,000
            sumAssured: 10000000,
            // montlhy premium was recalculated
            monthlyPremium: 153900,
          },
        },
      ]);

      // Restore the original Date behavior after the test
      after(() => {
        Date.now = originalDateNow;
      });
    });
  });
});
