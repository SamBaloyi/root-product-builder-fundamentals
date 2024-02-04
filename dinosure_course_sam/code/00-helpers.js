/*
 * HELPER CONSTANTS
 */

const HEALTH_CHECKS_ADJUSTMENT_AMOUNT = 25000; // R250 in cents
const SPECIES_ADJUSTMENTS = {
  'tyrannosaurus rex': 0.81,
  stegosaurus: 1.19,
  velociraptor: 0.76,
  brachiosaurus: 1.32,
  iguanodon: 1.07,
};

/*
 * HELPER FUNCTIONS
 */

/**
 * Calculates the premium based on the quote data.
 * @param {Record<string, any>} quoteData - The quote data.
 * @return {number} - The calculated premium in cents.
 */
const calculatePremium = (quoteData) => {
  // Extract relevant data from quoteData
  const { cover_amount, birth_date, species, health_checks_updated } =
    quoteData;

  // Calculate age using moment and birth_date
  const age = moment().diff(moment(birth_date), 'years');

  // Core premium calculation
  const corePremium = cover_amount * 100 * (0.01 * (age * 0.001));

  // Health checks adjustment
  const healthChecksAdjustment = health_checks_updated
    ? 0
    : HEALTH_CHECKS_ADJUSTMENT_AMOUNT;

  // Species dependent adjustment
  const speciesAdjustment = getSpeciesAdjustment(species);

  // Total premium calculation
  const totalPremium = corePremium * speciesAdjustment + healthChecksAdjustment;

  return Math.round(totalPremium);
  // Ensure the result is rounded to the nearest cent
};

/**
 * Calculates the species-dependent adjustment for the premium.
 * @param {string} species - The dinosaur species.
 * @returns {number} - The species-dependent adjustment.
 */
const getSpeciesAdjustment = (species) => {
  const adjustedSpecies = species.toLowerCase();
  return SPECIES_ADJUSTMENTS[adjustedSpecies];
};

/**
 * Applies an alteration to update the cover amount and recalculates the premium.
 * @param {Record<string, any>} data The alteration data containing the updated cover amount.
 * @param {PlatformPolicy} policy The policy to which the alteration is applied.
 * @return {PlatformPolicy} The updated policy with the new cover amount, recalculated premium, and updated sum assured.
 */
const applyUpdateCoverAlteration = (data, policy) => {
  const updatedPolicy = { ...policy }; // Create a copy of the original policy

  // Update the cover amount and sum assured based on the alteration data
  updatedPolicy.module.cover_amount = data.cover_amount;
  updatedPolicy.sum_assured = data.cover_amount; // Assuming cover_amount is equivalent to sum_assured

  // Recalculate the premium based on the updated cover amount
  const { cover_amount, birth_date, species, health_checks_updated } =
    updatedPolicy.module;
  const newPremium = calculatePremium({
    cover_amount,
    birth_date,
    species,
    health_checks_updated,
  });

  // Update the monthly premium and sum assured in the policy
  updatedPolicy.monthly_premium = newPremium;
  updatedPolicy.sum_assured = data.cover_amount;

  return updatedPolicy;
};
