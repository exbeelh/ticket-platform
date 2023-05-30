using Server.Data;
using Server.Models;
using Server.Repository.Interface;
using Server.ViewModels;

namespace Server.Repository.Data
{
    public class OrderRepository : GeneralRepository<Order, int, MyContext>, IOrderRepository
    {
        private readonly IUserRepository _userRepository;
        private readonly ITicketOrderRepository _ticketOrderRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IOrderStatusRepository _orderStatusRepository;

        public OrderRepository(MyContext context, IUserRepository userRepository, IOrderStatusRepository orderStatusRepository, ITicketOrderRepository ticketOrderRepository, IOrderItemRepository orderItemRepository, IEventRepository eventRepository) : base(context)
        {
            _userRepository = userRepository;
            _ticketOrderRepository = ticketOrderRepository;
            _orderItemRepository = orderItemRepository;
            _eventRepository = eventRepository;
            _orderStatusRepository = orderStatusRepository;
        }

        public async Task<IEnumerable<RevenueVM>> Revenue(int id)
        {
            var getOrders = await GetAllAsync();
            var orderItems = await _orderItemRepository.GetAllAsync();

            var data = from orderItem in orderItems
                       join order in getOrders on orderItem.OrderId equals order.Id
                       where order.EventId == id && order.OrderStatusId == 3
                       select new RevenueVM()
                       {
                           TicketName = orderItem.Name!,
                           TransactionId = order.TransactionId,
                           Quantity = orderItem.Quantity,
                           Price = orderItem.UnitPrice,
                           TotalPrice = orderItem.UnitPrice * orderItem.Quantity,
                           Commission = order.BookingFee,
                           FinalAmount = (orderItem.UnitPrice * orderItem.Quantity) + order.BookingFee
                       };

            return data;
        }

        public async Task<IEnumerable<TicketSalesVM>> TicketSales(int id)
        {
            var getOrders = await GetAllAsync();
            var getUsers = await _userRepository.GetAllAsync();
            var orderItems = await _orderItemRepository.GetAllAsync();

            var ticketSales = from order in getOrders
                              join user in getUsers on order.UserId equals user.Id
                              where order.EventId == id && order.OrderStatusId == 3
                              select new TicketSalesVM()
                              {
                                  OrderId = order.Id,
                                  FullName = user.Firstname + " " + user.Lastname,
                                  TransactionId = order.TransactionId,
                                  Quantity = orderItems.Where(y => y.OrderId == order.Id).Sum(y => y.Quantity),
                                  Payment = order.Amount,
                                  OrderDate = order.OrderDate
                              };

            return ticketSales;
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
                        OrderId = order!.Id,
                        TicketId = ticketOrder.TicketId,
                    });
                }

                foreach (var orderItem in orderTicketVM.OrderItems)
                {
                    await _orderItemRepository.InsertAsync(new OrderItem()
                    {
                        Name = orderItem.Name,
                        OrderId = order!.Id,
                        Quantity = orderItem.Quantity,
                        UnitPrice = orderItem.UnitPrice,
                        UnitBookingFee = orderItem.UnitBookingFee,
                    });
                }

                await transaction.CommitAsync();
                return order!;
            }
            catch (Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                await transaction.RollbackAsync();
                return null!;
            }
        }

        public async Task<string> GenerateTransactionId()
        {
            string uniqueId = Guid.NewGuid().ToString("N");
            string transactionId = uniqueId[..20].ToUpper();
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
                await Console.Out.WriteLineAsync(e.Message);
                await transaction.RollbackAsync();
                return 0;
            }
        }

        public async Task<IEnumerable<MyTicketVM>> MyTickets(int userId)
        {
            var getOrders = await GetAllAsync();
            var getTicketOrders = await _ticketOrderRepository.GetAllAsync();
            var getOrderItems = await _orderItemRepository.GetAllAsync();
            var getOrderStatus = await _orderStatusRepository.GetAllAsync();
            var getEvent = await _eventRepository.GetAllAsync();
            var getUser = await _userRepository.GetAllAsync();

            var result = (from order in getOrders
                          join orderStatus in getOrderStatus on order.OrderStatusId equals orderStatus.Id
                          join ev in getEvent on order.EventId equals ev.Id
                          join user in getUser on order.UserId equals user.Id
                          where order.UserId == userId
                          select new MyTicketVM()
                          {
                              OrderId = order.Id,
                              TransactionId = order.TransactionId,
                              EventName = ev.Title,
                              OrderStatusId = order.OrderStatusId,
                              OrderStatusName = orderStatus.Name,
                              OrderDate = order.OrderDate,
                          }).ToList();

            return result;
        }

        public async Task<OrderDetailVM> GetOrderDetail(string transactionId)
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
                          select new OrderDetailVM()
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
                              OrderItems = getOrderItems.Where(x => x.OrderId == order.Id).ToList()
                          }).FirstOrDefault();

            return result!;
        }

        public async Task<int> CancelOrder(int orderId)
        {
            await using var transaction = _context.Database.BeginTransaction();
            try
            {
                var checkOrder = await GetByIdAsync(orderId);
                if (checkOrder == null)
                {
                    return 0;
                }

                checkOrder.IsCanceled = 1;
                checkOrder.OrderStatusId = 5;
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return 1;
            }
            catch (Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                await transaction.RollbackAsync();
                return 0;
            }
        }
    }
}
