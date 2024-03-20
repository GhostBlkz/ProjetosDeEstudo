package br.com.plusfit.service;

import br.com.plusfit.model.Customer;
import br.com.plusfit.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer save(final Customer customer) {
        return this.customerRepository.save(customer);
    }

    // public Customer update(final Customer customer) {
        // return this.customerRepository.update(customer);
    // }

    public List<Customer> findAll() {
        return this.customerRepository.findAll();
    }

    public void inactive(final Long customerId) {
        Customer customer = customerRepository.findByCustomerId(customerId);

        customer.setActive(false);

        // this.customerRepository.update(customer);
    }
}
