package br.com.plusfit.model;

import br.com.plusfit.controller.request.AddressRequestDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name="address")
@NoArgsConstructor
public class Address {

    @Id
    @Column(name = "idt_address")
    @GeneratedValue(generator = "ADDRESS_SEQUENCE")
    @SequenceGenerator(name = "ADDRESS_SEQUENCE", sequenceName = "ADDRESS_SEQUENCE", allocationSize = 1)
    private Long addressId;

    @OneToOne
    @JoinColumn(name="idt_customer")                                         // Foreign key
    private Customer customer;

    @Column(name="des_city")
    private String city;

    @Column(name="des_state")
    private String state;

    @Column(name="des_neighbourhood")
    private String neighbourhood;

    @Column(name="des_street")
    private String street;

    @Column(name="num_address_number")
    private Integer addressNumber;

    @Column(name="num_zip_code")
    private Integer zipCode;

    @Version
    @Column(name="num_version")
    private Integer version;

    @Column(name="dat_creation", updatable = false)
    private LocalDateTime creationDate;

    @Column(name="dat_update")
    private LocalDateTime updateDate;

    @Column(name="flg_active")
    private Boolean active;

    public Address (final AddressRequestDto addressRequestDto, Customer customer) {
        this.customer = customer;
        this.addressId = addressRequestDto.getAddressId();
        this.city = addressRequestDto.getCity();
        this.state = addressRequestDto.getState();
        this.neighbourhood = addressRequestDto.getNeighbourhood();
        this.street = addressRequestDto.getStreet();
        this.addressNumber = addressRequestDto.getAddressNumber();
        this.zipCode = addressRequestDto.getZipCode();
        this.creationDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
        this.active = true;
    }
}
