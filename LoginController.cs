using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using BCrypt.Net;

namespace AnirudhApi.Controllers
{
    public class LoginController : Controller
    {
        private readonly string connectionString = "Data Source=localhost;Initial Catalog=ASIPL12425;Persist Security Info=True;User ID=sa;Password=sa;TrustServerCertificate=True;";

        [HttpPost]
        public async Task<ActionResult> Log([FromBody] LoginRequest model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest("Invalid request");
            }
            string sql = "SELECT Password FROM login WHERE Email = @Email";
            DataTable dt = GetData(sql, new SqlParameter("@Email", model.Email));
            if (dt.Rows.Count == 0)
            {
                return Unauthorized("Invalid email");
            }
            string storedHashedPassword = dt.Rows[0]["Password"].ToString(); // ✅ Hashed password from DB
            bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(model.Password, storedHashedPassword);
            if (!isPasswordCorrect)
            {
                return Unauthorized("Invalid password");
            }

            return Ok("Login Successful");
        }


        [HttpPost]
       
        public async Task<ActionResult> Regs([FromBody] LoginRequest model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password) || string.IsNullOrWhiteSpace(model.Name))
            {
                return BadRequest("Invalid input data");
            }

            // ✅ Hash password before storing it
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            string sql = @"INSERT INTO usr (usrName, Pass)VALUES (@Email, @Password)";

            var parameters = new Dictionary<string, object>
    {
        { "@Email", model.Email },
        { "@Password", hashedPassword } // ✅ Store the hashed password
    };

            int rowsAffected = ExecuteNonQuery(sql, parameters);
            return rowsAffected > 0 ? Ok("Registration successful") : BadRequest("Registration failed");
        }

        // Secure method to retrieve data with parameters
        private DataTable GetData(string query, params SqlParameter[] parameters)
        {
            DataTable dataTable = new DataTable();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    if (parameters != null)
                    {
                        command.Parameters.AddRange(parameters);
                    }
                    using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                    {
                        adapter.Fill(dataTable);
                    }
                }
            }
            return dataTable;
        }

        private int ExecuteNonQuery(string sql, Dictionary<string, object> parameters)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand(sql, connection))
                {
                    foreach (var param in parameters)
                    {
                        command.Parameters.AddWithValue(param.Key, param.Value);
                    }
                    try
                    {
                        return command.ExecuteNonQuery();
                    }
                    catch (Exception ex) { }
            return command.ExecuteNonQuery();
                }
            }
        }

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
            public string Name { get; set; }
        }
    }
}
