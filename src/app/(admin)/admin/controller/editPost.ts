export async function updatePost({
  id,
  title,
  body,
}: {
  id: number;
  title: string;
  body: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  } else return res.json();
}
