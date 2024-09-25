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
        public IActionResult GetCyclic(string rows, string columns)
        {
            if (!int.TryParse(rows, out int rowNumber) || !int.TryParse(columns, out int columnNumber))
            {
                return Ok(new { message = "Rows and columns must be valid numbers!" });
            }
            if ((rowNumber <= 0 || rowNumber > 10) || (columnNumber <= 0 || columnNumber > 10))
            {
                return Ok(new { message = "Whoops! Rows and columns should be between 1 and 10!" });
            }

            var matrix = CreateCyclic(rowNumber, columnNumber);

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

                    if (i > leftColumn && i < rightColumn)
                    {
                        table[bottomRow, i].CellLeft = true;
                        table[bottomRow, i].CellRight = true;
                    }
                    else if (i == leftColumn)
                    {
                        table[bottomRow, i].CellUp = true;
                        table[bottomRow, i].CellRight = true;
                    }
                    else if (i == rightColumn)
                    {
                        table[bottomRow, i].CellRight = true;
                        table[bottomRow, i].CellLeft = true;
                    }

                    if (currentNum == 1)
                    {
                        table[bottomRow, i].CellLeft = false;
                        table[bottomRow, i].CellRight = false;
                        table[bottomRow, i].CellUp = false;
                        table[bottomRow, i].CellDown = false;
                        table[bottomRow, i].CellBgColor = "#808080";
                    }
                    if (currentNum == rows * columns)
                    {
                        table[bottomRow, i].CellUp = false;
                        table[bottomRow, i].CellDown = false;
                        table[bottomRow, i].CellLeft = false;
                        table[bottomRow, i].CellRight = true;
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

                    if (i > topRow && i < bottomRow)
                    {
                        table[i, leftColumn].CellUp = true;
                        table[i, leftColumn].CellDown = true;
                    }
                    else if (i == topRow)
                    {
                        table[i, leftColumn].CellDown = true;
                        table[i, leftColumn].CellRight = true;
                    }
                    else if (i == bottomRow)
                    {
                        table[i, leftColumn].CellUp = true;
                        table[i, leftColumn].CellDown = true;
                    }
                    if (currentNum == rows * columns)
                    {
                        table[i, leftColumn].CellUp = false;
                        table[i, leftColumn].CellDown = true;
                        table[i, leftColumn].CellLeft = false;
                        table[i, leftColumn].CellRight = false;
                    }
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
                            CellLeft = true,
                            CellRight = true,
                            CellUp = false,
                            CellDown = false
                        };

                        if (i == leftColumn)
                        {
                            table[topRow, i].CellRight = true;
                        }
                        if (i == rightColumn)
                        {
                            table[topRow, i].CellLeft = true;
                            table[topRow, i].CellDown = true;
                            table[topRow, i].CellRight = false;
                        }
                        if (currentNum == rows * columns)
                        {
                            table[topRow, i].CellUp = false;
                            table[topRow, i].CellDown = false;
                            table[topRow, i].CellLeft = true;
                            table[topRow, i].CellRight = false;
                        }
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
                            CellUp = true,
                            CellDown = true
                        };

                        if (i == topRow)
                        {
                            table[i, rightColumn].CellUp = true;
                        }

                        if (i == bottomRow)
                        {
                            table[i, rightColumn].CellDown = false;
                            table[i, rightColumn].CellLeft = true;
                        }

                        if (rightColumn == columns - 1)
                        {
                            table[i, rightColumn].CellRight = false;
                        }

                        if (rightColumn == 0)
                        {
                            table[i, rightColumn].CellLeft = false;
                        }

                        if (currentNum == rows * columns)
                        {
                            table[i, rightColumn].CellUp = true;
                            table[i, rightColumn].CellDown = false;
                            table[i, rightColumn].CellLeft = false;
                            table[i, rightColumn].CellRight = false;
                        }
                        currentNum++;
                    }
                    rightColumn--;
                }
            }
            return table;
        }
    }
}
