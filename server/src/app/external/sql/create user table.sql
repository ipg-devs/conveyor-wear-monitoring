CREATE TABLE public.bwmsusers (
	username varchar(255) NULL,
	site_id jsonb NULL,
	id bigserial NOT NULL,
	"admin" bool NOT NULL DEFAULT false,
	email varchar(500) NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	password varchar(255) NULL,
	salt varchar(55) NULL
);
