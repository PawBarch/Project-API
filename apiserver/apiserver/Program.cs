using apiserver.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
options.AddPolicy("CORSPolicy", builder =>  //CORS do reacta
   {
       builder
      .AllowAnyMethod()
      .AllowAnyHeader()
      .WithOrigins("http://localhost:3000");
})
);
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( SwaggerGenOptions =>
{
    SwaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "API Test APP", Version = "v1" }); //header i wersja
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(SwaggerUIOptions =>
{
    SwaggerUIOptions.DocumentTitle = "API Test App";                //nazwa htmla
    SwaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Minimalistyczny model API.");
    SwaggerUIOptions.RoutePrefix = string.Empty;
}); 

app.UseHttpsRedirection();
app.UseCors("CORSPolicy");

app.MapGet("/get-all-posts", async () => await PostsRepository.GetPostsAsync()) //endpoint do wyświetlenia postów
    .WithTags("Posts Endpoints");

app.MapGet("/get-post-by-Id/{postId}", async (int postId) => //wyświetalnie
{
    Post postToReturn = await PostsRepository.GetPostByIdAsync(postId);

    if (postToReturn != null)
    {
        return Results.Ok(postToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

app.MapPost("/create-post", async (Post postToCreate) => //kreacja
{
   bool createSuccess = await PostsRepository.CreatePostAsync(postToCreate);

     
    if (createSuccess)
    {
        return Results.Ok("Create Succeded");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

app.MapPut("/update-post", async (Post postToUpdate) => //edycja
{
    bool updateSuccess = await PostsRepository.UpdatePostAsync(postToUpdate);


    if (updateSuccess)
    {
        return Results.Ok("Update Succeded");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

app.MapDelete("/delete-post-by-Id/{postId}", async (int postId) => // usuwanie
{
    bool deleteSuccess = await PostsRepository.DeletePostAsync(postId);


    if (deleteSuccess)
    {
        return Results.Ok("Update Succeded");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");
app.Run();

 