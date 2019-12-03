const calculateCompoundInterest = (P, r, t, n, PMT) => {
  r = r / 100;
  const A = Number(
    (
      P * Math.pow(1 + r / n, n * t) +
      (PMT * (Math.pow(1 + r / n, n * t) - 1)) / (r / n)
    ).toFixed(2)
  );

  console.log(A, Number((A - P).toFixed(2)));

  return A;
};

export { calculateCompoundInterest };
