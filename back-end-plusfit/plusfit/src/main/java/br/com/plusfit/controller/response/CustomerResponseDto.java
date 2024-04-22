package br.com.plusfit.controller.response;

import br.com.plusfit.model.Address;
import br.com.plusfit.model.Contact;
import br.com.plusfit.model.Customer;
import br.com.plusfit.model.Enrollment;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerResponseDto {

    private Long customerId;
    private String customerCode;
    private String name;
    private String cpf;
    private LocalDate birthDate;
    private List<AddressResponseDto> addresses;
    private List<ContactResponseDto> contact;
    private List<EnrollmentResponseDto> enrollment;

    public CustomerResponseDto(final Customer customer) {
        this.customerId = customer.getCustomerId();
        this.customerCode = customer.getCustomerCode();
        this.name = customer.getName();
        this.cpf = customer.getCpf();
        this.birthDate = customer.getBirthDate();
        this.addresses = new ArrayList<>();
        this.contact = new ArrayList<>();
        this.enrollment = new ArrayList<>();

        for(Address address: customer.getAddresses()) {
            this.addresses.add(new AddressResponseDto(address));
        }

        for(Contact contact: customer.getContact()) {
            this.contact.add(new ContactResponseDto(contact));
        }

        for(Enrollment enrollment: customer.getEnrollment()) {
            this.enrollment.add(new EnrollmentResponseDto(enrollment));
        }
    }
}
