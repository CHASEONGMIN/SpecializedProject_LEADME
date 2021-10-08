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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `uid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `nickname` varchar(128) DEFAULT NULL,
  `profileimg` varchar(128) DEFAULT NULL,
  `movieti` varchar(4) DEFAULT NULL,
  `surveyed` tinyint(1) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (NULL,0,1,'jiahn.dev@gmail.com','pbkdf2_sha256$260000$BZHlfHmPLmGJlqMNbCQSmu$8lqSp7wUs2PaJwQ64Zcyy7ZlaekrD2TN+gH6wByjMUU=','jiahn.dev',NULL,'ESTP',1),(NULL,0,2,'kimssafy@ssafy.com','pbkdf2_sha256$260000$egn0iZcJoe1mOEFSs79B8l$NxOiZ95JqhJRRJz1Iis3Gqy/k6yy6DeINzgFgtmshzQ=','kimssafy',NULL,NULL,0),(NULL,0,3,'a@a.com','pbkdf2_sha256$260000$MQLdulQfOffYVBeRaWPE57$SIf9yFJ7WXes/CZAr+Dj8b+GJ63mn5BY8uwNpT4Tn7g=','a',NULL,NULL,0),(NULL,0,4,'coach@ssafy.com','pbkdf2_sha256$260000$nMUV2ebQjmO1kHpP82uSe9$AglOlHz87atXcA8J7R3PpF50TzSBUGpYfd0QKMUJG88=','coach',NULL,NULL,0),(NULL,0,5,'minah@naver.com','pbkdf2_sha256$260000$fyMe1WkLZaklum7JSPJHPC$mDyCKs3ZoI8CTpdFMH68yEqncxeUt9kUCeQdLasSM7g=','minah',NULL,'ESTP',1),(NULL,0,6,'jeamin@naver.com','pbkdf2_sha256$260000$ZLxSKMqctBToTK4o961TzY$JDEa1RkLIpvuREO2W9mtACppPARYO/6fc6I+gdw0cWE=','jeamin',NULL,'ESFJ',0),(NULL,0,7,'jimin@naver.com','pbkdf2_sha256$260000$ZDbaVYqQ3ITeWqZtCbfUgz$uFlZlDYZat7cHAY30FDO0WYuaIm+rF4mWUO3h7Xoyb0=','jimin',NULL,'ESFJ',0),(NULL,0,8,'minho@naver.com','pbkdf2_sha256$260000$4vFgwkzkLW3ysPtFQqWfXw$mWynsneOYV3SI0wNXXi3gXt6zEsZ4WtbgsQXe5z8sVo=','minho',NULL,'INFJ',0),(NULL,0,9,'hyungwoo@naver.com','pbkdf2_sha256$260000$HNjqJmj4KLDOLQZztDMj8X$add60B4wCVyY5rnPj3fqeiJsfYnWOSq+8uA/XepaRjo=','hyungwoo',NULL,'ESTJ',0),(NULL,0,10,'sunxdd@naver.com','pbkdf2_sha256$260000$ilVLmfCJunFOD6MoDwgky4$vle17eFUb2/7blyJ8bi4R7SthVVH40SESsKlIN63aTo=','sunxdd',NULL,'INFP',0),(NULL,0,11,'woojin@naver.com','pbkdf2_sha256$260000$3owRvUxKqkUIq4tBR7z6Px$dU9CxorC6KZMPCENKC4fxXElHl83hccgg1jY2ozFHgQ=','woojin',NULL,'ISFP',0),(NULL,0,12,'yejun@naver.com','pbkdf2_sha256$260000$RE45gvhtKltLV6X65Qa4MU$UBNbUo89C8gskfhXEh9xD9TMJr+eFzo5SW2hFa9cleA=','yejun',NULL,'ESFJ',0),(NULL,0,13,'sungmin@ssafy.com','pbkdf2_sha256$260000$qOYmFYUOron1VRGXpDDB4J$2/2eZYC8nEcvYYIoEUWLqA5a2H1EuAXx/vMwfqbnPrc=','sungmin',NULL,'ESFP',1),(NULL,0,14,'jihong@ssafy.com','pbkdf2_sha256$260000$GlOafzAoR7bgKsEC3wJdex$umZYDwok34kRpPCk2IN9myMS/AlLvfkKkweyzq2HR4o=','jihong',NULL,'ISFP',1),(NULL,0,15,'hyungsik@ssafy.com','pbkdf2_sha256$260000$7TGJjaiVCMtLlERBvU9tv0$5vYI9pJHJYLhaLS4KrRfcT4Wsn+MoJLXwEoaz8gIkiw=','hyungsik',NULL,'INFP',0),(NULL,0,16,'jongeun@ssafy.com','pbkdf2_sha256$260000$pvxbQmDQYKDVpAxLRCCWrh$6yaMAZazuxNuafn9bteD9IkfmS2nkpoDmvkqBG8iB8A=','jongeun',NULL,'INFJ',0),(NULL,0,17,'jiahn@ssafy.com','pbkdf2_sha256$260000$XXew7Mvz9UIt9N8tbMNKmg$aaxRjAZrlz849pTfKF5SlURFx/liAAXcfmOq+t2KizM=','jiahn',NULL,'ISFP',1),(NULL,0,18,'jian@naver.com','pbkdf2_sha256$260000$tP12Vwtaw56bqBkHlt3W0G$TTwTKMkXa/RI+AxLq4Pd4rRUOhe8uLBqqJs6sgzbgAM=','jian',NULL,'ESTP',1),(NULL,0,19,'sung@naver.com','pbkdf2_sha256$260000$YC2caN2cIou3dwr0Q08qZ6$tM3pITGDtQWTOfWpe98zYfvf5AA/sGVSS3L0xDP8Qfk=','sung',NULL,'ENFJ',1),(NULL,0,20,'smin@naver.com','pbkdf2_sha256$260000$1Iyq0YfPX4DvtPNncohAxv$7WrrfGoYaEXq9iPjiZAtH02ov/kyy2FPZ2epavTt+mA=','smin',NULL,'ENFJ',1),(NULL,0,21,'ssmin@naver.com','pbkdf2_sha256$260000$oee29bJqQzt7oUgFcDphBf$5QBeyQOXSqP1HxD3iWvCzTPTCor0A6R25APa609lQ6o=','ssmin',NULL,'ENFJ',1),(NULL,0,22,'cha@naver.com','pbkdf2_sha256$260000$6mMELNiOnDEYKUld5G92WC$UbiujkykLRI0fksYMhBy8QQSGOlAfQefDOhsNxQR8WE=','cha',NULL,'ENFJ',1),(NULL,0,23,'pro@naver.com','pbkdf2_sha256$260000$mPBumnxRtGq2tJmZTOOdle$Y9HjncSxmuvHB5a+FW7ZH7VcpRH5rjMKesoTc4H56EA=','pro',NULL,'ENTJ',1),(NULL,0,24,'kyo@naver.com','pbkdf2_sha256$260000$NNP2rzSoLMTsutyiGKu3qP$2w2muVZjiMav2rG/AymBt1qvzmYdxLuXlNczY4iIq3U=','kyo',NULL,'ENTJ',1),(NULL,0,25,'profe@naver.com','pbkdf2_sha256$260000$y8vubnTObkj1lNsj34S5vK$RjPgAeKiLDFMaNg0FGvEbW9U0u3UmB80lX6zIknK55A=','profe',NULL,'ENTJ',1),(NULL,0,26,'jjiani@naver.com','pbkdf2_sha256$260000$RdlHTyMQCOdKlD6giEUyau$4srRkD6kjtR1/RqDnTbBX5H/iy+t4RPFD/pumGmiFt4=','jjiani',NULL,'ISFP',1),(NULL,0,27,'jian1@naver.com','pbkdf2_sha256$260000$pJhsG8XdqtwyHSLsUEXQxk$WAbRtPqUZ1caXDB1VwpKsYQO5evpbXAlQf/4/+K444k=','jian1',NULL,'ISFP',1),(NULL,0,28,'jjh1731@gmail.com','pbkdf2_sha256$260000$chBwwiaV2k0wJgIclqdSOj$mt/z/VNtx5pyITkIc+TJF9xx+1yfH29JSwBV1H7mceE=','jjh1731',NULL,NULL,1),(NULL,0,29,'ji@naver.com','pbkdf2_sha256$260000$ET1M27qRd2IrzkcjfjwYHm$cLSdsqaIEptZR3SEkANckHycdY43gwI74QDF/ghlC0A=','ji',NULL,'INFJ',1),(NULL,0,30,'bluebird@naver.com','pbkdf2_sha256$260000$qrKjpFcHB3sa1Ho0K5Vxzp$ffyqjIQkAK/I3+iJKaSx5uP+VQAHwYsljmQprpFPla4=','bluebird',NULL,NULL,1),(NULL,0,31,'b@b.com','pbkdf2_sha256$260000$QoVeRd7weVur87FFF1Dzqz$YxhSS1LPCeCkc9CiWcJxZrcshc789T/4wq0+5KcdGsQ=','b',NULL,'INFJ',1),(NULL,0,32,'ckpow@naver.com','pbkdf2_sha256$260000$dntZq0n8nAo5hwrSsAsdQ6$Dor9HF6Xx54i3Wro5pFH6tr/GkniwvKwLai00BvA36U=','ckpow',NULL,'ISFP',1),(NULL,0,33,'test@naver.com','pbkdf2_sha256$260000$B2TYSjliVQCY1UdpcFAjpH$KHB/reJHG/IXuG3A60u/2rrngwNJWCRVZgYpCV9mCss=','test',NULL,'ISFP',1),(NULL,0,34,'jkd@naver.com','pbkdf2_sha256$260000$wvWMLkHCY9jN0wKOEJHt4n$u/Cv1LEoucgX6lW7RQhIQKFrxYinKVMIkmcQ77CN2OY=','jkd',NULL,'ISFP',1),(NULL,0,35,'t@a.com','pbkdf2_sha256$260000$xhsb7v0H8onjoCtAp8Ny7R$4sNz5e7JURwi57LP8Sbu8pBRIgdtqUq02RtgyGSVN2s=','t',NULL,NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-08  9:48:34
