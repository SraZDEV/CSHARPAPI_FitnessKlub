using System.ComponentModel.DataAnnotations.Schema;

namespace CSHARPAPI_FitnessKlub.Models
{
    public class PrivatniTrening: Entitet
    {

        [Column("privatni_trener")]
        public PrivatniTrener? PrivatniTrener { get; set; }
        public Clan? Clan { get; set; }

        

    }
}
