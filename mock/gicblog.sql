-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 31, 2019 at 05:07 AM
-- Server version: 5.5.53
-- PHP Version: 5.6.27

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gicblog`
--

-- --------------------------------------------------------

--
-- Table structure for table `gic_news`
--

CREATE TABLE IF NOT EXISTS `gic_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `contents` text COLLATE utf8_bin NOT NULL,
  `author_id` int(11) NOT NULL,
  `pic_path` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=3 ;

--
-- Dumping data for table `gic_news`
--

INSERT INTO `gic_news` (`id`, `title`, `contents`, `author_id`, `pic_path`, `create_time`, `update_time`, `deleted`) VALUES
(1, 'test1', 'test1test1test1test1test1test1test1test1', 1, NULL, 0, 0, 0),
(2, 'test2', 'tst2222', 1, NULL, 1548669191, 1548669191, 0);

-- --------------------------------------------------------

--
-- Table structure for table `gic_user`
--

CREATE TABLE IF NOT EXISTS `gic_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(20) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `gic_user`
--

INSERT INTO `gic_user` (`id`, `uname`, `deleted`, `create_time`, `update_time`, `pwd`) VALUES
(1, 'lijl', 0, 0, 0, ''),
(4, 'testuser', 0, 1548759836, 1548759836, 'e10adc3949ba59abbe56e057f20f883e');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
