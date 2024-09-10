using Microsoft.AspNetCore.Mvc;

namespace CSHARP_SocialMediaAPP.Controllers
{
    public class CellData
    {
        public int CellNumber { get; set; }
        public bool CellUp { get; set; }
        public bool CellDown { get; set; }
        public bool CellLeft { get; set; }
        public bool CellRight { get; set; }
        public string CellBgColor { get; set; } = "#333";
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
                        CellNumber = currentNum,
                        CellLeft = false,
                        CellRight = false,
                        CellUp = false,
                        CellDown = false
                    };
                    if (i > leftColumn)
                    {
                        table[bottomRow, i].CellLeft = true;
                    }
                    if (i < rightColumn)
                    {
                        table[bottomRow, i].CellRight = true;
                    }
                    if (bottomRow < rows - 1)
                    {
                        table[bottomRow, i].CellUp = true;
                    }

                    if (i == leftColumn && bottomRow == rows - 1)
                    {
                        table[bottomRow, i].CellUp = true;
                        table[bottomRow, i].CellRight = true;
                    }

                    if (currentNum == 1)
                    {
                        table[bottomRow, i].CellLeft = false;
                        table[bottomRow, i].CellRight = false;
                        table[bottomRow, i].CellUp = false;
                        table[bottomRow, i].CellDown = false;
                        table[bottomRow, i].CellBgColor = "#FFF";
                    }
                    currentNum++;
                }
                bottomRow--;

                for (int i = bottomRow; i >= topRow; i--)
                {
                    table[i, leftColumn] = new CellData
                    {
                        CellNumber = currentNum,
                        CellLeft = false,
                        CellRight = false,
                        CellUp = false,
                        CellDown = false
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
                            CellNumber = currentNum,
                            CellLeft = false,
                            CellRight = false,
                            CellUp = false,
                            CellDown = false
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
                            CellNumber = currentNum,
                            CellLeft = false,
                            CellRight = false,
                            CellUp = false,
                            CellDown = false
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
