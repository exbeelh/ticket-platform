using Server.Models;

namespace Server.ViewModels
{
    public class PaymentDetailVM
    {
        public int Id { get; set; }

        public string? FileImg { get; set; }

        public int? Status { get; set; }

        public DateTime? PaymentAt { get; set; }

        public DateTime? CheckAt { get; set; }

        public virtual Order? Order { get; set; }

        public virtual Event? Event { get; set; }

        public virtual User? User { get; set; }

    }
}
