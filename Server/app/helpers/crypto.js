import bcrypt from "bcrypt";

// TODO: Make these asyncronous because they'll get computationally expensive
export const hashPassword = (password) => {
  const hashed = bcrypt.hashSync(password, 10);
  return hashed;
};

export const comparePassword = (password, hash) => {
  const matches = bcrypt.compareSync(password, hash);
  return matches;
};
