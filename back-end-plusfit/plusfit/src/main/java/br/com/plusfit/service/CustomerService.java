package br.com.plusfit.service;

import br.com.plusfit.controller.request.AddressRequestDto;
import br.com.plusfit.controller.request.ContactRequestDto;
import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.controller.request.EnrollmentRequestDto;
import br.com.plusfit.model.Address;
import br.com.plusfit.model.Contact;
import br.com.plusfit.model.Customer;
import br.com.plusfit.model.Enrollment;
import br.com.plusfit.model.mappers.AddressMapper;
import br.com.plusfit.model.mappers.CustomerMapper;
import br.com.plusfit.repository.AddressRepository;
import br.com.plusfit.repository.ContactRepository;
import br.com.plusfit.repository.CustomerRepository;
import br.com.plusfit.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private ContactRepository contactRepository;

    public Customer save(final Customer customer) {
        return this.customerRepository.save(customer);
    }

    public List<Customer> findAll() {
        return this.customerRepository.findAll();
    }

    public Customer findById(Long customerId) {
        Optional<Customer> customerOptional = this.customerRepository.findById(customerId);
        return customerOptional.orElse(null);
    }

    public Customer update(final CustomerRequestDto customerRequestDto, Long customerId) {
        Customer customer = customerRepository.findByCustomerId(customerId);

        if (customerRequestDto.getCpf() != null) {
            customer.setCpf(customerRequestDto.getCpf());
        }
        if (customerRequestDto.getName() != null) {
            customer.setName(customerRequestDto.getName());
        }
        if (customerRequestDto.getBirthDate() != null) {
            customer.setBirthDate(customerRequestDto.getBirthDate());
        }
        customer.setUpdateDate(LocalDateTime.now());

        return this.customerRepository.save(customer);
    }

    public Address update(final AddressRequestDto addressRequestDto, Long addressId) {
        Address address = addressRepository.findByAddressId(addressId);

        address.setAddressNumber(addressRequestDto.getAddressNumber());
        address.setCity(addressRequestDto.getCity());
        address.setState(addressRequestDto.getState());
        address.setZipCode(addressRequestDto.getZipCode());
        address.setUpdateDate(LocalDateTime.now());
        address.setNeighbourhood(addressRequestDto.getNeighbourhood());
        address.setStreet(addressRequestDto.getStreet());

        return this.addressRepository.save(address);
    }

    public Enrollment update(final EnrollmentRequestDto enrollmentRequestDto, Long enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findByEnrollmentId(enrollmentId);

        enrollment.setPlanDescription(enrollmentRequestDto.getPlanDescription());
        enrollment.setUpdateDate(LocalDateTime.now());

        return this.enrollmentRepository.save(enrollment);
    }

    public Contact update(final ContactRequestDto contactRequestDto, Long contactId) {
        Contact contact = contactRepository.findByContactId(contactId);

        contact.setEmail(contactRequestDto.getEmail());
        contact.setPhoneNumber(contactRequestDto.getPhoneNumber());
        contact.setUpdateDate(LocalDateTime.now());

        return this.contactRepository.save(contact);
    }


    public void inactive(final Long customerId) {
        Customer customer = customerRepository.findByCustomerId(customerId);
        customer.setActive(false);
        this.customerRepository.save(customer);
    }
}
