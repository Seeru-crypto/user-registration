CREATE  TABLE account (
                                   id                   bigserial  NOT NULL  ,
                                   first_name           varchar(100)  NOT NULL  ,
                                   last_name            varchar(100)  NOT NULL  ,
                                   age                  integer  NOT NULL  ,
                                   phone_number         varchar(100)  NOT NULL  ,
                                   email_aadress        varchar(100)    ,
                                   date_added           timestamp  NOT NULL  ,
                                   date_updated         timestamp    ,
                                   agree_to_terms       boolean  NOT NULL  ,
                                   seat_number          varchar(100)    ,
                                   food_preferance      varchar(100)    ,
                                   allergy_preferance   varchar(100)    ,
                                   CONSTRAINT pk_account PRIMARY KEY ( id )
);

CREATE  TABLE sector (
                                  id                   bigserial  NOT NULL  ,
                                  name                 text  NOT NULL  ,
                                  "value"              varchar  NOT NULL  ,
                                  parent_id            bigint    ,
                                  CONSTRAINT pk_sector PRIMARY KEY ( id )
);

CREATE  TABLE account_sectors (
                                           id                   bigserial  NOT NULL  ,
                                           account_id           bigint  NOT NULL  ,
                                           sector_id            bigint  NOT NULL  ,
                                           CONSTRAINT pk_account_sectors PRIMARY KEY ( id )
);

CREATE INDEX "FK_18" ON account_sectors  ( account_id );

CREATE INDEX "FK_21" ON account_sectors  ( sector_id );

ALTER TABLE account_sectors ADD CONSTRAINT account_has_sectors FOREIGN KEY ( account_id ) REFERENCES account( id );

ALTER TABLE account_sectors ADD CONSTRAINT sectors_have_accounts FOREIGN KEY ( sector_id ) REFERENCES sector( id );

