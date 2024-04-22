create table admin (
    idt_admin numeric (10),
    des_userName varchar (50) not null,
    des_email varchar(50) not null,
    des_passWord varchar(50) not null,
    num_version numeric(10,0) DEFAULT 0 not null,
    dat_creation timestamp not null,
    dat_update timestamp not null,
    flg_active boolean not null,
    primary key (idt_admin),
    unique (des_email)
);