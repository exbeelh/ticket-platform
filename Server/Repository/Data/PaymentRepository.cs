using Server.Data;
using Server.Models;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class PaymentRepository : GeneralRepository<Payment, int, MyContext>, IPaymentRepository
    {
        public PaymentRepository(MyContext context) : base(context)
        {
        }
    }
}
