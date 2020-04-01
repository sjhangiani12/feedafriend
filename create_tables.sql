drop table if exists donations;
create table donations (
	tid uuid primary key,                       
	uid	uuid references recipients,                       
	amount_donated integer,                    
	doner_email varchar(254),          
	doner_first_name varchar(30),          
	doner_last_name varchar(30),          
	donation_timestamp TIMESTAMP WITHOUT TIME zone,
	doner_email_sent boolean default false,
	recipient_email_sent boolean default false
);

drop table if exists recipients;
CREATE TABLE recipients (
    uid uuid NOT NULL,
    email character varying(254) NOT NULL,
    first_name character varying(30),
    last_name character varying(30),
    bio text,
    zip_code character varying(5),
    date_created timestamp without time zone,
    num_donations integer DEFAULT 0,
    total_recieved integer DEFAULT 0
);
