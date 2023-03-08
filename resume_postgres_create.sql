--
-- PostgreSQL database dump
--

CREATE TABLE app_user (
userId serial NOT NULL UNIQUE,
name varchar NOT NULL,
location varchar NOT NULL,
linkedin varchar NOT NULL,
email varchar NOT NULL,
job_title varchar,
CONSTRAINT user_pk PRIMARY KEY (userId)
);

CREATE TABLE resume (
resumeId serial NOT NULL UNIQUE,
userId int NOT NULL,
title varchar NOT NULL,
posting_date timestamp default CURRENT_TIMESTAMP,
CONSTRAINT resume_pk PRIMARY KEY (resumeId)
);

CREATE TABLE component (
componentId serial NOT NULL UNIQUE,
userId int NOT NULL,
header varchar NOT NULL,
bullets varchar NOT NULL,
CONSTRAINT component_pk PRIMARY KEY (componentId)
);

CREATE TABLE grid (
gridId serial NOT NULL UNIQUE,
resumeId int NOT NULL,
componentId int NOT NULL,
x_coordinate int NOT NULL DEFAULT 0,
y_coordinate int NOT NULL DEFAULT 0,
CONSTRAINT grid_pk PRIMARY KEY (gridId)
);

ALTER TABLE resume ADD CONSTRAINT fk_resume_user FOREIGN KEY(userId) REFERENCES app_user(userId);
ALTER TABLE component ADD CONSTRAINT fk_component_user FOREIGN KEY(userId) REFERENCES app_user(userId);
ALTER TABLE grid ADD CONSTRAINT fk_grid_resume FOREIGN KEY(resumeId) REFERENCES resume(resumeId);
ALTER TABLE grid ADD CONSTRAINT fk_grid_component FOREIGN KEY(componentId) REFERENCES component(componentId);

INSERT INTO app_user (name, location, linkedin, email) VALUES ('George', 'London', 'LinkedIn.com/george', 'george@gmail.com');
INSERT INTO app_user (name, location, linkedin, email) VALUES ('Jerry', 'Paris', 'LinkedIn.com/jerry', 'jerry@gmail.com');

INSERT INTO resume (userId) VALUES (1);
INSERT INTO resume (userId) VALUES (2);

INSERT INTO component (userId, header, bullets) VALUES (1, 'cool header', 'sweet bullets');
INSERT INTO component  (userId, header, bullets) VALUES (1, 'nice header', 'dope bullets');
INSERT INTO component (userId, header, bullets) VALUES (2, 'another header', 'more bullets');
INSERT INTO component  (userId, header, bullets) VALUES (2, 'real header', 'real bullets');

INSERT INTO grid (resumeId, componentId, x_coordinate, y_coordinate) VALUES (1, 1, 1, 1);
INSERT INTO grid (resumeId, componentId, x_coordinate, y_coordinate) VALUES (1, 2, 2, 2);
INSERT INTO grid (resumeId, componentId, x_coordinate, y_coordinate) VALUES (2, 3, 1, 1);
INSERT INTO grid (resumeId, componentId, x_coordinate, y_coordinate) VALUES (2, 4, 2, 2);
