/*
CREATE THE DATABASE
*/
/*
CREATE DATABASE game_design_machine; 
*/
USE game_design_machine;

/*
CREATE THE TABLES
*/
DROP TABLE IF EXISTS machines;
CREATE TABLE machines (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, m_key VARCHAR(64), pass VARCHAR(64), created TIMESTAMP DEFAULT '0000-00-00 00:00:00', last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(64) DEFAULT '???', use_count INT(32) UNSIGNED DEFAULT 0);

DROP TABLE IF EXISTS options;
CREATE TABLE options (id INT(32) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, c_id INT(32) UNSIGNED NOT NULL, name VARCHAR(64) DEFAULT '???', use_count INT(32) UNSIGNED DEFAULT 0);

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
INSERT INTO machines (m_key, pass) VALUES ('','');
INSERT INTO categories (name, use_count) VALUES ('who', 1); /* ID- 1 */
INSERT INTO categories (name, use_count) VALUES ('where', 1); /* ID- 2 */
INSERT INTO categories (name, use_count) VALUES ('what', 1); /* ID- 3 */
INSERT INTO options (c_id, name, use_count) VALUES (1, 'zombie', 1); /* ID- 1 */
INSERT INTO options (c_id, name, use_count) VALUES (1, 'vampire', 1); /* ID- 2 */
INSERT INTO options (c_id, name, use_count) VALUES (1, 'knight', 1); /* ID- 3 */
INSERT INTO options (c_id, name, use_count) VALUES (2, 'castle', 1); /* ID- 4 */
INSERT INTO options (c_id, name, use_count) VALUES (2, 'world', 1); /* ID- 5 */
INSERT INTO options (c_id, name, use_count) VALUES (2, 'space', 1); /* ID- 6 */
INSERT INTO options (c_id, name, use_count) VALUES (3, 'rescue', 1); /* ID- 7 */
INSERT INTO options (c_id, name, use_count) VALUES (3, 'domination', 1); /* ID- 8 */
INSERT INTO options (c_id, name, use_count) VALUES (3, 'war', 1); /* ID- 9 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('CATEGORY', 1, 'who_cat.png', 1); /* ID- 1 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('CATEGORY', 2, 'where_cat.png', 1); /* ID- 2 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('CATEGORY', 3, 'what_cat.png', 1); /* ID- 3 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('OPTION', 1, 'who_zombie_opt.png', 1); /* ID- 4 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('OPTION', 2, 'who_vampire_opt.png', 1); /* ID- 5 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('OPTION', 3, 'who_knight_opt.png', 1); /* ID- 6 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('OPTION', 4, 'where_castle_opt.png', 1); /* ID- 7 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('OPTION', 5, 'where_world_opt.png', 1); /* ID- 8 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('OPTION', 6, 'where_space_opt.png', 1); /* ID- 9 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('OPTION', 7, 'what_rescue_opt.png', 1); /* ID- 10 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('OPTION', 8, 'what_domination_opt.png', 1); /* ID- 11 */
INSERT INTO icons (link_type, link_id, icon, use_count) VALUES ('OPTION', 9, 'what_war_opt.png', 1); /* ID- 12 */
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
