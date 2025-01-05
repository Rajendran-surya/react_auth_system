-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for registration
CREATE DATABASE IF NOT EXISTS `registration` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `registration`;

-- Dumping structure for table registration.child_components
CREATE TABLE IF NOT EXISTS `child_components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `parent_component_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table registration.child_components: ~3 rows (approximately)
INSERT INTO `child_components` (`id`, `type`, `title`, `icon`, `url`, `parent_component_id`) VALUES
	(1, 'item', 'Reset Password', 'feather icon-chevron-right', '/basic/reset_password', 2),
	(2, 'item', 'change Password', 'feather icon-chevron-right', '/basic/change_password', 2),
	(3, 'item', 'Modify user', 'feather icon-chevron-right', '/basic/modifyuser', 2);

-- Dumping structure for table registration.favorites
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `url` varchar(1024) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table registration.favorites: ~0 rows (approximately)

-- Dumping structure for table registration.favorites_add
CREATE TABLE IF NOT EXISTS `favorites_add` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `url` varchar(1024) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `icon` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table registration.favorites_add: ~2 rows (approximately)
INSERT INTO `favorites_add` (`id`, `username`, `password`, `url`, `title`, `created_at`, `icon`) VALUES
	(55, 'surya', 'Sur@123', '/basic/add', 'Finfolab Technologies', '2024-04-15 11:38:35', ''),
	(83, 'Surya', 'Sur@123', '/basic/viewmapping', 'Finfolab Technologies', '2024-05-06 04:55:40', '');

