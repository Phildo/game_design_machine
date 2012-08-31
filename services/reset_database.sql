/*
CREATE THE DATABASE
*/
/* 
CREATE DATABSE design_a_game; 
USE design_a_game;
*/

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
CREATE TABLE machine_categories (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, m_id INT(32) UNSIGNED, c_id INT(32) UNSIGNED);
CREATE INDEX find_category ON machine_categories(m_id);

DROP TABLE IF EXISTS machine_options;
CREATE TABLE machine_options (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, m_id INT(32) UNSIGNED, c_id INT(32) UNSIGNED, o_id INT(32) UNSIGNED);
CREATE INDEX find_option ON machine_options(m_id, c_id);

DROP TABLE IF EXISTS icons;
CREATE TABLE icons (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, link_type ENUM('CATEGORY','OPTION'), link_id INT(32) UNSIGNED, icon VARCHAR(64), use_count INT(32) UNSIGNED DEFAULT 0);
CREATE INDEX find_icon ON icons(link_type, link_id);

/*
CREATE DEFAULT MACHINE
*/
INSERT INTO machines (url, pass) VALUES ('','');
INSERT INTO categories (name) VALUES ('cat_1'); /* ID- 1 */
INSERT INTO categories (name) VALUES ('cat_2'); /* ID- 2 */
INSERT INTO categories (name) VALUES ('cat_3'); /* ID- 3 */
INSERT INTO categories (name) VALUES ('cat_4'); /* ID- 4 */
INSERT INTO categories (name) VALUES ('cat_5'); /* ID- 5 */
INSERT INTO options (category, name) VALUES (1, 'opt_1'); /* ID- 1 */
INSERT INTO options (category, name) VALUES (1, 'opt_2'); /* ID- 2 */
INSERT INTO options (category, name) VALUES (1, 'opt_3'); /* ID- 3 */
INSERT INTO options (category, name) VALUES (1, 'opt_4'); /* ID- 4 */
INSERT INTO options (category, name) VALUES (1, 'opt_5'); /* ID- 5 */
INSERT INTO options (category, name) VALUES (2, 'opt_1'); /* ID- 6 */
INSERT INTO options (category, name) VALUES (2, 'opt_2'); /* ID- 7 */
INSERT INTO options (category, name) VALUES (2, 'opt_3'); /* ID- 8 */
INSERT INTO options (category, name) VALUES (2, 'opt_4'); /* ID- 9 */
INSERT INTO options (category, name) VALUES (2, 'opt_5'); /* ID- 10 */
INSERT INTO options (category, name) VALUES (3, 'opt_1'); /* ID- 11 */
INSERT INTO options (category, name) VALUES (3, 'opt_2'); /* ID- 12 */
INSERT INTO options (category, name) VALUES (3, 'opt_3'); /* ID- 13 */
INSERT INTO options (category, name) VALUES (3, 'opt_4'); /* ID- 14 */
INSERT INTO options (category, name) VALUES (3, 'opt_5'); /* ID- 15 */
INSERT INTO options (category, name) VALUES (4, 'opt_1'); /* ID- 16 */
INSERT INTO options (category, name) VALUES (4, 'opt_2'); /* ID- 17 */
INSERT INTO options (category, name) VALUES (4, 'opt_3'); /* ID- 18 */
INSERT INTO options (category, name) VALUES (4, 'opt_4'); /* ID- 19 */
INSERT INTO options (category, name) VALUES (4, 'opt_5'); /* ID- 20 */
INSERT INTO options (category, name) VALUES (5, 'opt_1'); /* ID- 21 */
INSERT INTO options (category, name) VALUES (5, 'opt_2'); /* ID- 22 */
INSERT INTO options (category, name) VALUES (5, 'opt_3'); /* ID- 23 */
INSERT INTO options (category, name) VALUES (5, 'opt_4'); /* ID- 24 */
INSERT INTO options (category, name) VALUES (5, 'opt_5'); /* ID- 25 */
INSERT INTO machine_categories (m_id, c_id) VALUES (1, 1); /* ID- 1 */
INSERT INTO machine_categories (m_id, c_id) VALUES (1, 2); /* ID- 2 */
INSERT INTO machine_categories (m_id, c_id) VALUES (1, 3); /* ID- 3 */
INSERT INTO machine_categories (m_id, c_id) VALUES (1, 4); /* ID- 4 */
INSERT INTO machine_categories (m_id, c_id) VALUES (1, 5); /* ID- 5 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 1, 1); /* ID- 1 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 1, 2); /* ID- 2 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 1, 3); /* ID- 3 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 1, 4); /* ID- 4 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 1, 5); /* ID- 5 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 2, 6); /* ID- 6 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 2, 7); /* ID- 7 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 2, 8); /* ID- 8 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 2, 9); /* ID- 9 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 2, 10); /* ID- 10 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 3, 11); /* ID- 11 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 3, 12); /* ID- 12 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 3, 13); /* ID- 13 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 3, 14); /* ID- 14 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 3, 15); /* ID- 15 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 4, 16); /* ID- 16 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 4, 17); /* ID- 17 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 4, 18); /* ID- 18 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 4, 19); /* ID- 19 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 4, 20); /* ID- 20 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 5, 21); /* ID- 21 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 5, 22); /* ID- 22 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 5, 23); /* ID- 23 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 5, 24); /* ID- 24 */
INSERT INTO machine_options (m_id, c_id, o_id) VALUES (1, 5, 25); /* ID- 25 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('CATEGORY', 1, 'default_category.png'); /* ID- 1 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('CATEGORY', 2, 'default_category.png'); /* ID- 2 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('CATEGORY', 3, 'default_category.png'); /* ID- 3 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('CATEGORY', 4, 'default_category.png'); /* ID- 4 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('CATEGORY', 5, 'default_category.png'); /* ID- 5 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 1, 'default_option.png'); /* ID- 6 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 2, 'default_option.png'); /* ID- 7 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 3, 'default_option.png'); /* ID- 8 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 4, 'default_option.png'); /* ID- 9 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 5, 'default_option.png'); /* ID- 10 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 6, 'default_option.png'); /* ID- 11 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 7, 'default_option.png'); /* ID- 12 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 8, 'default_option.png'); /* ID- 13 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 9, 'default_option.png'); /* ID- 14 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 10, 'default_option.png'); /* ID- 15 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 11, 'default_option.png'); /* ID- 16 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 12, 'default_option.png'); /* ID- 17 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 13, 'default_option.png'); /* ID- 18 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 14, 'default_option.png'); /* ID- 19 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 15, 'default_option.png'); /* ID- 20 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 16, 'default_option.png'); /* ID- 21 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 17, 'default_option.png'); /* ID- 22 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 18, 'default_option.png'); /* ID- 23 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 19, 'default_option.png'); /* ID- 24 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 20, 'default_option.png'); /* ID- 25 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 21, 'default_option.png'); /* ID- 26 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 22, 'default_option.png'); /* ID- 27 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 23, 'default_option.png'); /* ID- 28 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 24, 'default_option.png'); /* ID- 29 */
INSERT INTO icons (link_type, link_id, icon) VALUES ('OPTION', 25, 'default_option.png'); /* ID- 30 */
