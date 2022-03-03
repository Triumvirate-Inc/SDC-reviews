-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_characteristics` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'reviews'
--
-- ---

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_products` INTEGER NULL DEFAULT NULL,
  `rating` TINYINT NULL DEFAULT NULL,
  `summary` VARCHAR(60) NULL DEFAULT NULL,
  `recommend` BINARY(1) NULL DEFAULT NULL,
  `response` MEDIUMTEXT NULL DEFAULT NULL,
  `body` MEDIUMTEXT NULL DEFAULT NULL,
  `reviewer_name` VARCHAR(50) NULL DEFAULT NULL,
  `helpfulness` SMALLINT NULL DEFAULT NULL,
  `new field` INTEGER NULL DEFAULT NULL,
  `id_photos` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `url` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'photos_to_reviews'
--
-- ---

DROP TABLE IF EXISTS `photos_to_reviews`;

CREATE TABLE `photos_to_reviews` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_photos` INTEGER NULL DEFAULT NULL,
  `id_reviews` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'characteristics'
--
-- ---

DROP TABLE IF EXISTS `characteristics`;

CREATE TABLE `characteristics` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `characteristics` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `products` ADD FOREIGN KEY (id_characteristics) REFERENCES `characteristics` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (id_products) REFERENCES `products` (`id`);
ALTER TABLE `photos_to_reviews` ADD FOREIGN KEY (id_photos) REFERENCES `photos` (`id`);
ALTER TABLE `photos_to_reviews` ADD FOREIGN KEY (id_reviews) REFERENCES `reviews` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos_to_reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `products` (`id`,`id_characteristics`) VALUES
-- ('','');
-- INSERT INTO `reviews` (`id`,`id_products`,`rating`,`summary`,`recommend`,`response`,`body`,`reviewer_name`,`helpfulness`,`new field`,`id_photos`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `photos` (`id`,`url`) VALUES
-- ('','');
-- INSERT INTO `photos_to_reviews` (`id`,`id_photos`,`id_reviews`) VALUES
-- ('','','');
-- INSERT INTO `characteristics` (`id`,`characteristics`) VALUES
-- ('','');