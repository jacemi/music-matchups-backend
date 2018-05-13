DROP DATABASE music_meetups;
DROP USER music_meetups_superuser;

CREATE USER music_meetups_superuser WITH ENCRYPTED PASSWORD 'Mus!cW33bLord420';
CREATE DATABASE music_meetups WITH OWNER music_meetups_superuser; 