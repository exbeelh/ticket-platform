using Server.Data;
using Server.Models;
using Server.ViewModels;
using Server.Repository.Interface;

namespace Server.Repository.Data
{
    public class PaymentRepository : GeneralRepository<Payment, int, MyContext>, IPaymentRepository
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IUserRepository _userRepository;
        private readonly IOrganizerRepository _organizerRepository;
        private readonly IFileRepository _fileRepository;

        public PaymentRepository(MyContext context, IOrderRepository orderRepository, IEventRepository eventRepository, IUserRepository userRepository, IOrganizerRepository organizerRepository, IFileRepository fileRepository) : base(context)
        {
            _orderRepository = orderRepository;
            _eventRepository = eventRepository;
            _userRepository = userRepository;
            _organizerRepository = organizerRepository;
            _fileRepository = fileRepository;
        }

        public async Task<int> UploadProof(UploadProofVM uploadProofVM)
        {
            var payment = new Payment()
            {
                OrderId = uploadProofVM.OrderId,
                FileImg = await _fileRepository.SaveImageAsync(uploadProofVM.ImageFile!),
                Status = 0,
                PaymentAt = DateTime.Now,
                UserId = uploadProofVM.UserId
            };

            await _context.Payments.AddAsync(payment);
            var created = await _context.SaveChangesAsync();
            return created;
        }

        public async Task<IEnumerable<PaymentDetailVM>> GetByUserOrganizerId(int id)
        {
            var getPayment = await GetAllAsync();
            var getOrders = await _orderRepository.GetAllAsync();
            var getEvents = await _eventRepository.GetAllAsync();
            var getUsers = await _userRepository.GetAllAsync();

            var getUser = await _userRepository.GetByIdAsync(id);
            var getOrganizer = await _organizerRepository.GetByUserId(getUser!.Id);

            var payments = (from p in getPayment
                            join o in getOrders on p.OrderId equals o.Id
                            join e in getEvents on o.EventId equals e.Id
                            join u in getUsers on o.UserId equals u.Id
                            where e.OrganizerId == getOrganizer.Id
                            where p.Status == 0
                            select new PaymentDetailVM
                            {
                                Id = p.Id,
                                FileImg = p.FileImg,
                                Status = p.Status,
                                PaymentAt = p.PaymentAt,
                                CheckAt = p.CheckAt,
                                Order = o,
                                Event = e,
                                User = u
                            }).ToList();

            return payments;
        }
    }
}
