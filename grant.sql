GRANT ALL PRIVILEGES ON resultados_2011 TO 'nodejs'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON resultados_2011 TO 'nodejs'@'%' WITH GRANT OPTION;
SET PASSWORD FOR 'nodejs'@'%' = PASSWORD('123456');
SET PASSWORD FOR 'nodejs'@'localhost' = PASSWORD('123456');
