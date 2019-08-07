const trike = require("trike");

module.exports = async db =>
	await trike(() =>
		db.query(`
		create table if not exists bwmssites
		(
			id bigserial not null,
			name varchar(255),
			contact jsonb,
			created_at timestamp default now() not null
		);`));
