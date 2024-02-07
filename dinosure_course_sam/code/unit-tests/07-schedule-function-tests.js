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
      const januaryFirstDate = moment()
        .set({ year: currentYear, month: 0, date: 1 })
        .valueOf(); // January 1st
      Date.now = () => januaryFirstDate;

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
        moment().set({ year: currentYear, month: 1, date: 1 }).valueOf(), // February 1st
        moment().set({ year: currentYear, month: 0, date: 2 }).valueOf(), // January 2nd
        moment().set({ year: currentYear, month: 11, date: 31 }).valueOf(), // December 31st
        moment().set({ year: currentYear, month: 6, date: 1 }).valueOf(), // July 1st
        moment().set({ year: currentYear, month: 11, date: 1 }).valueOf(), // December 1st
      ];

      nonJanuaryFirstDates.forEach((date) => {
        Date.now = () => date;
        // @ts-ignore
        const result = applyAnnualIncrease({ policy: policyOlderThanYear });
        expect(result).to.be.undefined;
      });

      const januaryFirstDate = moment()
        .set({ year: currentYear, month: 0, date: 1 })
        .valueOf(); // January 1st
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
