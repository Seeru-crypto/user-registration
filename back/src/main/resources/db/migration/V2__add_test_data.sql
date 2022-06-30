TRUNCATE "account" CASCADE;
TRUNCATE sector CASCADE;
TRUNCATE account_sectors CASCADE;
ALTER SEQUENCE account_id_seq RESTART WITH 1;
ALTER SEQUENCE sector_id_seq RESTART WITH 1;
ALTER SEQUENCE account_sectors_id_seq RESTART WITH 1;

INSERT INTO "account" (name, date_added, agree_to_terms)
VALUES ('account-1', '2022-05-08 12:46:58.668000 +00:00', true);

INSERT INTO "sector" (name, value, parent_id)
VALUES ('Machinery',10, 0),
       ('food', 20, 0),
       ('bakery', 21, 2),
       ('bisquits', 24, 3),
       ('Beverages', 22, 2);

insert into "account_sectors" (account_id, sector_id)
VALUES (1, 1)