create table customer (
    idt_customer numeric(10,0),
    cod_customer varchar(36) not null,    -- usar quando trabalhar com sistema distribuido
    des_name varchar(50) not null,
    des_cpf varchar(11) not null,
    dat_birth date not null,
    num_version numeric(10,0) DEFAULT 0 not null,      -- manter a versao correta, evitar versoes falhas
    dat_creation timestamp not null,                        -- data de criacao do registro
    dat_update timestamp not null,                         -- data do ultimo update
    flg_active boolean not null,                            -- inativar o registro sem exclui-lo, delete logico da tabela
    primary key (idt_customer),
    unique(cod_customer),                           -- unique - garantir que o dado e unico
    unique(des_cpf)
);

create table enrollment (
    idt_enrollment numeric(10,0),
    idt_customer numeric(10,0),
    ind_status varchar(1) not null,
    num_version numeric(10,0) DEFAULT 0 not null,
    dat_creation timestamp not null,
    dat_update timestamp not null,
    des_plan_type varchar(50),
    flg_active boolean not null,
    primary key (idt_enrollment),
    constraint fk_customer_enrollment       -- nome da constraint
        foreign key(idt_customer)             -- campo que representa a fk na matricula / tabela q ele aponta
            references customer(idt_customer)  -- campo que representa a PK referenciada na tabela cliente
);

create table address (
    idt_address numeric(10,0),
    idt_customer numeric(10,0),
    flg_active boolean not null,
    dat_creation timestamp not null,
    dat_update timestamp not null,
    num_version numeric(10,0) DEFAULT 0 not null,
    des_city varchar(50) not null,
    des_state varchar(50) not null,
    des_neighbourhood varchar(100) not null,
    des_street varchar(200) not null,
    num_address_number numeric (10,0),
    num_zip_code numeric(8) not null,
    primary key (idt_address),
    constraint fk_customer_address                  -- nome da constraint
            foreign key(idt_customer)             -- campo que representa a fk na matricula
                references customer(idt_customer)  -- campo que representa a PK referenciada na tabela cliente
);

create table contact (
    idt_contact numeric(10,0),
    idt_customer numeric(10, 0),
    flg_active boolean not null,
    dat_creation timestamp not null,
    dat_update timestamp not null,
    num_version numeric(10,0) DEFAULT 0 not null,
    des_email varchar(200),
    num_phone numeric(13) not null,
    primary key (idt_contact),
    constraint fk_customer_contact              -- nome da constraint
        foreign key(idt_customer)                       -- campo que representa a fk na matricula
            references customer(idt_customer)           -- campo que representa a PK referenciada na tabela cliente
);

