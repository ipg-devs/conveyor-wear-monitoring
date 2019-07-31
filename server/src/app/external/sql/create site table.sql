CREATE TABLE public.bwmssites (
	id bigserial NOT NULL,
	"name" varchar(255) NULL,
	contact jsonb NULL,
	created_at timestamp NOT NULL DEFAULT now()
);
