
create table users(
                      id serial primary key,
                      name text unique,
                      password text not null
);

create table waves(
                      id serial primary key,
                      contents varchar not null,
                      user_id integer not null,
                      created_at timestamptz not null,
                      constraint fk_waves foreign key(user_id) references users(id) on delete cascade
);

create table likes (
                       user_id integer,
                       wave_id integer,
                       constraint pk_likes primary key(user_id, wave_id),
                       constraint fk_likes_u foreign key(user_id) references users(id) on delete cascade,
                       constraint fk_likes_w foreign key(wave_id) references waves(id) on delete cascade
);
