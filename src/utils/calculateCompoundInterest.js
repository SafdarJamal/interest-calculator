const calculateCompoundInterest = (P, r, t, n, PMT) => {
  P = Number(P.toFixed(2));
  r = r / 100;
  PMT = Number(Number(PMT).toFixed(2));

  const A = Number(
    (
      P * Math.pow(1 + r / n, n * t) +
      (PMT * (Math.pow(1 + r / n, n * t) - 1)) / (r / n)
    ).toFixed(2)
  );

  PMT = Number((PMT * 12 * t).toFixed(2));
  const I = Number((A - P - PMT).toFixed(2));

  return { P, PMT, I, A };
};

export default calculateCompoundInterest;
