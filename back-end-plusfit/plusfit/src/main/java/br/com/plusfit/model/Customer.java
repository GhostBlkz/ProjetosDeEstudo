package br.com.plusfit.model;

import br.com.plusfit.controller.request.AddressRequestDto;
import br.com.plusfit.controller.request.ContactRequestDto;
import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.controller.request.EnrollmentRequestDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Table(name = "customer")
@NoArgsConstructor
@Data   // cria getter, setter e construtores para todos atributos, e do lombok, n aparece no codigo
@Entity
public class Customer {
    @Id
    @Column(name="idt_customer")
    @GeneratedValue(generator = "CUSTOMER_SEQUENCE")
    @SequenceGenerator(name = "CUSTOMER_SEQUENCE", sequenceName = "CUSTOMER_SEQUENCE", allocationSize = 1)
    private Long customerId;

    @Column(name="cod_customer", updatable = false)
    private String customerCode;

    @Column(name="des_name")
    private String name;

    @Column(name="des_cpf")
    private String cpf;

    @Column(name="dat_birth")
    private LocalDate birthDate;

    @Version
    @Column(name="num_version")
    private Integer version;

    @Column(name="dat_creation")
    private LocalDateTime creationDate;

    @Column(name="dat_update")
    private LocalDateTime updateDate;

    @Column(name="flg_active")
    private Boolean active;

    @OneToMany(mappedBy = "customer",
    cascade = CascadeType.ALL)
    private List<Address> addresses;

    @OneToMany(mappedBy = "customer",
    cascade = CascadeType.ALL)
    private List<Contact> contact;

    @OneToMany(mappedBy = "customer",
    cascade = CascadeType.ALL)
    private List<Enrollment> enrollment;

    public Customer (final CustomerRequestDto customerRequestDto) {
        this.customerId = customerRequestDto.getCustomerId();
        this.customerCode = UUID.randomUUID().toString();
        this.name = customerRequestDto.getName();
        this.cpf = customerRequestDto.getCpf();
        this.birthDate = customerRequestDto.getBirthDate();
        this.creationDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
        this.active = true;

        this.addresses = new ArrayList<>();
        for (final AddressRequestDto addressRequestDto: customerRequestDto.getAddresses()) {
            this.addresses.add(new Address(addressRequestDto, this));
        }

        this.contact = new ArrayList<>();
        for (final ContactRequestDto contactRequestDto: customerRequestDto.getContact()) {
            this.contact.add(new Contact(contactRequestDto, this));
        }

        this.enrollment = new ArrayList<>();
        for (final EnrollmentRequestDto enrollmentRequestDto: customerRequestDto.getEnrollment()) {
            this.enrollment.add(new Enrollment(enrollmentRequestDto, this));
        }
    }
}
