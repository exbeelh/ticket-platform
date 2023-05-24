using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Repository.Data
{
    public class OrderRepository : GeneralRepository<Order, int, MyContext>, IOrderRepository
    {
        private readonly IUserRepository _userRepository;
        private readonly IOrderStatusRepository _orderStatusRepository;
        private readonly ITicketOrderRepository _ticketOrderRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IEventRepository _eventRepository;


        public OrderRepository(MyContext context, IUserRepository userRepository, IOrderStatusRepository orderStatusRepository, ITicketOrderRepository ticketOrderRepository, IOrderItemRepository orderItemRepository, IEventRepository eventRepository) : base(context)
        {
            _userRepository = userRepository;
            _orderStatusRepository = orderStatusRepository;
            _ticketOrderRepository = ticketOrderRepository;
            _orderItemRepository = orderItemRepository;
            _eventRepository = eventRepository;
        }

        public Task<Order> Details(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EventVM>> Revenue(int id)
        {
            throw new NotImplementedException();
        }

        public Task<RevenueVM> TicketSales(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Order> BuyTickets(OrderTicketVM orderTicketVM)
        {
            await using var transaction = _context.Database.BeginTransaction();
            try
            {
                var order = await InsertAsync(new Order()
                {
                    TransactionId = await GenerateTransactionId(),
                    EventId = orderTicketVM.EventId,
                    BookingFee = orderTicketVM.BookingFee,
                    Amount = orderTicketVM.Amount,
                    UserId = orderTicketVM.UserId,
                    OrderDate = DateTime.Now,
                    OrderStatusId = 1,
                    IsPayment = 0,
                    IsCanceled = 0
                });

                foreach (var ticketOrder in orderTicketVM.TicketOrders)
                {
                    await _ticketOrderRepository.InsertAsync(new TicketOrder()
                    {
                        OrderId = order.Id,
                        TicketId = ticketOrder.TicketId,
                    });
                }

                foreach (var orderItem in orderTicketVM.OrderItems)
                {
                    await _orderItemRepository.InsertAsync(new OrderItem()
                    {
                        OrderId = order.Id,
                        Quantity = orderItem.Quantity,
                        UnitPrice = orderItem.UnitPrice,
                        UnitBookingFee = orderItem.UnitBookingFee,
                    });
                }

                await transaction.CommitAsync();
                return order;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                return null;
            }
        }

        public async Task<string> GenerateTransactionId()
        {
            string uniqueId = Guid.NewGuid().ToString("N");
            string transactionId = uniqueId.Substring(0, 20).ToUpper();
            return transactionId;
        }

        public async Task<BookingVM?> GetOrderDetailsByTransactionId(string transactionId)
        {
            var getOrders = await GetAllAsync();
            var getTicketOrders = await _ticketOrderRepository.GetAllAsync();
            var getOrderItems = await _orderItemRepository.GetAllAsync();
            var getEvent = await _eventRepository.GetAllAsync();
            var getUser = await _userRepository.GetAllAsync();

            var result = (from order in getOrders
                          join ticketOrder in getTicketOrders on order.Id equals ticketOrder.OrderId
                          join orderItem in getOrderItems on order.Id equals orderItem.OrderId
                          join ev in getEvent on order.EventId equals ev.Id
                          join user in getUser on order.UserId equals user.Id
                          where order.TransactionId == transactionId
                          select new BookingVM()
                          {
                              Id = order.Id,
                              TransactionId = order.TransactionId,
                              EventId = order.EventId,
                              OrderStatusId = order.OrderStatusId,
                              OrderDate = order.OrderDate,
                              BookingFee = order.BookingFee,
                              Amount = order.Amount,
                              UserId = order.UserId,
                              IsPayment = order.IsPayment,
                              IsCanceled = order.IsCanceled,
                              Event = ev,
                              User = user,
                              TicketOrders = getTicketOrders.Where(x => x.OrderId == order.Id).ToList(),
                              OrderItems = getOrderItems.Where(x => x.OrderId == order.Id).ToList()
                          }).FirstOrDefault();

            return result;
        }

        public async Task<int> saveBooking(SaveBookingVM saveBookingVM)
        {
            await using var transaction = _context.Database.BeginTransaction();
            try
            {
                // check order if exist
                var checkOrder = await GetByIdAsync(saveBookingVM.OrderId);
                if (checkOrder == null)
                {
                    return 0;
                }

                foreach (var attendee in saveBookingVM.Attendees)
                {
                    await _context.Attendees.AddAsync(new Attendee()
                    {
                        OrderId = saveBookingVM.OrderId,
                        EventId = attendee.EventId,
                        TicketId = attendee.TicketId,
                        FirstName = attendee.FirstName,
                        LastName = attendee.LastName,
                        Email = attendee.Email,
                    });
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return 1;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                return 0;
            }
        }
    }
}
