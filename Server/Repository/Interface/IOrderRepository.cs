using Server.Models;
using Server.ViewModels;

namespace Server.Repository.Interface
{
    public interface IOrderRepository : IGeneralRepository<Order, int>
    {
        Task<IEnumerable<TicketSalesVM>> TicketSales(int id);
        Task<IEnumerable<RevenueVM>> Revenue(int id);
        Task<Order> BuyTickets(OrderTicketVM orderTicketVM);
        Task<string> GenerateTransactionId();
        Task<BookingVM?> GetOrderDetailsByTransactionId(string transactionId);
        Task<int> saveBooking(SaveBookingVM saveBookingVM);
        Task<IEnumerable<MyTicketVM>> MyTickets(int id);
        Task<OrderDetailVM> GetOrderDetail(string transactionId);
    }
}
