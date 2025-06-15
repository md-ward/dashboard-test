async function addPost(formData: FormData) {
  const title = formData.get("title");
  const body = formData.get("body");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      data?.message || `Failed to create post (status ${res.status})`
    );
  } else {
    return {
      message: "Post created successfully",
    };
  }
}

export default addPost;
