DROP TABLE IF EXISTS "account" CASCADE ;
DROP TABLE IF EXISTS "sector" CASCADE;
DROP TABLE IF EXISTS "account_sectors" CASCADE;
DROP INDEX IF EXISTS FK_18;
DROP INDEX IF EXISTS FK_21;

CREATE TABLE sector
(
    id      BIGSERIAL       NOT NULL PRIMARY KEY,
    name     text           NOT NULL,
    value    int            NOT NULL,
    parent_id int            NULL
);

CREATE TABLE account
(
    id                BIGSERIAL                NOT NULL PRIMARY KEY,
    name              text                     NOT NULL,
    date_added        timestamp with time zone NOT NULL,
    date_updated      timestamp with time zone NULL,
    agree_to_terms     boolean                 NOT NULL
);

CREATE TABLE account_sectors
(
    "id"            BIGSERIAL       NOT NULL PRIMARY KEY,
    account_id         BIGINT          NOT NULL,
    "sector_id"     BIGINT          NOT NULL,
    CONSTRAINT FK_16 FOREIGN KEY ( account_id ) REFERENCES "account" ( id ),
    CONSTRAINT FK_19 FOREIGN KEY ( sector_id ) REFERENCES sector ( id )
);

CREATE INDEX FK_18 ON account_sectors
    (
     account_id
        );

CREATE INDEX FK_21 ON account_sectors
    (
     sector_id
    );

