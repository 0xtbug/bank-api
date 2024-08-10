-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 10, 2024 at 05:38 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bank-api`
--

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `balance_before` float NOT NULL,
  `balance_after` float NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `user_id`, `transaction_type`, `amount`, `remarks`, `balance_before`, `balance_after`, `createdAt`, `updatedAt`) VALUES
('0e7bdf08-90a0-4247-9b10-4c1af1eb7962', '03655941-256c-4c66-90bc-c0d6472130f4', 'DEBIT', 10000, 'Pulsa Telkomsel 100k', 670000, 660000, '2024-08-10 09:51:00', '2024-08-10 09:51:00'),
('4b83ebed-2e40-45e4-aff7-ede85bfeccea', '03655941-256c-4c66-90bc-c0d6472130f4', 'DEBIT', 10000, 'Pulsa Telkomsel 100k', 660000, 650000, '2024-08-10 09:51:01', '2024-08-10 09:51:01'),
('5734dbfa-04b7-4925-a53f-418ea816a85f', '03655941-256c-4c66-90bc-c0d6472130f4', 'DEBIT', 10000, 'Pulsa Telkomsel 100k', 690000, 680000, '2024-08-10 09:50:58', '2024-08-10 09:50:58'),
('744734e3-5234-4463-80d3-a3d0deeb1c68', '03655941-256c-4c66-90bc-c0d6472130f4', 'DEBIT', 10000, 'Pulsa Telkomsel 100k', 700000, 690000, '2024-08-10 09:50:57', '2024-08-10 09:50:57'),
('c5dbc59a-3dec-4c1b-a3b7-23e7a36b123b', '03655941-256c-4c66-90bc-c0d6472130f4', 'DEBIT', 10000, 'Pulsa Telkomsel 100k', 680000, 670000, '2024-08-10 09:50:59', '2024-08-10 09:50:59'),
('e97ad730-28ff-4650-aee0-695d84fde01e', '03655941-256c-4c66-90bc-c0d6472130f4', 'DEBIT', 10000, 'Pulsa Telkomsel 100k', 650000, 640000, '2024-08-10 09:51:02', '2024-08-10 09:51:02');

-- --------------------------------------------------------

--
-- Table structure for table `topups`
--

CREATE TABLE `topups` (
  `top_up_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `balance_before` float NOT NULL,
  `balance_after` float NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `topups`
--

INSERT INTO `topups` (`top_up_id`, `user_id`, `transaction_type`, `amount`, `balance_before`, `balance_after`, `createdAt`, `updatedAt`) VALUES
('016d81f5-fa66-4b8c-9f6b-8b4f8f389751', '03655941-256c-4c66-90bc-c0d6472130f4', 'CREDIT', 100000, 200000, 300000, '2024-08-10 09:45:26', '2024-08-10 09:45:26'),
('5d230a5c-3bcc-458e-b918-51db77b9b33e', '03655941-256c-4c66-90bc-c0d6472130f4', 'CREDIT', 100000, 600000, 700000, '2024-08-10 09:45:28', '2024-08-10 09:45:28'),
('8d2b18b5-ab62-4842-9b52-113fb0943e7c', '03655941-256c-4c66-90bc-c0d6472130f4', 'CREDIT', 100000, 100000, 200000, '2024-08-10 09:45:25', '2024-08-10 09:45:25'),
('aad748c4-f57b-489b-ad87-20ffd70f20e7', '03655941-256c-4c66-90bc-c0d6472130f4', 'CREDIT', 100000, 500000, 600000, '2024-08-10 09:45:28', '2024-08-10 09:45:28'),
('b2c2f339-2c41-4f9e-94a2-835d96659c35', '03655941-256c-4c66-90bc-c0d6472130f4', 'CREDIT', 100000, 0, 100000, '2024-08-10 09:45:23', '2024-08-10 09:45:23'),
('e3d303b4-0bf1-4b15-8e2e-728eb568c957', '03655941-256c-4c66-90bc-c0d6472130f4', 'CREDIT', 100000, 400000, 500000, '2024-08-10 09:45:27', '2024-08-10 09:45:27'),
('fd05fc67-2d1b-425b-bf10-a76a9e6baee6', '03655941-256c-4c66-90bc-c0d6472130f4', 'CREDIT', 100000, 300000, 400000, '2024-08-10 09:45:27', '2024-08-10 09:45:27');

-- --------------------------------------------------------

--
-- Table structure for table `transfers`
--

CREATE TABLE `transfers` (
  `transfer_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `sender_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `receiver_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `amount` float NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `balance_before` float NOT NULL,
  `balance_after` float NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `balance` float NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `phone_number`, `address`, `pin`, `balance`, `createdAt`, `updatedAt`) VALUES
('03655941-256c-4c66-90bc-c0d6472130f4', 'Tom', 'Araya', '0811255502', 'Jl. Diponegoro No. 215', '$2a$10$mf/ySQpLQHlFSp9IuQDBTuUdvc3mXS3qFG1fQtTtbfLlPvg5OiRYW', 640000, '2024-08-10 09:44:53', '2024-08-10 17:28:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `topups`
--
ALTER TABLE `topups`
  ADD PRIMARY KEY (`top_up_id`);

--
-- Indexes for table `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`transfer_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
