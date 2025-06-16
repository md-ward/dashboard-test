async function getPostById(postId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${postId}`, {
    method: "GET",
  });
  if (res.ok) {
    const post = await res.json();
    return post;
  } else {
    throw new Error(`something wrong ${res.status}`);
  }
}

export default getPostById;
