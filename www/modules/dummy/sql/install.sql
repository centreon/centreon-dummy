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

INSERT INTO `mod_dummy_objects` (`name`, `description`) VALUES
('object1', 'description of object 1'),
('object2', 'description of object 2'),
('object3', 'description of object 3'),
('object4', 'description of object 4'),
('object5', 'description of object 5'),
('object6', 'description of object 6'),
('object7', 'description of object 7'),
('object8', 'description of object 8'),
('object9', 'description of object 9'),
('object10', 'description of object 10');
