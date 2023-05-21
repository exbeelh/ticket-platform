using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class Country
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

   [JsonIgnore] public virtual ICollection<User> Users { get; set; } = new List<User>();
}
