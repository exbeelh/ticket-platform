using Server.Models;
using Server.ViewModels;

namespace Server.Repository.Interface
{
    public interface IPaymentRepository : IGeneralRepository<Payment, int>
    {
        Task<int> UploadProof(UploadProofVM uploadProofVM);
        Task<IEnumerable<Payment>> GetByUserOrganizerId(int id);
    }
}
