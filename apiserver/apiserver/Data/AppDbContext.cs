using Microsoft.EntityFrameworkCore;

namespace apiserver.Data
{
    internal sealed class AppDbContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db"); // wkłada bazę danych w folder Data i nazwie go AppDB


        protected override void OnModelCreating(ModelBuilder modelBuilder) //wrzucenie do bazy placeholderowych postów przy tworzeniu bazy
        {
            Post[] postsToSeed = new Post[6];

            for (int i = 1; i <= 6; i++)
            {
                postsToSeed[i - 1] = new Post
                {
                    postId = i,
                    Title = $"Post{i}",
                    Content = $"This is placeholder text numer {i} it may be changed later."

                };
            }
            modelBuilder.Entity<Post>().HasData(postsToSeed); //seeduje posty
        }

    }
}
// dotnet ef migrations add FirstMigration -o "Data\Migrations" tworzy folder Migrations z generowaną bazą danych
// dotnet ef database update Tworzy AppDB