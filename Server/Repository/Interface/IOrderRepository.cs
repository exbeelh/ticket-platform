﻿using Server.Models;
using Server.ViewModel;

namespace Server.Repository.Interface
{
    public interface IOrderRepository : IGeneralRepository<Order, int>
    {
        Task<RevenueVM> TicketSales(int id);
        Task<Order> Details(int id);
        Task<IEnumerable<EventVM>> Revenue(int id);
    }
}
