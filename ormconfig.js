import dotenv from 'dotenv'
dotenv.config()

module.exports = {
	type: "postgres",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10) || 5436,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.NODE_ENV === 'test' ? 'ntsencomendas_test' : process.env.POSTGRES_DB,
	migrations: ["src/database/migrations/**/*.ts"],
	cli: {
		migrationsDir: "src/database/migrations"
	},
	migrationsRun: true,
	logging: true,
  entities: ["src/models/**/*.ts"],
  logging: false
}