using Server.Models;
using Server.ViewModels;

namespace Server.Repository.Interface
{
    public interface IOrderRepository : IGeneralRepository<Order, int>
    {
        Task<Order> BuyTickets(OrderTicketVM orderTicketVM);
        Task<string> GenerateTransactionId();
        Task<BookingVM?> GetOrderDetailsByTransactionId(string transactionId);
        Task<int> saveBooking(SaveBookingVM saveBookingVM);
    }
}
