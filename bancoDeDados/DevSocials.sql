CREATE DATABASE DevSocials;
USE DevSocials;
#DROP DATABASE DevSocials;
CREATE TABLE Usuarios(
	email VARCHAR(200) NOT NULL,
    nome VARCHAR(500),
    userName VARCHAR(100),
    userImg VARCHAR(800),
    senha VARCHAR(100),
    PRIMARY KEY(email)
);

CREATE TABLE Chat(
	id INT AUTO_INCREMENT NOT NULL,
    remetente VARCHAR(200),
    destinatario VARCHAR(200),
    data_tempo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_remetente FOREIGN KEY(remetente)REFERENCES Usuarios(email),
    CONSTRAINT fk_destinatario FOREIGN KEY(destinatario)REFERENCES Usuarios(email),
    PRIMARY KEY(id)
);

CREATE TABLE Publicacoes(
	id INT AUTO_INCREMENT NOT NULL,
    img VARCHAR(1000),
    txt VARCHAR(5000),
    donoP VARCHAR(200),
    curtidas INT(5),
    CONSTRAINT fk_donop FOREIGN KEY(donoP) REFERENCES Usuarios(email),
    PRIMARY KEY(id)
);

CREATE TABLE Comentarios(
	id INT AUTO_INCREMENT NOT NULL,
    donoC VARCHAR(200),
    publicacaoOrigem INT,
    CONSTRAINT fk_donoc FOREIGN KEY(donoC) REFERENCES Usuarios(email),
    CONSTRAINT fk_origem FOREIGN KEY(publicacaoOrigem) REFERENCES Publicacoes(id),
    PRIMARY KEY(id)
);


#SELECT usr_idusuario, DATE_FORMAT(evn_dtevento, "%d/%m/%Y") AS data_evento FROM evn_evento;