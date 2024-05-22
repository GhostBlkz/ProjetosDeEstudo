package br.com.plusfit.repository;

import br.com.plusfit.model.Address;
import br.com.plusfit.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findAll();

    Address save(Address address);

    Address findByAddressId(Long addressId);
}
