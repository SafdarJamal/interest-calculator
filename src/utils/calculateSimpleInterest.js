const calculateSimpleInterest = (principalAmount, interestRate, timePeriod) => {
  const interestRateInDecimal = interestRate / 100;
  const interestEarned = principalAmount * interestRateInDecimal * timePeriod;
  const futureValue = principalAmount + interestEarned;

  return { interestEarned, futureValue };
};

export { calculateSimpleInterest };
