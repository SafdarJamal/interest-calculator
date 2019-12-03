const calculateCompoundInterest = (P, r, t, n, PMT) => {
  r = r / 100;
  const I = Number(
    (
      P * Math.pow(1 + r / n, n * t) +
      (PMT * (Math.pow(1 + r / n, n * t) - 1)) / (r / n)
    ).toFixed(2)
  );
  const A = P + I;

  console.log(A, I);

  return { I, A };
};

export { calculateCompoundInterest };
