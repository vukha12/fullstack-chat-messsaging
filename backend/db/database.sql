CREATE TABLE IF NOT EXISTS users(
    id serial primary key,
    user_name varchar(50) not null,
    user_email varchar(100) not null unique,
    user_password varchar(255) not null,

    user_full_name varchar(50) not null,
    user_avatar varchar(255) not null,

    user_online boolean not null default false,
    user_last_seen timestamp,
    
    user_created_at timestamp default current_timestamp,
    user_updated_at timestamp default current_timestamp,
)