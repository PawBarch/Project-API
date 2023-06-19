using System.ComponentModel.DataAnnotations;

namespace apiserver.Data
{
    internal sealed class Post //sealed - nie do dziedziczenia
    {
        [Key]
        public int postId { get; set; }
        [Required]
        [MaxLength(100)]
        
        public string Title { get; set; } = string.Empty;
        [Required]
        [MinLength(5)]
        public string Content { get; set; } = string.Empty;
         
    }
  
}
