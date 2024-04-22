package br.com.plusfit.repository;

import br.com.plusfit.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findAll();

    Customer save(Customer customer);

    Customer findByCustomerId(Long customerId);
}
