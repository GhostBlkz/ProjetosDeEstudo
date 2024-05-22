create table training_sheet (
    idt_training_sheet numeric (10),
    idt_customer numeric (10) not null,
    des_name varchar (50) not null,
    num_version numeric(10,0) DEFAULT 0 not null,
    dat_creation timestamp not null,
    dat_update timestamp not null,
    flg_active boolean not null,
    primary key (idt_training_sheet),
    constraint fk_customer_training_sheet
        foreign key (idt_customer)
            references customer(idt_customer)
);

create table activity (
    idt_activity numeric(10),
    idt_training_sheet numeric(10) not null,
    des_group varchar(1) not null,
    des_description text not null,
    ind_body_part varchar(1) not null,
    num_version numeric(10,0) DEFAULT 0 not null,
    dat_creation timestamp not null,
    dat_update timestamp not null,
    flg_active boolean not null,
    primary key(idt_activity),
    constraint fk_training_sheet
        foreign key(idt_training_sheet)
            references training_sheet(idt_training_sheet)
);

CREATE SEQUENCE TRAINING_SHEET_SEQUENCE START 1;
CREATE SEQUENCE ACTIVITY_SEQUENCE START 1;
