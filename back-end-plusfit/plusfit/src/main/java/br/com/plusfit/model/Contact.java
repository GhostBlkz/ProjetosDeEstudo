package br.com.plusfit.model;

import br.com.plusfit.controller.request.ContactRequestDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="contact")
@NoArgsConstructor
public class Contact {

    @Id
    @Column(name="idt_contact")
    @GeneratedValue(generator = "CONTACT_SEQUENCE")
    @SequenceGenerator(name = "CONTACT_SEQUENCE", sequenceName = "CONTACT_SEQUENCE", allocationSize = 1)
    private Long contactId;

    @OneToOne
    @JoinColumn(name="idt_customer")                                         // Foreign key
    private Customer customer;

    @Column(name="des_email")
    private String email;

    @Column(name="num_phone")
    private Long phoneNumber;

    @Version
    @Column(name="num_version")
    private Integer version;

    @Column(name="dat_creation")
    private LocalDateTime creationDate;

    @Column(name="dat_update")
    private LocalDateTime updateDate;

    @Column(name="flg_active")
    private Boolean active;

    public Contact (final ContactRequestDto contactRequestDto, Customer customer) {
        this.customer = customer;
        this.contactId = contactRequestDto.getContactId();
        this.email = contactRequestDto.getEmail();
        this.phoneNumber = contactRequestDto.getPhoneNumber();
        this.creationDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
        this.active = true;
    }
}
