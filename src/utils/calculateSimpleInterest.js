const calculateSimpleInterest = (P, r, t) => {
  P = Number(P.toFixed(2));
  r = r / 100;

  const I = Number((P * (1 + r * t) - P).toFixed(2));
  const A = P + I;

  return { P, I, A };
};

export default calculateSimpleInterest;
