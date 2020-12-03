-- Write raw SQL queries here.

--
-- insert page route
--

INSERT INTO `topology` (`topology_name`, `topology_parent`, `topology_page`, `topology_order`, `topology_group`, `topology_url`, `topology_url_opt`, `is_react`)
VALUES ('Dummy Menu Entry', '1', '111', '10', '1', '/home/dummy', NULL, '1');


--
-- create tables
--

CREATE TABLE IF NOT EXISTS `mod_dummy_objects` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `name` varchar(254) DEFAULT NULL,
   `description` varchar(1024) DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

INSERT INTO `mod_dummy_objects` (`name`, `description`)
VALUES ('object1', 'description of object 1');
