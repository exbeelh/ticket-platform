using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class PaymentRepository : GeneralRepository<Payment, int, DbTicketPlatformContext>, IPaymentRepository
    {
        public PaymentRepository(DbTicketPlatformContext context) : base(context)
        {
        }
    }
}
