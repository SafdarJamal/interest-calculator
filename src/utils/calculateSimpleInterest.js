const calculateSimpleInterest = (P, r, t) => {
  r = r / 100;
  const I = Number((P * (1 + r * t) - P).toFixed(2));
  const A = P + I;

  console.log(A, I);

  return { I, A };
};

export { calculateSimpleInterest };
