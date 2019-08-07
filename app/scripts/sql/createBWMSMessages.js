const trike = require("trike");

module.exports = async db =>
	await trike(() =>
		db.query(`
		create table if not exists bwmsmessages
    (
      id bigserial not null,
      message jsonb not null,
      timestamp timestamp default now() not null,
      site_id varchar(55) default 999 not null
    );`));
