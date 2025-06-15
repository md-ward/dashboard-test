const PostModalSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 *:rounded-md">
      <div className="w-[80%] h-4 bg-gray-300 animate-pulse"></div>
      <div className="w-[70%] h-4 bg-gray-300 animate-pulse"></div>
    </div>
  );
};
export default PostModalSkeleton;
