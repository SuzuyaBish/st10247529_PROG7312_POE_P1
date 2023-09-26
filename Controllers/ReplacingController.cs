using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace Project1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReplacingController : ControllerBase
    {
        [HttpGet]
        public ActionResult<CallNumbersResponse> GenerateAndSortCallNumbers()
        {
            List<string> callNumbers = GenerateRandomCallNumbers();
            List<string> sortedCallNumbers = callNumbers.OrderBy(cn => cn).ToList();

            CallNumbersResponse response = new CallNumbersResponse
            {
                RandomCallNumbers = callNumbers,
                SortedCallNumbers = sortedCallNumbers
            };

            return response;
        }

        private List<string> GenerateRandomCallNumbers()
        {
            List<string> callNumbers = new List<string>();

            Random random = new Random();

            for (int i = 0; i < 10; i++)
            {
                double randomDecimal = random.Next(0, 100000) / 100.0;
                string decimalPart = randomDecimal.ToString("F2");

                int randomAuthorCode = random.Next(0, 17576); // 26^3 = 17576
                string authorCode = GetRandomAuthorCode(randomAuthorCode);

                string callNumber = $"{decimalPart} {authorCode}";

                callNumbers.Add(callNumber);
            }

            return callNumbers;
        }

        private string GetRandomAuthorCode(int code)
        {
            StringBuilder authorCode = new StringBuilder();

            for (int i = 0; i < 3; i++)
            {
                int remainder = code % 26;
                char randomChar = (char)('A' + remainder);
                authorCode.Insert(0, randomChar);
                code /= 26;
            }

            return authorCode.ToString();
        }

        public class CallNumbersResponse
        {
            public List<string> RandomCallNumbers { get; set; }
            public List<string> SortedCallNumbers { get; set; }
        }
    }
}
