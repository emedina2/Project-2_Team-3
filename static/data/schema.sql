-- Table: public.monthly_averages

-- DROP TABLE public.monthly_averages;

CREATE TABLE public.monthly_averages
(
    city character varying COLLATE pg_catalog."default",
    state character varying COLLATE pg_catalog."default",
    country character varying COLLATE pg_catalog."default",
    month integer,
    year integer,
    avg double precision,
    latitude character varying COLLATE pg_catalog."default",
    longitude character varying COLLATE pg_catalog."default",
    id integer NOT NULL DEFAULT nextval('monthly_averages_id_seq'::regclass),
    CONSTRAINT monthly_averages_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.monthly_averages
    OWNER to postgres;