create table payments
(
  id serial primary key not null,
  contract_id integer not null,
  "description" text not null,
  "value" float not null,
  "time" timestamptz not null DEFAULT NOW(),
  is_imported boolean not null Default False,
  created_at timestamptz not null DEFAULT NOW(),
  updated_at timestamptz not null DEFAULT NOW(),
  is_deleted boolean not null DEFAULT False
);
