"use server";
// local fallback for FieldValues to avoid requiring react-hook-form types
type FieldValues = Record<string, unknown>;

export const loginUser = async (values: FieldValues) => {
  const res = await fetch(
    `http://10.10.20.16:5137/customer-or-worker/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      cache: "no-cache",
      credentials: "include",
    }
  );
  const userInfo = await res.json();
  return userInfo;
};
