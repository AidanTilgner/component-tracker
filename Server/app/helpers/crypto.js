import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  const hashed = bcrypt.hashSync(password, 10);
  console.log("Hashed password: ", hashed);
  return hashed;
};

export const comparePassword = (password, hash) => {
  const matches = bcrypt.compareSync(password, hash);
  console.log("Matches: ", matches);
  return matches;
};
