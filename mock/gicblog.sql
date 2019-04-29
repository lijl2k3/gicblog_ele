-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 29, 2019 at 10:11 AM
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
  `schedules` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `gic_events`
--

INSERT INTO `gic_events` (`id`, `title`, `start_date`, `end_date`, `attendees`, `author_id`, `create_time`, `update_time`, `pic_path`, `contents`, `deleted`, `schedules`) VALUES
(1, 'rew', 1555257600, 1555430400, '[{"pic":{"path":"4","name":"1067313141.jpg"},"intro":"wew","name":"ewe"}]', 4, 1555314474, 1555314474, '4_1555314474', '{"blocks":[{"key":"845h8","text":"eewew","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0, ''),
(2, 'few', 1555344000, 1555430400, '', 4, 1555314521, 1555314521, '', '{"blocks":[{"key":"9rrli","text":"ewew","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0, ''),
(3, 'aaa', 1555344000, 1555516800, '', 4, 1555409526, 1555409526, '', '{"blocks":[{"key":"boa69","text":"ewe","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0, ''),
(4, 'ewe', 1555430400, 1555516800, '', 4, 1555409589, 1555409589, '', '{"blocks":[{"key":"3kn6f","text":"eeww","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0, ''),
(5, 'fewew', 1555948800, 1556121600, '[{"pic":{"path":"4","name":"N55G1347.jpg"},"intro":"testtest\\nteset\\ntest","name":"test"}]', 4, 1555920736, 1555920736, '4_1555920736', '{"blocks":[{"key":"ephlm","text":"errwwwww","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0, ''),
(6, 'tewr', 1556035200, 1556208000, '[{"pic":{"path":"4","name":"N55G1347.jpg"},"intro":"\\u4e94\\u6708\\u4f0a\\u59cb\\uff0c\\u6211\\u4eec\\u5373\\u5c06\\u8fce\\u6765\\u4e0a\\u534a\\u5e74\\u7684\\u5c0f\\u957f\\u5047\\uff0c\\u4e58\\u7740\\u8fd9\\u4e2a\\u95f4\\u9699\\u53ef\\u4ee5\\u603b\\u7ed3\\u56de\\u987e\\u4e0a\\u534a\\u5e74\\u7684\\u4e1a\\u52a1\\u72b6\\u51b5\\uff0c\\u53ca\\u65f6\\u8c03\\u6574\\u4e0b\\u534a\\u5e74\\u7684\\u89c4\\u5212\\u53ca\\u53d1\\u5c55\\u65b9\\u5411\\u3002\\u4e94\\u6708\\u95f4\\u5404\\u884c\\u5404\\u4e1a\\u7684\\u5c55\\u4f1a\\u4e91\\u96c6\\uff0c\\u82e5\\u60a8\\u9700\\u8981\\u67e5\\u8be2\\u5fb7\\u56fd\\u53ca\\u56fd\\u5185\\u7684\\u5c55\\u4f1a\\u65e5\\u7a0b\\uff0c\\u53ef\\u67e5\\u8be2\\u4e0b\\u65b9\\u6211\\u4eec\\u4e3a\\u60a8\\u6574\\u7406\\u7684\\u8868\\u683c\\u3002\\n\\n+\\u9644\\u4ef6\\u8868\\u683c\\u4e24\\u9875\\uff08\\u5fb7\\u56fd\\u53ca\\u4e2d\\u56fd\\uff09\\n\\n\\u66f4\\u591a\\u5c55\\u4f1a\\u8be6\\u60c5\\u8bf7\\u8bbf\\u95ee\\u5c55\\u4f1a\\u5b98\\u7f51\\u3002\\u5982\\u9700\\u5e2e\\u52a9\\u8bf7\\u8054\\u7cfb\\u6211\\u4eec\\n\\n\\u5fb7\\u56fd\\u5c55\\u89c8\\u4f1a\\n","name":"test"}]', 4, 1555921990, 1555921990, '4_1555921990', '{"blocks":[{"key":"2sp1d","text":"rererrre","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7utql","text":"errrrrrrr","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ab1v8","text":"reeeeeeeef","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0, ''),
(7, 'tdrff', 1555430400, 1556208000, '[{"pic":{"path":"4","name":"0001.jpg"},"intro":"\\u4e94\\u6708\\u4f0a\\u59cb\\uff0c\\u6211\\u4eec\\u5373\\u5c06\\u8fce\\u6765\\u4e0a\\u534a\\u5e74\\u7684\\u5c0f\\u957f\\u5047\\uff0c\\u4e58\\u7740\\u8fd9\\u4e2a\\u95f4\\u9699\\u53ef\\u4ee5\\u603b\\u7ed3\\u56de\\u987e\\u4e0a\\u534a\\u5e74\\u7684\\u4e1a\\u52a1\\u72b6\\u51b5\\uff0c\\u53ca\\u65f6\\u8c03\\u6574\\u4e0b\\u534a\\u5e74\\u7684\\u89c4\\u5212\\u53ca\\u53d1\\u5c55\\u65b9\\u5411\\u3002\\u4e94\\u6708\\u95f4\\u5404\\u884c\\u5404\\u4e1a\\u7684\\u5c55\\u4f1a\\u4e91\\u96c6\\uff0c\\u82e5\\u60a8\\u9700\\u8981\\u67e5\\u8be2\\u5fb7\\u56fd\\u53ca\\u56fd\\u5185\\u7684\\u5c55\\u4f1a\\u65e5\\u7a0b\\uff0c\\u53ef\\u67e5\\u8be2\\u4e0b\\u65b9\\u6211\\u4eec\\u4e3a\\u60a8\\u6574\\u7406\\u7684\\u8868\\u683c\\u3002\\n\\n+\\u9644\\u4ef6\\u8868\\u683c\\u4e24\\u9875\\uff08\\u5fb7\\u56fd\\u53ca\\u4e2d\\u56fd\\uff09\\n\\n\\u66f4\\u591a\\u5c55\\u4f1a\\u8be6\\u60c5\\u8bf7\\u8bbf\\u95ee\\u5c55\\u4f1a\\u5b98\\u7f51\\u3002\\u5982\\u9700\\u5e2e\\u52a9\\u8bf7\\u8054\\u7cfb\\u6211\\u4eec\\n\\n\\u5fb7\\u56fd\\u5c55\\u89c8\\u4f1a\\n","name":"rerff"},{"pic":{"path":"4","name":"N55G1347.jpg"},"intro":"\\u4e94\\u6708\\u4f0a\\u59cb\\uff0c\\u6211\\u4eec\\u5373\\u5c06\\u8fce\\u6765\\u4e0a\\u534a\\u5e74\\u7684\\u5c0f\\u957f\\u5047\\uff0c\\u4e58\\u7740\\u8fd9\\u4e2a\\u95f4\\u9699\\u53ef\\u4ee5\\u603b\\u7ed3\\u56de\\u987e\\u4e0a\\u534a\\u5e74\\u7684\\u4e1a\\u52a1\\u72b6\\u51b5\\uff0c\\u53ca\\u65f6\\u8c03\\u6574\\u4e0b\\u534a\\u5e74\\u7684\\u89c4\\u5212\\u53ca\\u53d1\\u5c55\\u65b9\\u5411\\u3002\\u4e94\\u6708\\u95f4\\u5404\\u884c\\u5404\\u4e1a\\u7684\\u5c55\\u4f1a\\u4e91\\u96c6\\uff0c\\u82e5\\u60a8\\u9700\\u8981\\u67e5\\u8be2\\u5fb7\\u56fd\\u53ca\\u56fd\\u5185\\u7684\\u5c55\\u4f1a\\u65e5\\u7a0b\\uff0c\\u53ef\\u67e5\\u8be2\\u4e0b\\u65b9\\u6211\\u4eec\\u4e3a\\u60a8\\u6574\\u7406\\u7684\\u8868\\u683c\\u3002\\n\\n+\\u9644\\u4ef6\\u8868\\u683c\\u4e24\\u9875\\uff08\\u5fb7\\u56fd\\u53ca\\u4e2d\\u56fd\\uff09\\n\\n\\u66f4\\u591a\\u5c55\\u4f1a\\u8be6\\u60c5\\u8bf7\\u8bbf\\u95ee\\u5c55\\u4f1a\\u5b98\\u7f51\\u3002\\u5982\\u9700\\u5e2e\\u52a9\\u8bf7\\u8054\\u7cfb\\u6211\\u4eec\\n\\n\\u5fb7\\u56fd\\u5c55\\u89c8\\u4f1a\\n","name":"grefds"}]', 4, 1555923125, 1555923125, '4_1555923125', '{"blocks":[{"key":"38d47","text":"wewrew","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0, ''),
(8, 'test1', 1554739200, 1554825600, '', 4, 1556515955, 1556515955, '', '{"blocks":[{"key":"fto67","text":"test1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0, ''),
(9, 'testa', 1555344000, 1555430400, '', 4, 1556516078, 1556516078, '', '{"blocks":[{"key":"5u407","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0, ''),
(10, 'test1', 1554825600, 1554912000, '', 4, 1556520678, 1556520678, '', '{"blocks":[{"key":"4bfs","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', 0, '[{"date":"2019-04-22T16:00:00.000Z","todos":[{"startDate":"2016-10-10T06:30:00.000Z","endDate":"2016-10-10T07:30:00.000Z","plan":"test"},{"startDate":"2016-10-10T06:30:00.000Z","endDate":"2016-10-10T07:30:00.000Z","plan":"test2"}]}]');

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
