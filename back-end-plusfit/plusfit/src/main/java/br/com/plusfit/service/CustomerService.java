package br.com.plusfit.service;

import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.model.Customer;
import br.com.plusfit.model.mappers.CustomerMapper;
import br.com.plusfit.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // @Autowired
    //private CustomerMapper customerMapper;

    public Customer save(final Customer customer) {
        return this.customerRepository.save(customer);
    }

    public Customer update(final CustomerRequestDto customerFromRequest, Long customerId) {
        Customer customerFromDatabase = customerRepository.findByCustomerId(customerId);

        customerFromDatabase.setCpf(customerFromRequest.getCpf());
        customerFromDatabase.setName(customerFromRequest.getName());
        customerFromDatabase.setBirthDate(customerFromRequest.getBirthDate());


        // this.customerMapper.updateCustomerFromDto(customerFromRequest, customerFromDatabase);        // Passando as informacoes novas do fromrequest para o customerfromdatabase (informacoes velhas)
        return this.customerRepository.save(customerFromDatabase);
    }

    public List<Customer> findAll() {

        return this.customerRepository.findAll();
    }

    public Customer findById(Long customerId) {
        Optional<Customer> customerOptional = this.customerRepository.findById(customerId);
        return customerOptional.orElse(null);
    }

    public void inactive(final Long customerId) {
        Customer customer = customerRepository.findByCustomerId(customerId);
        customer.setActive(false);
        this.customerRepository.save(customer);
    }
}