-- Dumping structure for table registration.parent_components
CREATE TABLE IF NOT EXISTS `parent_components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table registration.parent_components: ~4 rows (approximately)
INSERT INTO `parent_components` (`id`, `type`, `title`, `icon`, `url`) VALUES
	(1, 'group', 'Dashboard', 'feather icon-home', '/app/dashboard/default'),
	(2, 'group', 'Features', 'feather icon-pie-chart', '/basic'),
	(3, 'group', 'Role Definition', 'feather icon-file-text', '/role'),
	(4, 'group', 'User Definition', 'feather icon-lock', '/user');

-- Dumping structure for table registration.process_dtls
CREATE TABLE IF NOT EXISTS `process_dtls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `business_units` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_dt` date DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table registration.process_dtls: ~1 rows (approximately)
INSERT INTO `process_dtls` (`id`, `business_units`, `username`, `pass`, `role`, `created_dt`, `url`) VALUES
	(1, 'Administration', 'surya', 'Sur@123', 'user', '2024-05-10', '/app/dashboard/default');

-- Dumping structure for table registration.recently_visited
CREATE TABLE IF NOT EXISTS `recently_visited` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=541 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table registration.recently_visited: ~19 rows (approximately)
INSERT INTO `recently_visited` (`id`, `username`, `password`, `url`, `title`, `created`) VALUES
	(495, 'surya', 'Sur@123', '/basic/create_process', 'Finfolab Technologies', '2025-01-05 08:29:25'),
	(496, 'surya', 'Sur@123', '/basic', 'Finfolab Technologies', '2025-01-05 08:27:25'),
	(501, 'surya', 'Sur@123', '/app/dashboard/default', 'Finfolab Technologies', '2025-01-05 08:27:16'),
	(505, 'Surya', 'Sur@123', '/app/process/default', 'Finfolab Technologies', '2025-01-05 08:30:18'),
	(511, 'Surya', 'Sur@123', '/Login', 'Authentication system', '2025-01-05 09:28:34'),
	(515, 'surya', 'Sur@123', '/basic/view_process', 'Finfolab Technologies', '2024-05-10 12:19:35'),
	(516, 'surya', 'Sur@123', '/basic/button', 'Finfolab Technologies', '2024-05-10 12:19:37'),
	(517, 'surya', 'Sur@123', '/auth/reset-password-1', 'Authentication system', '2025-01-05 09:25:15'),
	(518, 'surya', 'sur@123', '/role', 'Finfolab Technologies', '2025-01-05 08:27:23'),
	(519, 'surya', 'sur@123', '/app/basic/create_process', 'Finfolab Technologies', '2025-01-05 08:29:40'),
	(520, 'admin', 'admin', '/app/basic/create_process', 'Authentication system', '2025-01-05 09:37:23'),
	(521, 'admin', 'admin', '/Login', 'Authentication system', '2025-01-05 10:04:06'),
	(522, 'auth', 'auth', '/app/basic/create_process', 'Authentication system', '2025-01-05 10:04:19'),
	(523, 'auth', 'auth', '/app/dashboard/default', 'Finfolab Technologies', '2025-01-05 08:38:07'),
	(524, 'auth', 'auth', '/Login', 'Authentication system', '2025-01-05 10:06:02'),
	(525, 'user', 'user', '/app/basic/create_process', 'Authentication system', '2025-01-05 10:06:10'),
	(526, 'user', 'user', '/app/dashboard/default', 'Finfolab Technologies', '2025-01-05 09:03:17'),
	(527, 'user', 'user', '/basic', 'Authentication system', '2025-01-05 10:06:13'),
	(528, 'user', 'user', '/basic/create_process', 'Finfolab Technologies', '2025-01-05 08:45:25'),
	(529, 'user', 'user', '/Login', 'Authentication system', '2025-01-05 09:37:10'),
	(530, 'auth', 'auth', '/basic', 'Authentication system', '2025-01-05 10:04:25'),
	(531, 'user ', 'user', '/basic/change_password', 'Finfolab Technologies', '2025-01-05 09:03:14'),
	(532, 'auth', 'auth', '/basic/modifyuser', 'Authentication system', '2025-01-05 10:04:31'),
	(533, 'auth', 'auth', '/Login/getAllUserRoles', 'Finfolab Technologies', '2025-01-05 09:24:15'),
	(534, 'auth', 'auth', '/recently_visited', 'Finfolab Technologies', '2025-01-05 09:24:22'),
	(535, 'admin', 'admin', '/basic', 'Authentication system', '2025-01-05 09:57:56'),
	(536, 'admin', 'admin', '/basic/modifyuser', 'Authentication system', '2025-01-05 09:57:54'),
	(537, 'admin', 'admin', '/app/dashboard/default', 'Authentication system', '2025-01-05 09:43:06'),
	(538, 'admin', 'admin', '/basic/reset_password', 'Authentication system', '2025-01-05 09:57:47'),
	(539, 'admin', 'admin', '/basic/change_password', 'Authentication system', '2025-01-05 10:04:03'),
	(540, 'user', 'user', '/basic/reset_password', 'Authentication system', '2025-01-05 10:06:17');

-- Dumping structure for table registration.role_component_mapping
CREATE TABLE IF NOT EXISTS `role_component_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_component_id` int(11) DEFAULT NULL,
  `child_component_id` int(11) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table registration.role_component_mapping: ~8 rows (approximately)
INSERT INTO `role_component_mapping` (`id`, `parent_component_id`, `child_component_id`, `user_role`) VALUES
	(1, 1, NULL, 'admin'),
	(2, 2, 1, 'admin'),
	(3, 2, 2, 'admin'),
	(4, 2, 3, 'admin'),
	(5, 1, NULL, 'user'),
	(6, 2, 1, 'user'),
	(7, 2, 2, 'auth'),
	(8, 1, NULL, 'auth');

-- Dumping structure for table registration.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table registration.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
	(1, 'surya', 'senthamilansurya@gmail.com', 'Sur@123');

-- Dumping structure for table registration.user_details
CREATE TABLE IF NOT EXISTS `user_details` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_role` enum('user','admin','auth') NOT NULL DEFAULT 'user',
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table registration.user_details: ~3 rows (approximately)
INSERT INTO `user_details` (`user_id`, `username`, `password`, `user_role`, `email`) VALUES
	(1, 'user', 'user', 'user', 'user@gmail.com'),
	(3, 'admin', 'qweqe', 'admin', 'admin@gmail.com'),
	(5, 'auth', 'auth', 'auth', 'auth@gmail.com');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
