drop table if exists donations;
drop table if exists social_media_links;
drop table if exists user_uploads;
drop table if exists holding_table;
drop table if exists recipients;

CREATE TABLE recipients (
    uid uuid NOT null primary key,
    email character varying(254) NOT NULL,
    first_name character varying(30),
    last_name character varying(30),
    bio text,
    prof_pic bytea,
    zip_code character varying(5),
    date_created timestamp without time zone,
    num_donations integer DEFAULT 0,
    total_recieved integer DEFAULT 0,
    intro_email_sent boolean default false
);

create table donations (
	tid uuid primary key,                       
	uid	uuid references recipients,                       
	amount_donated integer,                    
	donor_email varchar(254),          
	donor_first_name varchar(30),          
	donor_last_name varchar(30),          
	donation_timestamp TIMESTAMP WITHOUT TIME zone,
	donor_email_sent int default 0,
	recipient_email_sent int default 0
);

create table social_media_links (
	uid uuid references recipients,
	link varchar(2000),
	site_name varchar(30)
);

create table user_uploads (
	uid uuid references recipients,
	upload bytea,
	upload_comment text
);

create table holding_table (
	uid uuid references recipients,
	entered_timestamp TIMESTAMP WITHOUT TIME zone
);

