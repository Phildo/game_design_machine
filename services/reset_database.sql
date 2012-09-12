/*
CREATE THE DATABASE
*/
/* 
CREATE DATABSE design_a_game; 
*/
USE design_a_game;

/*
CREATE THE TABLES
*/
DROP TABLE IF EXISTS machines;
CREATE TABLE machines (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, url VARCHAR(64), pass VARCHAR(64), created TIMESTAMP DEFAULT '0000-00-00 00:00:00', last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(64) DEFAULT '???', use_count INT(32) UNSIGNED DEFAULT 0);

DROP TABLE IF EXISTS options;
CREATE TABLE options (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, category INT(32) UNSIGNED NOT NULL, name VARCHAR(64) DEFAULT '???', use_count INT(32) UNSIGNED DEFAULT 0);

DROP TABLE IF EXISTS machine_categories;
CREATE TABLE machine_categories (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, m_id INT(32) UNSIGNED, c_id INT(32) UNSIGNED, i_id INT(32) UNSIGNED, sort INT(32) UNSIGNED);
CREATE INDEX find_category ON machine_categories(m_id);

DROP TABLE IF EXISTS machine_category_options;
CREATE TABLE machine_category_options (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, m_id INT(32) UNSIGNED, c_id INT(32) UNSIGNED, o_id INT(32) UNSIGNED, i_id INT(32) UNSIGNED, sort INT(32) UNSIGNED);
CREATE INDEX find_option ON machine_category_options(m_id, c_id);

DROP TABLE IF EXISTS icons;
CREATE TABLE icons (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, link_type ENUM('CATEGORY','OPTION'), link_id INT(32) UNSIGNED, icon VARCHAR(64), use_count INT(32) UNSIGNED DEFAULT 0);
CREATE INDEX find_icon ON icons(link_type, link_id);

/*
CREATE DEFAULT MACHINE
*/
INSERT INTO machines (url, pass) VALUES ('','');
INSERT INTO categories (name) VALUES ('who'); /* ID- 1 */
INSERT INTO categories (name) VALUES ('where'); /* ID- 2 */
INSERT INTO categories (name) VALUES ('what'); /* ID- 3 */
INSERT INTO options (category, name) VALUES (1, 'zombie'); /* ID- 1 */
INSERT INTO options (category, name) VALUES (1, 'vampire'); /* ID- 2 */
INSERT INTO options (category, name) VALUES (1, 'knight'); /* ID- 3 */
INSERT INTO options (category, name) VALUES (2, 'castle'); /* ID- 4 */
INSERT INTO options (category, name) VALUES (2, 'world'); /* ID- 5 */
INSERT INTO options (category, name) VALUES (2, 'space'); /* ID- 6 */
INSERT INTO options (category, name) VALUES (3, 'rescue'); /* ID- 7 */
INSERT INTO options (category, name) VALUES (3, 'domination'); /* ID- 8 */
INSERT INTO options (category, name) VALUES (3, 'war'); /* ID- 9 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('CATEGORY', 1, 'who_cat.png'); /* ID- 1 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('CATEGORY', 2, 'where_cat.png'); /* ID- 2 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('CATEGORY', 3, 'what_cat.png'); /* ID- 3 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 1, 'who_zombie_opt.png'); /* ID- 4 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 2, 'who_vampire_opt.png'); /* ID- 5 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 3, 'who_knight_opt.png'); /* ID- 6 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 4, 'where_castle_opt.png'); /* ID- 7 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 5, 'where_world_opt.png'); /* ID- 8 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 6, 'where_space_opt.png'); /* ID- 9 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 7, 'what_rescue_opt.png'); /* ID- 10 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 8, 'what_domination_opt.png'); /* ID- 11 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 9, 'what_war_opt.png'); /* ID- 12 */
INSERT INTO machine_categories (m_id, c_id, i_id, sort) VALUES (1, 1, 1, 0); /* ID- 1 */
INSERT INTO machine_categories (m_id, c_id, i_id, sort) VALUES (1, 2, 2, 1); /* ID- 2 */
INSERT INTO machine_categories (m_id, c_id, i_id, sort) VALUES (1, 3, 3, 2); /* ID- 3 */
INSERT INTO machine_category_options (m_id, c_id, o_id, i_id, sort) VALUES (1, 1, 1, 4, 0); /* ID- 1 */
INSERT INTO machine_category_options (m_id, c_id, o_id, i_id, sort) VALUES (1, 1, 2, 5, 1); /* ID- 2 */
INSERT INTO machine_category_options (m_id, c_id, o_id, i_id, sort) VALUES (1, 1, 3, 6, 2); /* ID- 3 */
INSERT INTO machine_category_options (m_id, c_id, o_id, i_id, sort) VALUES (1, 2, 4, 7, 0); /* ID- 4 */
INSERT INTO machine_category_options (m_id, c_id, o_id, i_id, sort) VALUES (1, 2, 5, 8, 1); /* ID- 5 */
INSERT INTO machine_category_options (m_id, c_id, o_id, i_id, sort) VALUES (1, 2, 6, 9, 2); /* ID- 6 */
INSERT INTO machine_category_options (m_id, c_id, o_id, i_id, sort) VALUES (1, 3, 7, 10, 0); /* ID- 7 */
INSERT INTO machine_category_options (m_id, c_id, o_id, i_id, sort) VALUES (1, 3, 8, 11, 1); /* ID- 8 */
INSERT INTO machine_category_options (m_id, c_id, o_id, i_id, sort) VALUES (1, 3, 9, 12, 2); /* ID- 9 */
