using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class Category
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Slug { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<SubCategory> SubCategories { get; set; } = new List<SubCategory>();
}
