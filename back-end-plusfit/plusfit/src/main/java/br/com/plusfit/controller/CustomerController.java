package br.com.plusfit.controller;

import br.com.plusfit.controller.request.AddressRequestDto;
import br.com.plusfit.controller.request.ContactRequestDto;
import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.controller.request.EnrollmentRequestDto;
import br.com.plusfit.controller.response.AddressResponseDto;
import br.com.plusfit.controller.response.ContactResponseDto;
import br.com.plusfit.controller.response.CustomerResponseDto;
import br.com.plusfit.controller.response.EnrollmentResponseDto;
import br.com.plusfit.model.Customer;
import br.com.plusfit.model.mappers.CustomerMapper;
import br.com.plusfit.repository.CustomerRepository;
import br.com.plusfit.service.CustomerService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    private List<CustomerResponseDto> getCustomer() {
        List<CustomerResponseDto> response = new ArrayList<>();
        for (Customer customer : this.customerService.findAll()) {
            response.add(new CustomerResponseDto(customer));
        }
        return response;
    }

    @GetMapping("/{customerId}")
    public CustomerResponseDto getById(@PathVariable Long customerId) {
        Customer customer = this.customerService.findById(customerId);
        return new CustomerResponseDto(customer);
    }

    @PostMapping
    public CustomerResponseDto saveCustomer(@RequestBody final CustomerRequestDto customerRequestDto) {
        Customer customer = new Customer(customerRequestDto);
        customer = this.customerService.save(customer);
        return new CustomerResponseDto(customer);
    }
    @DeleteMapping("/{customerId}")
    public void inactiveCustomer(@PathVariable final Long customerId) {
        customerService.inactive(customerId);
    }

    @PutMapping("/{customerId}")
    public CustomerResponseDto updateCustomer(@RequestBody final CustomerRequestDto customerRequestDto, @PathVariable Long customerId) {
        return new CustomerResponseDto(this.customerService.update(customerRequestDto, customerId));
    }

    @PutMapping("/{customerId}/address/{addressId}")
    public AddressResponseDto updateAddress(@RequestBody final AddressRequestDto addressRequestDto, @PathVariable Long customerId, @PathVariable Long addressId) {
        return new AddressResponseDto(this.customerService.update(addressRequestDto, addressId));
    }

    @PutMapping("/{customerId}/enrollment/{enrollmentId}")
    public EnrollmentResponseDto updateEnrollment(@RequestBody final EnrollmentRequestDto enrollmentRequestDto, @PathVariable Long customerId, @PathVariable Long enrollmentId) {
        return new EnrollmentResponseDto(this.customerService.update(enrollmentRequestDto, enrollmentId));
    }

    @PutMapping("/{customerId}/contact/{contactId}")
    public ContactResponseDto updateContact(@RequestBody final ContactRequestDto contactRequestDto, @PathVariable Long customerId, @PathVariable Long contactId) {
        return new ContactResponseDto(this.customerService.update(contactRequestDto, contactId));
    }
}