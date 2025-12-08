"use server";
type FieldValues = Record<string, any>;

export const registerUser = async (values: FieldValues) => {
  const res = await fetch(
    `https://gardening-tips-platform-server.vercel.app/api/v1/user/create-user`,
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
