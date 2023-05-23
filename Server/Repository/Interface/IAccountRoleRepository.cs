﻿using Server.Models;

namespace Server.Repository.Interface
{
    public interface IAccountRoleRepository : IGeneralRepository<AccountRole, int>
    {
        Task<string> GetRolesByIdAsync(int id);
    }
}
