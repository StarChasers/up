CREATE TABLE configuration_entry
(
    id                  bigserial   NOT NULL,
    configuration_key   text        NOT NULL,
    configuration_value text        NOT NULL,
    CONSTRAINT pk_configuration_entry PRIMARY KEY (id)
);

CREATE TABLE file_entry
(
    id                bigserial     NOT NULL,
    owner_id          bigint        DEFAULT NULL,
    file_access_token text          DEFAULT NULL,
    content_type      text          NOT NULL,
    created_date      timestamp     NOT NULL,
    encrypted         bool          NOT NULL,
    filename          text          NOT NULL,
    file_key          text          NOT NULL,
    file_password     text          DEFAULT NULL,
    permanent         bool          NOT NULL,
    file_size         bigint        DEFAULT NULL,
    to_delete_date    timestamp     DEFAULT NULL,
    CONSTRAINT pk_file_entry PRIMARY KEY (id)
);

CREATE TABLE refresh_token
(
    id              bigint          NOT NULL,
    creation_date   timestamp       NOT NULL,
    expiration_date timestamp       NOT NULL,
    refresh_token   text            NOT NULL,
    user_id         bigint          DEFAULT NULL,
    CONSTRAINT pk_refresh_token PRIMARY KEY (id)
);

CREATE TABLE application_user
(
    id                      bigserial   NOT NULL,
    default_file_lifetime   bigint      DEFAULT NULL,
    email                   text        DEFAULT NULL,
    max_file_lifetime       bigint      DEFAULT NULL,
    max_permanent_file_size bigint      DEFAULT NULL,
    max_temporary_file_size bigint      DEFAULT NULL,
    password                text        NOT NULL,
    role                    text        NOT NULL,
    username                text        NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

ALTER TABLE refresh_token
    ADD CONSTRAINT fk_user__refresh_token FOREIGN KEY (user_id) REFERENCES application_user (id);

ALTER TABLE file_entry
    ADD CONSTRAINT fk_user__file_entry FOREIGN KEY (owner_id) REFERENCES application_user (id);

