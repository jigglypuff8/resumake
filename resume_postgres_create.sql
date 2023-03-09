--
-- PostgreSQL database dump
--

CREATE TABLE app_user (
user_id serial NOT NULL UNIQUE,
name varchar NOT NULL,
location varchar NOT NULL,
linkedin varchar NOT NULL,
email varchar NOT NULL,
job_title varchar,
CONSTRAINT user_pk PRIMARY KEY (user_id)
);

CREATE TABLE resume (
resume_id serial NOT NULL UNIQUE,
title varchar,
user_id int NOT NULL,
last_modified timestamp default CURRENT_TIMESTAMP,
CONSTRAINT resume_pk PRIMARY KEY (resume_id)
);

CREATE TABLE component (
component_id serial NOT NULL UNIQUE,
user_id int NOT NULL,
header varchar NOT NULL,
bullets varchar NOT NULL,
CONSTRAINT component_pk PRIMARY KEY (component_id)
);

CREATE TABLE grid (
grid_id serial NOT NULL UNIQUE,
resume_id int NOT NULL,
component_id int NOT NULL,
x_coordinate int NOT NULL DEFAULT 0,
y_coordinate int NOT NULL DEFAULT 0,
CONSTRAINT grid_pk PRIMARY KEY (grid_id)
);

ALTER TABLE resume ADD CONSTRAINT fk_resume_user FOREIGN KEY(user_id) REFERENCES app_user(user_id);
ALTER TABLE component ADD CONSTRAINT fk_component_user FOREIGN KEY(user_id) REFERENCES app_user(user_id);
ALTER TABLE grid ADD CONSTRAINT fk_grid_resume FOREIGN KEY(resume_id) REFERENCES resume(resume_id);
ALTER TABLE grid ADD CONSTRAINT fk_grid_component FOREIGN KEY(component_id) REFERENCES component(component_id);

INSERT INTO app_user (name, location, linkedin, email) VALUES ('George', 'London', 'LinkedIn.com/george', 'george@gmail.com');
INSERT INTO app_user (name, location, linkedin, email) VALUES ('Jerry', 'Paris', 'LinkedIn.com/jerry', 'jerry@gmail.com');

INSERT INTO resume (user_id) VALUES (1);
INSERT INTO resume (user_id) VALUES (2);
INSERT INTO resume (user_id) VALUES (1);
INSERT INTO resume (user_id) VALUES (1);

INSERT INTO component (user_id, header, bullets) VALUES (1, 'cool header', 'sweet bullets');
INSERT INTO component  (user_id, header, bullets) VALUES (1, 'nice header', 'dope bullets');
INSERT INTO component (user_id, header, bullets) VALUES (2, 'another header', 'more bullets');
INSERT INTO component  (user_id, header, bullets) VALUES (2, 'real header', 'real bullets');

INSERT INTO grid (resume_id, component_id, x_coordinate, y_coordinate) VALUES (1, 1, 1, 1);
INSERT INTO grid (resume_id, component_id, x_coordinate, y_coordinate) VALUES (1, 2, 2, 2);
INSERT INTO grid (resume_id, component_id, x_coordinate, y_coordinate) VALUES (2, 3, 1, 1);
INSERT INTO grid (resume_id, component_id, x_coordinate, y_coordinate) VALUES (2, 4, 2, 2);
INSERT INTO grid (resume_id, component_id, x_coordinate, y_coordinate) VALUES (3, 1, 1, 1);
INSERT INTO grid (resume_id, component_id, x_coordinate, y_coordinate) VALUES (4, 1, 1, 1);
