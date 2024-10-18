using Microsoft.AspNetCore.Mvc;

namespace CSHARP_SocialMediaAPP.Controllers
{
    /// <summary>
    /// Represents the data structure of a cell in the cyclic matrix.
    /// Each cell has a number, potential connections to its neighboring cells (up, down, left, right), 
    /// and a background color.
    /// </summary>
    public class CellData
    {
        /// <summary>
        /// Gets or sets the number of the cell in the matrix.
        /// </summary>
        public int CellNumber { get; set; }

        /// <summary>
        /// Indicates whether the cell has an upward connection.
        /// </summary>
        public bool CellUp { get; set; }

        /// <summary>
        /// Indicates whether the cell has a downward connection.
        /// </summary>
        public bool CellDown { get; set; }

        /// <summary>
        /// Indicates whether the cell has a leftward connection.
        /// </summary>
        public bool CellLeft { get; set; }

        /// <summary>
        /// Indicates whether the cell has a rightward connection.
        /// </summary>
        public bool CellRight { get; set; }

        /// <summary>
        /// Gets or sets the background color of the cell.
        /// The background color is represented as a hex code. Default is <c>#333</c>.
        /// </summary>
        public string CellBgColor { get; set; } = "#333"; // Default background color
    }

    /// <summary>
    /// API Controller for creating and returning a cyclic matrix based on the provided rows and columns.
    /// A cyclic matrix follows a specific cyclic pattern where cells are connected to neighboring cells.
    /// </summary>
    [ApiController]
    [Route("api/v1/Cyclic")]
    public class CyclicController : ControllerBase
    {
        /// <summary>
        /// Generates a cyclic matrix based on the specified number of rows and columns.
        /// </summary>
        /// <param name="rows">The number of rows in the matrix (between 1 and 10).</param>
        /// <param name="columns">The number of columns in the matrix (between 1 and 10).</param>
        /// <returns>A JSON object containing the generated cyclic matrix or an error message.</returns>
        [HttpGet("{rows}/{columns}")]
        [ProducesResponseType(typeof(List<List<CellData>>), 200)]
        [ProducesResponseType(typeof(Dictionary<string, string>), 400)]
        public IActionResult GetCyclic(string rows, string columns)
        {
            // Validate input values for rows and columns
            if (!int.TryParse(rows, out int rowNumber) || !int.TryParse(columns, out int columnNumber))
            {
                return BadRequest(new { message = "Rows and columns must be valid numbers!" });
            }
            if ((rowNumber <= 0 || rowNumber > 10) || (columnNumber <= 0 || columnNumber > 10))
            {
                return BadRequest(new { message = "Whoops! Rows and columns should be between 1 and 10!" });
            }

            // Create the cyclic matrix
            var matrix = CreateCyclic(rowNumber, columnNumber);

            // Convert the matrix to a JSON-friendly format and return the result
            var result = ConvertToJson(matrix);
            return Ok(result);
        }

        /// <summary>
        /// Converts the two-dimensional matrix into a JSON-friendly list of lists.
        /// </summary>
        /// <param name="matrix">The two-dimensional array of CellData representing the cyclic matrix.</param>
        /// <returns>A list of lists of CellData, where each list represents a row in the matrix.</returns>
        private List<List<CellData>> ConvertToJson(CellData[,] matrix)
        {
            var result = new List<List<CellData>>();
            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                var row = new List<CellData>();
                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    row.Add(matrix[i, j]); // Add each cell to the row
                }
                result.Add(row); // Add the row to the result
            }
            return result;
        }

        /// <summary>
        /// Creates a cyclic matrix with the specified number of rows and columns.
        /// Each cell is assigned a unique number and directional connections to its neighbors.
        /// </summary>
        /// <param name="rows">The number of rows in the matrix.</param>
        /// <param name="columns">The number of columns in the matrix.</param>
        /// <returns>A two-dimensional array of CellData representing the cyclic matrix.</returns>
        private CellData[,] CreateCyclic(int rows, int columns)
        {
            CellData[,] table = new CellData[rows, columns]; // Initialize the matrix
            int bottomRow = rows - 1;
            int leftColumn = 0;
            int topRow = 0;
            int rightColumn = columns - 1;
            int currentNum = 1; // Start counting cells from 1

            // Continue filling the matrix while there are cells remaining
            for (int t = 0; currentNum <= rows * columns; t++)
            {
                // Fill the bottom row from right to left
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

                    // Set cell connections for intermediate cells
                    if (i > leftColumn && i < rightColumn)
                    {
                        table[bottomRow, i].CellLeft = true;
                        table[bottomRow, i].CellRight = true;
                    }
                    // Set cell connections for the leftmost and rightmost cells
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

                    // Special case for the first cell
                    if (currentNum == 1)
                    {
                        table[bottomRow, i].CellLeft = false;
                        table[bottomRow, i].CellRight = false;
                        table[bottomRow, i].CellUp = false;
                        table[bottomRow, i].CellDown = false;
                        table[bottomRow, i].CellBgColor = "#808080"; // First cell has a gray background
                    }

                    // Special case for the last cell
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

                // Fill the left column from bottom to top
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

                    // Set cell connections for intermediate cells
                    if (i > topRow && i < bottomRow)
                    {
                        table[i, leftColumn].CellUp = true;
                        table[i, leftColumn].CellDown = true;
                    }
                    // Set cell connections for the topmost and bottommost cells
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

                    // Special case for the last cell
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

                // Fill the top row from left to right
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

                        // Set cell connections for the leftmost and rightmost cells
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

                        // Special case for the last cell
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

                // Fill the right column from top to bottom
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

                        // Set cell connections for intermediate cells
                        if (i == topRow)
                        {
                            table[i, rightColumn].CellUp = true;
                        }

                        if (i == bottomRow)
                        {
                            table[i, rightColumn].CellDown = false;
                            table[i, rightColumn].CellLeft = true;
                        }

                        // Special case for the last cell
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
            return table; // Return the generated cyclic matrix
        }
    }
}
