const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "perntodo",
  password: "eslam1pc2",
  port: 5432,
});

module.exports = pool;
