package br.com.plusfit.controller.request;

import br.com.plusfit.model.Address;
import br.com.plusfit.model.Contact;
import br.com.plusfit.model.Customer;
import br.com.plusfit.model.Enrollment;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class CustomerRequestDto {

    private Long customerId;
    private String name;
    private String cpf;
    private LocalDate birthDate;
    private List<AddressRequestDto> addresses;
    private List<ContactRequestDto> contact;
    private List<EnrollmentRequestDto> enrollment;

    public CustomerRequestDto(final Customer customer) {
        this.customerId = customer.getCustomerId();
        this.name = customer.getName();
        this.cpf = customer.getCpf();
        this.birthDate = customer.getBirthDate();
        this.addresses = new ArrayList<>();
        this.contact = new ArrayList<>();
        this.enrollment = new ArrayList<>();

        for(Address address: customer.getAddresses()) {
            this.addresses.add(new AddressRequestDto(address));
        }

        for(Contact contact: customer.getContact()) {
            this.contact.add(new ContactRequestDto(contact));
        }

        for(Enrollment enrollment: customer.getEnrollment()) {
            this.enrollment.add(new EnrollmentRequestDto(enrollment));
        }
    }

}
