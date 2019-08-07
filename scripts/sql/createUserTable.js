const trike = require("trike");

module.exports = async db =>
  await trike(() =>
    db.query(`
	create table if not exists bwmsusers
	(
		username varchar(255),
		admin boolean default false not null,
		email varchar(500) not null,
		created_at timestamp default now() not null,
		salt varchar(55),
		password varchar(255),
		id bigserial not null,
		site_id text[]
	);`));
