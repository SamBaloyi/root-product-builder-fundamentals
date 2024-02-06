/**
 * QUOTE HOOK
 */

/**
 * Validates the quote request data.
 * @param {Record<string, any>} data The data received in the body of the
 *     [Create a quote](https://docs.rootplatform.com/reference/getting-a-quote-2) request
 *     (without the `type` property).
 * @return {{error: any; result: any}} The [validation result](https://joi.dev/api/?v=12.1.0#validatevalue-schema-options-callback).
 *    If there are no errors, the `value` property will contain the validated data, which is passed to `getQuote`.
 * @see {@link https://docs.rootplatform.com/docs/quote-hook Quote hook}
 */
const validateQuoteRequest = (data) => {
  // Custom validation can be specified in the function body
  const result = Joi.validate(
    data,
    Joi.object()
      .keys({
        start_date: Joi.date()
          .min(moment().startOf('day').toISOString())
          .max(moment().add(60, 'days').endOf('day').toISOString())
          .required(),
        cover_amount: Joi.number()
          .integer()
          .min(10000 * 100)
          .max(100000 * 100)
          .required()
          .description(
            'Cover amount must be between R10,000 and R100,000 (in cents) inclusive.',
          ),
        birth_date: Joi.date()
          .min(moment().subtract(50, 'years').startOf('day').toISOString())
          .max(moment().endOf('day').toISOString())
          .required()
          .description(
            'Date of birth must be within 50 years of the current year.',
          ),
        species: Joi.string()
          .valid(
            'tyrannosaurus rex',
            'stegosaurus',
            'velociraptor',
            'brachiosaurus',
            'iguanodon',
          )
          .insensitive()
          .required()
          .description(
            'Valid dinosaur species are Tyrannosaurus Rex, Stegosaurus, Velociraptor, Brachiosaurus, Iguanodon.',
          ),
        health_checks_updated: Joi.boolean().required(),
      })
      .required(),
    { abortEarly: false },
  );
  return result;
};

/**
 * Generates an array of quote packages from the quote request data.
 * @param {Record<string, any>} data The validated data returned by `validateQuoteRequest` as `result.value`.
 * @return {QuotePackage[]} The quote package(s) that will be returned by the
 *     [Create a quote](https://docs.rootplatform.com/reference/getting-a-quote-2) endpoint.
 * @see {@link https://docs.rootplatform.com/docs/quote-hook Quote hook}
 */
const getQuote = (data) => {
  // Do the math and logic to calculate the premium, benefits, etc.
  // using `data`, hardcoded rating tables, data stores, or external services/APIs

  const totalPremium = calculatePremium(data);

  const quotePackage = new QuotePackage({
    // Below are standard fields for all products
    package_name: 'DinoSure', // The name of the "package" of cover
    sum_assured: data.cover_amount, // Set the total, aggregated cover amount
    base_premium: totalPremium, // Should be an integer, pence
    suggested_premium: totalPremium, // Should be an integer, pence
    billing_frequency: 'monthly', // Can be monthly or yearly
    module: data, // Save any data, calculations, or results here for future re-use.
    input_data: { ...data },
  });

  return [quotePackage];
};
