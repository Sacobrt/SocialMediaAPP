using Microsoft.AspNetCore.Mvc;

namespace CSHARP_SocialMediaAPP.Controllers
{
    public class CellData
    {
        public int Number { get; set; }
        public bool MoveUp { get; set; }
        public bool MoveDown { get; set; }
        public bool MoveLeft { get; set; }
        public bool MoveRight { get; set; }
        public string BackgroundColor { get; set; } = "#333";
    }
    [ApiController]
    [Route("api/v1/Cyclic")]
    public class CyclicController : ControllerBase
    {
        [HttpGet("{rows}/{columns}")]
        public IActionResult GetCyclic(int rows, int columns)
        {
            if (rows <= 0 || columns <= 0)
            {
                return BadRequest("Rows and columns need to be higher than 0!");
            }

            var matrix = CreateCyclic(rows, columns);

            var result = ConvertToJson(matrix);
            return Ok(result);
        }
        private List<List<CellData>> ConvertToJson(CellData[,] matrix)
        {
            var result = new List<List<CellData>>();
            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                var row = new List<CellData>();
                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    row.Add(matrix[i, j]);
                }
                result.Add(row);
            }
            return result;
        }
        private CellData[,] CreateCyclic(int rows, int columns)
        {
            CellData[,] table = new CellData[rows, columns];
            int bottomRow = rows - 1;
            int leftColumn = 0;
            int topRow = 0;
            int rightColumn = columns - 1;
            int currentNum = 1;

            for (int t = 0; currentNum <= rows * columns; t++)
            {
                for (int i = rightColumn; i >= leftColumn; i--)
                {
                    table[bottomRow, i] = new CellData
                    {
                        Number = currentNum,
                        MoveLeft = true,
                        BackgroundColor = currentNum == 1 ? "#FFF" : "#333"
                    };
                    currentNum++;
                }
                bottomRow--;

                for (int i = bottomRow; i >= topRow; i--)
                {
                    table[i, leftColumn] = new CellData
                    {
                        Number = currentNum,
                        MoveUp = true,
                        BackgroundColor = currentNum == 1 ? "#FFF" : "#333"
                    };
                    currentNum++;
                }
                leftColumn++;

                if (topRow <= bottomRow)
                {
                    for (int i = leftColumn; i <= rightColumn; i++)
                    {
                        table[topRow, i] = new CellData
                        {
                            Number = currentNum,
                            MoveRight = true,
                            BackgroundColor = currentNum == 1 ? "#FFF" : "#333"
                        };
                        currentNum++;
                    }
                    topRow++;
                }

                if (leftColumn <= rightColumn)
                {
                    for (int i = topRow; i <= bottomRow; i++)
                    {
                        table[i, rightColumn] = new CellData
                        {
                            Number = currentNum,
                            MoveDown = true,
                            BackgroundColor = currentNum == 1 ? "#FFF" : "#333"
                        };
                        currentNum++;
                    }
                    rightColumn--;
                }
            }
            return table;
        }
    }
}
