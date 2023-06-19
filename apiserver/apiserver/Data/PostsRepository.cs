
using Microsoft.EntityFrameworkCore;

namespace apiserver.Data
{
    internal static class PostsRepository
    {
        internal static async Task<List<Post>> GetPostsAsync()
        {
            using (var db = new AppDbContext())
            {
                return await db.Posts.ToListAsync();
            }
        }
        internal async static Task<Post> GetPostByIdAsync(int PostId)
        {
            using var db = new AppDbContext();
            {
                return await db.Posts.FirstOrDefaultAsync(post => post.postId == PostId);

            }
        }
        internal async static Task<bool> CreatePostAsync(Post postToCreate) //task do dodawania postów
        {
            using (var db = new AppDbContext()) 
            {
                try
                { 
                    await db.Posts.AddAsync(postToCreate);
                    return await db.SaveChangesAsync() >= 1;

                }
                catch (Exception e)
                {

                    return false;
                }
            }
        }
        internal async static Task<bool> UpdatePostAsync(Post postToUpdate) //task do aktualizowania postów
        {
            using (var db = new AppDbContext())
            {
                try
                {
                    db.Posts.Update(postToUpdate);
                    return await db.SaveChangesAsync() >= 1;

                }
                catch (Exception e)
                {

                    return false;
                }
            }
        }
        internal async static Task<bool> DeletePostAsync(int PostId) //task do usuwania postów
        {
            using (var db = new AppDbContext())
            {
                try
                {
                    Post postToDelete = await GetPostByIdAsync(PostId);
                    db.Remove(postToDelete);  
                    return await db.SaveChangesAsync() >= 1;

                }
                catch (Exception e)
                {

                    return false;
                }
            }
        }
    }
}
