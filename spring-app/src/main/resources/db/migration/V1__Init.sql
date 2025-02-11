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
    file_access_token text          DEFAULT NULL,
    content_type      text          NOT NULL,
    created_at        timestamp     NOT NULL DEFAULT now(),
    encrypted         bool          NOT NULL,
    filename          text          NOT NULL,
    file_key          text          NOT NULL,
    file_password     text          DEFAULT NULL,
    file_size         bigint        NOT NULL,
    to_delete_at      timestamp     DEFAULT NULL,
    CONSTRAINT pk_file_entry PRIMARY KEY (id)
);
