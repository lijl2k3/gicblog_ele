-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 19, 2019 at 10:22 AM
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
-- Table structure for table `gic_events`
--

CREATE TABLE IF NOT EXISTS `gic_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `start_date` int(11) NOT NULL,
  `end_date` int(11) NOT NULL,
  `attendees` text NOT NULL,
  `author_id` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL,
  `pic_path` varchar(100) NOT NULL,
  `contents` text NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `gic_events`
--

INSERT INTO `gic_events` (`id`, `title`, `start_date`, `end_date`, `attendees`, `author_id`, `create_time`, `update_time`, `pic_path`, `contents`, `deleted`) VALUES
(1, 'rew', 1555257600, 1555430400, '[{"pic":{"path":"4","name":"1067313141.jpg"},"intro":"wew","name":"ewe"}]', 4, 1555314474, 1555314474, '4_1555314474', '{"blocks":[{"key":"845h8","text":"eewew","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0),
(2, 'few', 1555344000, 1555430400, '', 4, 1555314521, 1555314521, '', '{"blocks":[{"key":"9rrli","text":"ewew","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0),
(3, 'aaa', 1555344000, 1555516800, '', 4, 1555409526, 1555409526, '', '{"blocks":[{"key":"boa69","text":"ewe","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0),
(4, 'ewe', 1555430400, 1555516800, '', 4, 1555409589, 1555409589, '', '{"blocks":[{"key":"3kn6f","text":"eeww","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0);

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
  `file_path` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=23 ;

--
-- Dumping data for table `gic_news`
--

INSERT INTO `gic_news` (`id`, `title`, `contents`, `author_id`, `pic_path`, `file_path`, `create_time`, `update_time`, `deleted`) VALUES
(1, 'test1', 'test1test1test1test1test1test1test1test1', 1, NULL, NULL, 0, 0, 1),
(2, 'test2', 'tst2222', 1, NULL, NULL, 1548669191, 1548669191, 1),
(3, 'test3', '{"blocks":[{"key":"95duu","text":"test3","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 4, NULL, NULL, 1550222084, 1550222084, 0),
(4, 'aaa', '{"blocks":[{"key":"69k9v","text":"aaa","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550642466, 1550642466, 1),
(5, 'aaa', '{"blocks":[{"key":"e5p3e","text":"aaa","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550642629, 1550642629, 1),
(6, 'bbb', '{"blocks":[{"key":"dn78r","text":"bbb","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550642638, 1550642638, 1),
(7, 'ccc', '{"blocks":[{"key":"g1sf","text":"ccc","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550642646, 1550642646, 1),
(8, 'bbb', '{"blocks":[{"key":"42sum","text":"bbb","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550642838, 1550642838, 1),
(9, 'hhh', '{"blocks":[{"key":"fhds5","text":"hhh","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550642905, 1550642905, 1),
(10, 'ggg', '{"blocks":[{"key":"5qvsl","text":"ggg","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550646179, 1550646179, 1),
(11, 'fff', '{"blocks":[{"key":"fbkm2","text":"fff","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550646243, 1550646243, 1),
(12, 'ttt', '{"blocks":[{"key":"e1n5m","text":"tttt","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550646359, 1550646359, 1),
(13, 'rrr', '{"blocks":[{"key":"2icvo","text":"rrr","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550646614, 1550646614, 1),
(14, 'ggg', '{"blocks":[{"key":"9ovc4","text":"gggg","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 1, NULL, NULL, 1550646830, 1550646830, 0),
(15, 'teststs', '{"blocks":[{"key":"2c14j","text":"teess","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 4, NULL, NULL, 1550817147, 1550817147, 0),
(16, 'tester', '{"blocks":[{"key":"3jook","text":"trrere","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 4, '4_1550817448', NULL, 1550817448, 1550817448, 0),
(17, 'rewe', '{"blocks":[{"key":"c2oo4","text":"ewerere","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}', 4, '4_1550828176', NULL, 1550828176, 1551079399, 0),
(18, 'testf', '{"blocks":[{"key":"bjo7k","text":"eeweettrt","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 4, NULL, '4_1551780453', 1551780453, 1552385338, 0),
(19, 'testaaa', '{"blocks":[{"key":"ebskd","text":"testaaa","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 4, '4_1552022783', '4_1552022783', 1552022783, 1552022783, 0),
(20, 'dsds', '{"blocks":[{"key":"7ec80","text":"dsdf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 4, '4_1552028361', NULL, 1552028361, 1552028361, 0),
(21, 'trere', '{"blocks":[{"key":"9dgek","text":"trer","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 4, '4_1552028668', '4_1552028668', 1552028668, 1552031733, 0),
(22, 'Matchmaking Luftfahrt', '{"blocks":[{"key":"d6mf7","text":" Liebe Kollegen, ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2dsbv","text":"  ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"74b0i","text":"die Profile von\\n16 Firmen zur matchmakings fuer die Markterschliessungsreise im Bereich\\nLuftfahrt von FED sind gespeichert unter: ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5p6bd","text":"I:\\\\MEBD\\\\1_Markteintritt\\\\4_Matchmaking\\\\201903\\nMarkterschliessungsreise Luftfahrt ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eli2h","text":"  ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1od02","text":"  ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9l8dc","text":"Liebe Gruesse, ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8f8l8","text":"Siyuan  ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 4, '4_1552032183', '4_1552032183', 1552032183, 1552032183, 0);

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
(1, 'lijl', 0, 0, 0, '7d9bea7897107df1a06dd096dac353d8'),
(4, 'testuser', 0, 1548759836, 1548759836, 'e10adc3949ba59abbe56e057f20f883e');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
