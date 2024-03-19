import pkg from "pg";
const { Pool } = pkg;
export const pool = new Pool({
    host: "db",
    port: 5432,
    user: "user123",
    password: "password123",
    database: "db123",
});
//# sourceMappingURL=db.js.map