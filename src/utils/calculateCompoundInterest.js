const calculateCompoundInterest = (P, r, t, n, regularInvestment = 0) => {
  r = r / 100;
  const I = Number(
    ((P + regularInvestment * t * 12) * Math.pow(1 + r / n, n * t) - P).toFixed(
      2
    )
  );
  const A = P + I;

  console.log(A, I);

  return { I, A };
};

export { calculateCompoundInterest };
