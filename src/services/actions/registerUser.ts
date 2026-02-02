"use server";
type FieldValues = Record<string, string>;

export const registerUser = async (values: FieldValues) => {
  const res = await fetch(
    ``,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      cache: "no-cache",
    }
  );

  const userInfo = await res.json();
  return userInfo;
};
