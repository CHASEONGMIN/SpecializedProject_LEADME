-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: J5B305.p.ssafy.io    Database: bigdatapjt
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `recommendationmovieti`
--

DROP TABLE IF EXISTS `recommendationmovieti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommendationmovieti` (
  `recid` int NOT NULL AUTO_INCREMENT,
  `movieid` int DEFAULT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`recid`),
  KEY `recommendationmovieti_movieid_c30986ea_fk_movie_movieid` (`movieid`),
  KEY `recommendationmovieti_uid_71624380_fk_user_uid` (`uid`),
  CONSTRAINT `recommendationmovieti_movieid_c30986ea_fk_movie_movieid` FOREIGN KEY (`movieid`) REFERENCES `movie` (`movieid`),
  CONSTRAINT `recommendationmovieti_uid_71624380_fk_user_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommendationmovieti`
--

LOCK TABLES `recommendationmovieti` WRITE;
/*!40000 ALTER TABLE `recommendationmovieti` DISABLE KEYS */;
INSERT INTO `recommendationmovieti` VALUES (1,305,26),(2,1875,26),(3,335,26),(4,217,26),(5,6438,26),(6,897,26),(7,6408,26),(8,500,26),(9,3921,26),(10,54,26),(11,305,27),(12,1875,27),(13,335,27),(14,217,27),(15,6438,27),(16,897,27),(17,6408,27),(18,500,27),(19,3921,27),(20,54,27),(21,305,32),(22,1875,32),(23,335,32),(24,217,32),(25,6438,32),(26,897,32),(27,6408,32),(28,500,32),(29,3921,32),(30,54,32),(31,2106,33),(32,1925,33),(33,1023,33),(34,1129,33),(35,6408,33),(36,1736,33),(37,186,33),(38,3265,33),(39,1049,33),(40,1446,33),(41,2106,34),(42,1925,34),(43,1023,34),(44,1129,34),(45,6408,34),(46,1736,34),(47,186,34),(48,3265,34),(49,1049,34),(50,1446,34);
/*!40000 ALTER TABLE `recommendationmovieti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-08  9:48:36
